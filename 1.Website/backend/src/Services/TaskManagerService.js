const bcrypt = require("bcrypt");
const ObjectId = require('mongodb').ObjectID;

/////////////////////////////////////////////////////-Task-//////////////////////////////////////////////////////////////
//***************************************************-get-**************************************************************

async function getAllTasks(dbController){
    //console.log(dbController.getConnectionInstance());
    const db = dbController.getConnectionInstance(dbController);
    return await new Promise((resolve,reject)=>{
        db.collection('Tasks').find({}).toArray()
            .then(ans=>{
                if(ans == null){
                    //console.log("No available tasks");
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

async function getTaskByID(dbController, id){
    const db = dbController.getConnectionInstance();
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

async function getAllTasksByProject(dbController, id){
    const db = dbController.getConnectionInstance();
    return await new Promise((resolve,reject)=>{
        db.collection('Tasks').find({projectID:id}).toArray()
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
async function insertTask(dbController, taskObject){
    const db = dbController.getConnectionInstance();
    return await new Promise((resolve, reject)=>{
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
async function deleteTaskByID(dbController, id){
    const db = dbController.getConnectionInstance();
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
async function updateTaskDescription(dbController, id, newDesc){
    const db = dbController.getConnectionInstance();
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

async function updateTaskStatus(dbController, id, newStat){
    const db = dbController.getConnectionInstance();
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

async function updateTaskAssignee(dbController, id, assignee){
    const db = dbController.getConnectionInstance();
    return await new Promise((resolve,reject)=>{
        db.collection('Tasks').updateOne({
            "_id": ObjectId(id)
        },{
            $set:{assignee:assignee}
        })
            .then(ans=>{
                if(ans.modifiedCount >= 0){
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

async function updateTaskAssigner(dbController, id, assigner){
    const db = dbController.getConnectionInstance();
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

async function updateEverythingTask(dbController,id, assignee, assigner, description, issued, due, nodeID, status, project){
    const db = dbController.getConnectionInstance();
    return await new Promise((resolve,reject)=>{
        db.collection('Tasks').updateOne({
            "_id": ObjectId(id)
        },{
            $set:{
                assignee: assignee,
                assigner:assigner,
                description: description,
                issued: issued,
                due : due,
                nodeID : nodeID,
                status:status,
                project: project
            }
        })
            .then(ans=>{
                resolve(ans);
            })
            .catch(err=>{
                reject(err);
            })
    })
}

module.exports={
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
    updateTaskAssignee,
    updateEverythingTask
}