const mongClient = require('mongodb').MongoClient ;
require('dotenv').config() ;
const DB_URI =process.env.TEST_DB_URI ;
var ObjectId = require('mongodb').ObjectID;
const mongoose = require('mongoose') ;
const bcrypt = require('bcrypt');
const userService = require('../Services/UserManagerService');
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
/////////////////////////////////////////////////////-User-///////////////////////////////////////////////////////////////////
//***************************************************-get-**************************************************************
async function getUserByID(id){
    return await new Promise((resolve, reject)=>{
         db.collection('Users').findOne({
            "_id": ObjectId(id)
        })
            .then((ans)=>{
                resolve(ans);


            })
            .catch(err=>{
                reject(err);
            });



    })

}

async function getUserByEmail(email){
    return await new Promise((resolve, reject)=>{
        db.collection('Users').findOne({
            "email": email
        }).then((ans)=>{
            if(ans == null)
            {
                resolve("user not found")
            }
            else
            {
                resolve(ans);
            }


        }).catch(err=>{

            reject("Server DB");
        });
    })

}

async function getAllUsers(){
    return await new Promise((resolve, reject)=>{
        db.collection('Users').find({}).toArray()
        .then((ans)=>{
            resolve(ans);
        }).catch(err=>{
            reject(err);
        })
    })
}

async function getAllOtherUsers(email,id){
    return await  new Promise((resolve, reject)=>{
        db.collection('Users').find({}).toArray()
            .then((ans)=>{
                if (ans.length > 0) {
                    //remove current user first
                    let newArray = ans.filter((val)=>{
                        if(val.email !== email) {
                            return true;
                        }
                    });
                    let specialized = [] ;
                    newArray.forEach((val)=>{
                        console.log(val) ;
                        let temp = {
                            label:`${val.firstName} ${val.lastName}`,
                            value:val.email
                        }
                        specialized.push(temp) ;
                    }) 
                    //send response
                    resolve(specialized);
                } else {

                    resolve(ans);
                }
            })
            .catch(err=>{
                reject(err);
            });
    })
}

//***************************************************-post-**************************************************************
async function insertUser(userObject){


    //first check if user exists
    let UserExist = false;
   await db.collection('Users').findOne({
        "email":userObject.email,
    }).then((result)=>{

        if(result !== null)
        {
            UserExist = true;
            resolve("Duplicate");

        }

    }).catch((err)=>{
        UserExist= false;
    })

    const salt = await bcrypt.genSalt(10);
    userObject.password = await  bcrypt.hash(userObject.password,salt);
    return await new Promise((resolve, reject)=>{
        db.collection('Users').insertOne(userObject)
            .then((ans)=>{
                resolve(ans);
            },(ans)=>{
                resolve(ans);
            })
            .catch(err=>{
                reject(err);
            })
    });
}
//***************************************************-delete-**************************************************************
async function removeUserByID(id){
    return await new Promise((resolve, reject) => {
        db.collection('Users').deleteOne({
            "_id": ObjectId(id)
        })
            .then((ans)=>{
                resolve(ans);
            })
            .catch(err=>{
               reject(err);
            });
    });
}

async function removeUserByEmail(mail){
    return await new Promise((resolve, reject) => {
        db.collection('Users').deleteOne({
            email: mail
        })
            .then((ans)=>{
                resolve(ans);
            })
            .catch(err=>{
                reject(err);
            });
    });
}
//***************************************************-patch-**************************************************************
async function updateUserUsername(mail, usrnme){
    return await  new Promise((resolve, reject) => {
        db.collection('Users').updateOne({
            email:mail
        },{
            $set:{username:usrnme}

        })
            .then(ans=>{
                resolve(ans);
            })
            .catch(err=>{
                reject(err);
            });
    })
}

async function updateUserPassword(mail,psw){

    const salt = await bcrypt.genSalt(10);
    psw = await  bcrypt.hash(psw,salt);
    return await  new Promise((resolve, reject) => {
        db.collection('Users').updateOne({
            email:mail
        },{
            $set:{password:psw}

        })
            .then(ans=>{
                resolve(ans);
            })
            .catch(err=>{
                reject(err);
            });
    })
}

async function updateUsernameAndPassword(mail, usrnme, psw){
    const salt = await bcrypt.genSalt(10);
    psw = await  bcrypt.hash(psw,salt);
    return await  new Promise(((resolve, reject) => {
        db.collection('Users').updateOne({
            email:mail
        },{
            $set:{
                username:usrnme,
                password:psw
            }})
            .then(ans=>{
                resolve(ans);
            })
            .catch(err=>{
                reject(err);
            });


    }))
}


