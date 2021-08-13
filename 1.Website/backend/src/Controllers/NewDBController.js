const mongClient = require('mongodb').MongoClient ;
require('dotenv').config() ;
const DB_URI =process.env.TEST_DB_URI ;
var ObjectId = require('mongodb').ObjectID;
const mongoose = require('mongoose') ;
const bcrypt = require('bcrypt');
const userService = require('../Services/UserManagerService');
const projectService = require('../Services/projectManagerService');
const taskService = require('../Services/TaskMangerServices');
const Permissions = require('../Helpers/Permissions');

let db ;
//connect to db
const dbController = {
    connect: (callback)=>{
        mongClient.connect(DB_URI,
            {useNewUrlParser:true,useUnifiedTopology:true},
            (err,clientDB)=>{
                db = clientDB.db('test') ;
                console.log('+++++++++++++++++++++++++++connect to db, to serve request++++++++++') ;
                //return callback(err) ;
            }) ;
    },
    getDB : ()=>{
        console.log('returned mongoDB connection instance')
        return db ;
    }
}
dbController.connect();
dbController.getDB();

 function getConnectionInstance()
{
    return db;
}


//console.log(db);
const getUserByID2 = userService.getUserByID2;




/////////////////////////////////////////////////////-Node-//////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////-Graph-//////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////-exports-//////////////////////////////////////////////////////////////

module.exports={

    getConnectionInstance


};