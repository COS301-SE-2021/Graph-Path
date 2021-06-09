const express = require('express')
const app = express();
const cors = require('cors') ;
const path = require('path') ;
const ProjectRoute = require('./api/routes/Project')
const UserRoute= require('./API/routes/User');
const Home = require('./API/routes/Home') ;
require('dotenv').config()

//console.log(process.env.TEST_MONGO_URL)
//middleware
app.use(cors()) ;
app.use(express.urlencoded({extended:true}));
app.use(express.json()) ;
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended:true}));
app.use('/project' , ProjectRoute);
app.use('/user', UserRoute);

//default /GET
app.use('/',Home) ;
//Handling Errors?
app.use((req,res,next)=>{
    const error = new Error(`Not found. ${req.url}`) ;
    error.status = 404 ;
    next(error) ;
    // console.log('Created Error') ;
    // console.log('req body:',JSON.stringify(req.body) ) ;
    // console.log('req files?',JSON.stringify(req.files) ) ;
}) ;

app.use((error,req,res,next)=>{
    res.status(error.status || 500) ;
    res.json({
        error:error.message,
        type:error.type ,
        loc: error.prototype,
        stack:error.stack,
        url:req.url

    });
}) ;

module.exports = app