/////////////////////////////////////////////////////-Project-//////////////////////////////////////////////////////////////
//***************************************************-get-**************************************************************
async function getProjectByID(id){
    return await new Promise((resolve, reject)=>{
        db.collection('Projects').findOne({
            "_id": ObjectId(id)
        })
            .then((ans)=>{
                if(ans ===null){
                    resolve("No project");
                }else{
                    resolve(ans);
                }

            })
            .catch(err=>{
                reject(err);
            });



    })
}

async function getAllProjects(){
    return await new Promise((resolve, reject)=>{
        db.collection('Projects').find({}).toArray()
            .then(ans=>{
                if(ans === null){
                    resolve("No projects");
                }else{
                    resolve(ans);
                }
            })
            .catch(err=>{
                reject(err);
            })
    })
}

async function getAllProjectsByUserEmail(mail){
    return await new Promise((resolve,reject)=>{

        // get all projects.
        // search projects for where mail is a member of
        // return the projects if found else return error message
        let Projects = null;
        db.collection('Projects').find({}).toArray()
            .then((ans)=>{

                Projects = ans;
                let MatchedProjects = [];
                for(let i =0 ; i < Projects.length ; i++)
                {
                    let GroupMembers = Projects[i].groupMembers;
                    for( let x = 0 ; x <GroupMembers.length ;x++)
                    {
                        if(GroupMembers[x].email == mail)
                        {
                            console.log("Match found");
                            const obj = {
                                role: GroupMembers[x].role,
                                permissions: Permissions.getPermissions(GroupMembers[x].role),
                                ...Projects[i],

                            }
                            MatchedProjects.push(obj);
                            break;
                        }

                    }


                }

                if( MatchedProjects.length === 0)
                {
                   resolve("No matched projects");
                }
                else
                {
                    resolve(MatchedProjects);
                }


            })


       /* db.collection('Projects').find({
            "groupMembers":mail
        }).toArray()
            .then((ans) => {
                if (ans.length > 0) {
                    resolve(ans);
                } else {
                    resolve(0);
                }


            })
            .catch(err => {

                reject(err);
            })*/
    })

}
//***************************************************-post-**************************************************************
async function insertProject(projectObject){
    return await new Promise((resolve, reject)=>{
        db.collection('Projects').insertOne(projectObject)
            .then((ans)=>{
                resolve(ans);
            })
            .catch(err=>{
                reject(err);
            })
    });
}
//***************************************************-delete-**************************************************************
async function removeProjectByID(ID){

    return await new Promise((resolve, reject)=>{
        db.collection('Projects').deleteOne({
            "_id": ObjectId(ID)
        })
            .then(ans =>{
                resolve(ans);
            })
            .catch(err=>{
                reject(err);
            })
    })

}


//***************************************************-patch-**************************************************************
async function updateProjectGraph(id, graphObject){
    return await new Promise((resolve, reject)=>{
        db.collection('Projects').updateOne({
            "_id": ObjectId(id)
        },{
            $set:{graph:graphObject}
        })
            .then(ans=>{
                resolve(ans);
            })
            .catch(err=>{
                reject(err);
            })
    })
}

async function addNewProjectMember(id, email){
    return await new Promise((resolve,reject)=>{

        db.collection('Projects').updateOne({
            "_id":ObjectId(id)
        },{
            $push: {
                groupMembers: email
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

//***************************************************-put-**************************************************************
async function updateEverythingProject(id, pname, ddate, sdate, own, grph, members){
    return await new Promise((resolve, reject)=>{

        db.collection('Projects').updateOne({
            "_id":ObjectId(id)
        },{
            $set: {
                "projectName": pname,
                dueDate: ddate,
                startDate: sdate,
                owner: own,
                groupMembers: members,
                graph: grph
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
    //user
    getUserByID,
    getUserByEmail,
    getAllUsers,
    getAllOtherUsers,
    insertUser,
    removeUserByEmail,
    removeUserByID,
    updateUserUsername,
    updateUserPassword,
    updateUsernameAndPassword,
    getConnectionInstance,
    //project
    insertProject,
    getProjectByID,
    getAllProjects,
    getAllProjectsByUserEmail,
    removeProjectByID,
    updateProjectGraph,
    addNewProjectMember,
    updateEverythingProject,
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