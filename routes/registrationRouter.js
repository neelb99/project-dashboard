const router = require('express').Router()
const userModel = require('../models/userSchema.js');
const bcrypt = require('bcryptjs');

router.post('/', async (req,res,next)=>{
	const userObj = {
		roll: req.body.roll,
		name: req.body.name,
		pass: req.body.pass,
		mobile: req.body.mobile,
		role: 'user',
		balance:0
	}
	const salt = await bcrypt.genSalt(10)
	const hashed = await bcrypt.hash(userObj.pass, salt)
	userObj.pass=hashed
	if(userObj.roll.length!==10)
		next(Error('Roll number must be 10 characters!'))
	if(userObj.mobile.length!==10)
		next(Error('Mobile number must be 10 digits long!'))
	const newUser = userModel(userObj)
	const doesUserExist = await userModel.find({$or: [{roll:userObj.roll}, {mobile:userObj.mobile}]})
	if(doesUserExist.length>0)
		next(Error('User is already registered!'))
	else{
		newUser.save()
		.then(user=>res.json(user))
		.catch(err=>next(Error('Please check the entered data!')))
	}
})

module.exports = router;