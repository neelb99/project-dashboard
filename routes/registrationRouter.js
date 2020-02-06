const router = require('express').Router()
const userModel = require('../models/userSchema.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.post('/register', async (req,res,next)=>{
	const userObj = {
		roll: req.body.roll,
		name: req.body.name,
		pass: req.body.pass,
		mobile: req.body.mobile,
		role: 'user'
	}
	const salt = await bcrypt.genSalt(10)
	const hashed = await bcrypt.hash(userObj.pass, salt)
	userObj.pass=hashed
	if(userObj.roll.length!==10){
		next(Error('Roll number must be 10 characters!'))
		return
	}
	else if(userObj.mobile.length!==10){
		next(Error('Mobile number must be 10 digits long!'))
		return
	}
	const newUser = userModel(userObj)
	const doesUserExist = await userModel.findOne({$or: [{roll:userObj.roll}, {mobile:userObj.mobile}]})
	if(doesUserExist)
		next(Error('User is already registered!'))
	else{
		newUser.save()
		.then(()=>{
			delete userObj.pass
			jwt.sign(userObj,process.env.TOKEN_SECRET, {expiresIn:'1d'}, (err,token)=>{
				if(err)
					next(Error('Error Signing Up!, please try again!'))
				else
					res.json(token)
			})
		})
		.catch(err=>next(Error('Please check the entered data!')))
	}
})

router.post('/login', async (req,res,next)=>{
	const userObj = {
		roll: req.body.roll,
		pass: req.body.pass
	}
	if(userObj.roll.length!==10){
		next(Error('Roll number must be 10 characters!'))
		return
	}
	const doesUserExist = await userModel.findOne({roll:userObj.roll})
	if(doesUserExist){
		bcrypt.compare(userObj.pass, doesUserExist.pass, (err,correct)=>{
			if(err)
				next(Error('Error Loggin in, please try again!'))
			else{
				if(correct===false){
					next(Error('Incorrect password!'))
				}
				const tokenData = {
					roll : doesUserExist.roll,
					name: doesUserExist.name,
					mobile: doesUserExist.mobile,
					role: doesUserExist.role
				}
				jwt.sign(tokenData,process.env.TOKEN_SECRET, {expiresIn:'1d'}, (err,token)=>  {
					if(err)
						next(Error('Error loggin in, please try again!'))
					else
						res.json(token)
				})
			}
		})
	}
	else{
		next(Error('User does not exist, Please Register'))
	}	
})

module.exports = router;