const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	roll: {type:String, required:true},
	name: {type:String, required:true},
	pass: {type:String, required:true},
	role: {type:String, required:true, default:'user'},
	mobile: {type:String, required:true, minlength:10, maxlength:10},
	authpass: {type:Number, minlength:6, maxlength:6},
	project_id: [String]
})

const userModel = mongoose.model('projectUsers',userSchema)

module.exports=userModel