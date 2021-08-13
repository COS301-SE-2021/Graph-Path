const mongClient = require('mongodb').MongoClient ;
require('dotenv').config() ;
const DB_URI =process.env.TEST_DB_URI ;
var ObjectId = require('mongodb').ObjectID;
const mongoose = require('mongoose') ;
const bcrypt = require('bcrypt');
const userService = require('../Services/UserManagerService');
const projectService = require('../Services/projectManagerService');
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




/////////////////////////////////////////////////////-Task-//////////////////////////////////////////////////////////////
//***************************************************-get-**************************************************************

async function getAllTasks(){
    return await new Promise((resolve,reject)=>{
        db.collection('Tasks').find({}).toArray()
            .then(ans=>{
                if(ans == null){
                    resolve("No available tasks");
                }else{
                    resolve(ans);
                }
            })
            .catch(err=>{
                reject(err);
            })
    })
}

async function getTaskByID(id){
    return await new Promise((resolve, reject)=>{
        db.collection('Tasks').findOne({
            "_id": ObjectId(id)
        })
            .then(ans=>{
                if(ans == null){
                    resolve("No available task");
                }else{
                    resolve(ans);
                }
            })
            .catch(err=>{
                reject(err);
            })
    })
}

async function getAllTasksByProject(id){
    return await new Promise((resolve,reject)=>{
        db.collection('Tasks').find({project:id}).toArray()
            .then((ans)=>{
                if(ans == null){
                    resolve("No tasks found");
                }else{
                    resolve(ans);
                }
            })
            .catch((err)=>{
                reject(err);
            });
    })
}

//***************************************************-post-**************************************************************
async function insertTask(taskObject){
    return await new Promise((resolve, reject)=>{
        if(taskObject==null){
            resolve("Task object empty");
        }
        db.collection('Tasks').insertOne(taskObject)
            .then((ans)=>{
                resolve(ans);
            })
            .catch(err=>{
                reject(err);
            })
    })
}
//***************************************************-delete-**************************************************************
async function deleteTaskByID(id){
    return await  new Promise((resolve,reject)=>{
        db.collection('Tasks').deleteOne({
            "_id":ObjectId(id)
        })
            .then(ans=>{
                resolve(ans);
            })
            .catch(err=>{
                reject(err);
            })
    })
}
//***************************************************-patch-**************************************************************
async function updateTaskDescription(id, newDesc){
    return await new Promise((resolve, reject)=>{
        db.collection('Tasks').updateOne({
            "_id": ObjectId(id)
        },{
            $set:{description:newDesc}
        })
            .then(ans=>{
                resolve(ans);
            })
            .catch(err=>{
                reject(err);
            })
    })
}

async function updateTaskStatus(id, newStat){
    return await new Promise((resolve, reject)=>{
        db.collection('Tasks').updateOne({
            "_id": ObjectId(id)
        },{
            $set:{status:newStat}
        })
            .then(ans=>{
                if(ans.modifiedCount > 0){
                    resolve("Success");
                }else{
                    resolve("Could not update the task");
                }
            })
            .catch(err=>{
                reject(err);
            })
    })
}
/*
async function updateTaskDueDate(id, ddate){
    return await new Promise((resolve,reject)=>{
        db.collection('Tasks').updateOne({
            "_id": ObjectId(id)
        },{
            $set:{status:ddate}
        })
            .then(ans=>{
                if(ans.modifiedCount > 0){
                    resolve("Success");
                }else{
                    resolve("Could not update the task");
                }
            })
            .catch(err=>{
                reject(err);
            })
    })
}

 */

async function updateTaskAssignee(id, assignee){
    return await new Promise((resolve,reject)=>{
        db.collection('Tasks').updateOne({
            "_id": ObjectId(id)
        },{
            $set:{assignee:assignee}
        })
            .then(ans=>{
                if(ans.modifiedCount > 0){
                    resolve("Success");
                }else{
                    resolve("Could not update the task");
                }
            })
            .catch(err=>{
                reject(err);
            })
    })
}

async function updateTaskAssigner(id, assigner){
    return await new Promise((resolve,reject)=>{
        db.collection('Tasks').updateOne({
            "_id": ObjectId(id)
        },{
            $set:{assigner:assigner}
        })
            .then(ans=>{
                if(ans.modifiedCount > 0){
                    resolve("Success");
                }else{
                    resolve("Could not update the task");
                }
            })
            .catch(err=>{
                reject(err);
            })
    })
}

/////////////////////////////////////////////////////-Node-//////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////-Graph-//////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////-exports-//////////////////////////////////////////////////////////////

module.exports={

    getConnectionInstance,
    //Task
    getAllTasks,
    getTaskByID,
    getAllTasksByProject,
    insertTask,
    deleteTaskByID,
    updateTaskDescription,
    updateTaskStatus,
         //updateTaskDueDate,
    updateTaskAssigner,
    updateTaskAssignee


};