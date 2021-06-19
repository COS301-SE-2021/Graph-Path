const express = require('express') ;
const app = express();
const cors = require('cors') ;
const path = require('path') ;
const mongoDBInstance = require('./Controllers/DBController')
const testDB = require('./Controllers/DBtestController')
//console.log(process.env.TEST_MONGO_URL)
//middleware
app.use(cors()) ;
app.use(express.urlencoded({extended:true}));
app.use(express.json()) ;
app.use(express.static(path.join(__dirname, 'public')));
mongoDBInstance.connect((error)=>{
    if (error){
        console.log('Error on start of mongodb',error) ;
    }
    //app goes online
    //require statements
    const ProjectRoute = require('./api/routes/Project');
    const UserRoute= require('./API/routes/User');
    const NodeRoute= require('./API/routes/Node');
    const Task2Route = require('./API/routes/Tasks2');
    const TaskRoute = require('./API/routes/Task');
    const Home = require('./API/routes/Home') ;

    //routes
    app.use('/project' , ProjectRoute);
    app.use('/user', UserRoute);
    app.use('/node',NodeRoute);
    app.use('/task',TaskRoute);
    app.use('/task2',Task2Route);


    //default /GET
    app.use('/',Home) ;

    //Handling Errors?
    app.use((req,res,next)=>{
        const newError = new Error(`Not found. ${req.url}`) ;
        newError.status = 404 ;
        next(newError) ;
        // console.log('Created Error') ;
        // console.log('req body:',JSON.stringify(req.body) ) ;
        // console.log('req files?',JSON.stringify(req.files) ) ;
    }) ;
    //Serve Error
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
});

module.exports = app
