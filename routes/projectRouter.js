const router = require('express').Router()
const multer = require('multer')
const projectModel = require('../models/projectSchema')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'./uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+'.jpg')
  }
})
 
const upload = multer({ storage: storage })

router.post('/add',upload.single('featured'),(req,res,next)=>{
	const projectObj = {
		title: req.body.title,
		description: req.body.description,
		faculty: req.body.faculty,
		collaborators: req.body.collaborators,
		status: req.body.status,
		imageName: req.file.filename
	}
	const newProject = projectModel(projectObj)
	newProject.save()
		.then(()=>res.json("Project Added!"))
		.catch(err=>next(Error('Something went wrong!')))
})

router.get('/view',(req,res,next)=>{
	projectModel.find()
		.then(projects=>res.json(projects))
		.catch(err=>next(Error('Could not load projects!')))
})

router.get('/view/:name',(req,res,next)=>{
	projectModel.find({createdBy:req.params.name})
		.then(projects=>res.json(projects))
		.catch(err=>next(Error('Could not load projects!')))
})

module.exports=router