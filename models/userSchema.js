const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	roll: {type:String, required:true, minlength:10, maxlength:10},
	name: {type:String, required:true},
	pass: {type:String, required:true},
	role: {type:String, required:true, default:'user'},
	mobile: {type:String, required:true, minlength:10, maxlength:10},
	balance: {type:Number, default:0}
})

const userModel = mongoose.model('vcreditUsers',userSchema)

module.exports=userModel