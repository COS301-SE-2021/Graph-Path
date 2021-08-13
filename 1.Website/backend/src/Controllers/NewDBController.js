const mongClient = require('mongodb').MongoClient ;
require('dotenv').config() ;
const DB_URI =process.env.TEST_DB_URI ;
var ObjectId = require('mongodb').ObjectID;
const mongoose = require('mongoose') ;
const bcrypt = require('bcrypt');
const userService = require('../Services/UserManager');
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
        console.log('returned DB')
        return db ;
    }
}
dbController.connect();
dbController.getDB();
//console.log(db);

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
            resolve(ans);
        }).catch(err=>{
            reject(err);
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
                    //send response
                    resolve(newArray);
                } else {

                    resolve(ans);
                }

                resolve(ans);
            })
            .catch(err=>{
                reject(err);
            });
    })
}

//***************************************************-post-**************************************************************
async function insertUser(userObject){

    const salt = await bcrypt.genSalt(10);
    userObject.password = await  bcrypt.hash(userObject.password,salt);
    return await new Promise((resolve, reject)=>{
        db.collection('Users').insertOne(userObject)
            .then((ans)=>{
                resolve(ans);
            },(ans)=>{
                console.log('rejected',ans) ;
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
                resolve(ans);
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
                                project:Projects[i],

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

/////////////////////////////////////////////////////-Node-//////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////-Graph-//////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////-Task-//////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////-exports-//////////////////////////////////////////////////////////////
console.log(getUserByID);
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
    //project
    insertProject,
    getProjectByID,
    getAllProjects,
    getAllProjectsByUserEmail,
    removeProjectByID,
    updateProjectGraph,
    addNewProjectMember,
    updateEverythingProject
};