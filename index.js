const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const authRouter = require('./routes/authRouter.js')
const projectRouter = require('./routes/projectRouter.js')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use('/api/auth',authRouter)
app.use('/api/projects',projectRouter)

mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(()=>console.log("DB Connected!"))
	.catch(err=>console.log("err"))

app.use(function(error,req,res,next){
	res.status(500)
	res.json({message:error.message})
})

app.listen(PORT, ()=>{
	console.log("Server is listening on http://localhost:"+PORT)
})