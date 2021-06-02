//npm module require
const express = require('express') ;
const cors = require('cors') ;

//added files require
const ProjectRoute = require('./api/routes/Project')

//Initialize APP
const app = express();

//Middleware
app.use(cors()) ; 
app.use(express.json()) ; 
app.use(express.urlencoded({extended:true})) ; 

//Routes
app.use('/project' , ProjectRoute);

//Module Export
module.exports = app;