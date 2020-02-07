const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
	title: {type:String, required:true},
	description: {type:String, required:true},
	faculty: {type:String, required:true},
	createdBy: {type:String, required:true},
	status: {type:String, required:true},
	imageName: {type:String, required:true}
})

const projectModel = mongoose.model('projects',projectSchema)

module.exports = projectModel