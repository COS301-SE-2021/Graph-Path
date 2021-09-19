const bcrypt = require("bcrypt");
const {Promise} = require("mongoose");
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

async function getAllNodeTasks(dbController, nodeId){
    const db = dbController.getConnectionInstance();
    return await new Promise((resolve, reject)=>{
        db.collection('Tasks').find({
            nodeID: nodeId
        }).toArray()
            .then(ans=>{
                if(ans == null){

                    resolve(ans);
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
                    console.log(ans)
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


async function deleteTaskByNodeID(dbController, id){
    const db = dbController.getConnectionInstance();
    return await  new Promise((resolve,reject)=>{
        db.collection('Tasks').deleteMany ({
            "nodeID":id
        })
            .then(ans=>{
                resolve(ans);
            })
            .catch(err=>{
                reject(err);
            })
    })
}

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

async function updateEverythingTask(dbController,id,taskObj){
    const db = dbController.getConnectionInstance();
    return await new Promise((resolve,reject)=>{
        db.collection('Tasks').updateOne({
            "_id": ObjectId(id)
        },{
            $set:{
                description:taskObj.description,
                title:taskObj.title,
                status:taskObj.status,
                projectID:taskObj.projectID,
                taskMembers:taskObj.taskMembers,
                assigner:taskObj.assigner,
                due:taskObj.due,
                issued:taskObj.issued,
                nodeID: taskObj.nodeID
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

async function addTaskMembers(dbController, id, newMembers){
    const db = dbController.getConnectionInstance();
    return await new Promise((resolve,reject)=>{
        getTaskByID(dbController,id)
            .then((task)=>{
                if(task===undefined || task ==null){
                    resolve("The project does not exist");
                }
                let members = task.taskMembers;
                for(let i =0 ; i < newMembers.length; i++){
                if(!members.some(member => member.email === newMembers[i].email)){
                    members.push(newMembers[i]);

                }
                else{
                    console.log("Member '"+newMembers[i].email+"' already exists ,not added");
                }
            }

            db.collection('Tasks').findOneAndUpdate({
                    "_id":ObjectId(id)
                }, {
                    $set:{taskMembers: members}
                }, {
                    returnNewDocument: true }
            ).then(result=>{
                console.log("updated group members of this project");
                resolve(result.value);


            })
                .catch(err=>{
                    console.log("failed to update",err);
                    reject(err)
                })

        }).catch((err)=>{
            console.log(err);
            reject("update failed")
        })
    })


}

async function getTasksMultipleProjects(dbController,projectIDs){

    const db = dbController.getConnectionInstance();
    return await new Promise((resolve,reject)=>{
        db.collection('Tasks').find(
            {projectID: {$in:projectIDs} }).toArray()
            .then((ans)=>{
                console.log("resolving");
                resolve(ans);

            })
            .catch((err)=>{
                console.log("Not resolving");
                reject(err);
            });
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
    updateEverythingTask,
    deleteTaskByNodeID,
    getAllNodeTasks,
    addTaskMembers,
    getTasksMultipleProjects
}