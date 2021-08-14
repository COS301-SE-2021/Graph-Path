const mongClient = require('mongodb').MongoClient ;
require('dotenv').config() ;
const DB_URI =process.env.TEST_DB_URI ;
var ObjectId = require('mongodb').ObjectID;
const mongoose = require('mongoose') ;

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


async function getAllProjects(){
    return await new Promise((resolve, reject)=>{
        db.collection('Projects').find({}).toArray()
            .then(ans=>{
                resolve(ans);
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
        let Projects = [];
        db.collection('Projects').find({}).toArray()
            .then((ans)=>{

                Projects = ans;
                let MatchedProjects = [];
                for(let i =0 ; i < Projects.length ; i++)
                {
                    let GroupMembers = Projects[i].groupMembers;
                    if (GroupMembers !== undefined && GroupMembers!== null){
                        for( let x = 0 ; x <GroupMembers.length ;x++)
                        {
                            if(GroupMembers[x].email == mail)
                            {
                                console.log("Match found",GroupMembers.length);
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
/////////////////////////////////////////////////////-Node-//////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////-Graph-//////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////-exports-//////////////////////////////////////////////////////////////
// console.log(getUserByID);
module.exports={

    getConnectionInstance

};