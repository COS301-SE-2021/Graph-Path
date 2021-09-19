const bcrypt = require("bcrypt");
const ObjectId = require('mongodb').ObjectID;
const Permissions = require('../Helpers/Permissions');
const {each} = require("mongodb/lib/operations/cursor_ops");
const {reject} = require("bcrypt/promises");
const {Promise} = require("mongoose");
//const email = require("../Helpers/SendMail");

/////////////////////////////////////////////////////-Project-////////////////////////////////////////////////////////
//***************************************************-get-************************************************************
async function getProjectByID(dbController, id){
    const db = dbController.getConnectionInstance();
    return await new Promise((resolve, reject)=>{
        db.collection('Projects').findOne({
            "_id": ObjectId(id)
        })
            .then((ans)=>{
                if(ans ===null){
                    resolve({
                        message:"No project with given id",
                        data:ans
                    });
                }else{
                    resolve(ans);
                }

            })
            .catch(err=>{
                reject(err);
            });



    })
}

async function getAllProjects(dbController){
    const db = dbController.getConnectionInstance();
    return await new Promise((resolve, reject)=>{
        db.collection('Projects').find({}).toArray()
            .then(ans=>{
                if(ans.toString() === "[]"){
                    resolve(
                        {message:"No projects",
                            data:[]
                    });
                }else {

                    resolve(ans);
                }
            })
            .catch(err=>{
                reject(err);
            })
    })
}

async function getAllProjectsByUserEmail(dbController,mail){
    const db = dbController.getConnectionInstance();
    //console.log("projectsbyueremail mail:",mail);
    return await new Promise((resolve,reject)=>{

        // get all projects.
        // search projects for where mail is a member of
        // return the projects if found else return error message
        let Projects = null;
        db.collection('Projects').find({}).toArray()
            .then((ans)=>{
                //console.log("ans",ans);
                Projects = ans;
                let MatchedProjects = [];
                for(let i =0 ; i < Projects.length ; i++)
                {
                    let GroupMembers = Projects[i].groupMembers;
                    //console.log(GroupMembers);

                    if (GroupMembers !== null && GroupMembers !== undefined){

                        for( let x = 0 ; x <GroupMembers.length ;x++)
                        {
                            if(GroupMembers[x].email === mail)
                            {

                                const obj = {
                                    role: GroupMembers[x].role,
                                    permissions: GroupMembers[x].permissions,
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


    })

}
//***************************************************-post-**************************************************************
async function insertProject(dbController, projectObject){
    const db = dbController.getConnectionInstance();
    return await new Promise((resolve, reject)=>{
        db.collection('Projects').insertOne(projectObject)
            .then((ans)=>{
                // email.sendNotification("New project",'');

                resolve(ans);
            })
            .catch(err=>{
                reject({
                    message:"failed to add new project, project already exists",
                    data: err
                });
            })
    });
}
//***************************************************-delete-**************************************************************
async function removeProjectByID(dbController, ID){
    const db = dbController.getConnectionInstance();
    return await new Promise((resolve, reject)=>{
        db.collection('Projects').deleteOne({
            "_id": ObjectId(ID)
        })
            .then(deleteProjectAns =>{
                console.log("successfully deleted Project by ID");
                console.log("attempting to delete all tasks of deleted project...");
                db.collection('Tasks').deleteMany({
                    "projectID":ObjectId(ID)
                })
                    .then(manyDeletedTasks=>{
                        console.log("successfully deleted all tasks of project");
                        resolve(manyDeletedTasks)
                    })
                    .catch(deleteManyTasksErr=>{
                        console.log("failed to delete all tasks of project");
                        reject(deleteManyTasksErr)
                    })

            })
            .catch(DeleteProjectErr=>{
                console.log("failed to delete project");
                reject(DeleteProjectErr);
            })
    })

}

async function removeProjectMember(dbController, id, email){
    const db = dbController.getConnectionInstance();
    return await new Promise(async (resolve,reject)=>{
        //let proj = [];
            await  getProjectByID(dbController, id).then(proj=>{
                //resolve(proj);
                console.log("This is proj: ",proj);
                if(proj.data === undefined || proj.data === null){
                    resolve("Could not find the project.");
                }else if(proj === "No project"){
                    resolve("Project does not exist.");
                }

                let memberList = proj.groupMembers;


                let newArray = memberList.filter((val)=>{
                    if(val.email !== email) {
                        return true;
                    }
                });



                db.collection('Projects').updateOne({
                    "_id":ObjectId(id)
                },{
                    $set: {
                        groupMembers: newArray
                    }
                })
                    .then(ans=>{
                        resolve(ans);
                    })
                    .catch(err=>{
                        reject(err);
                    })
            }).catch(err=>{
                reject(err);
            });
            //let proj = await getProjectByID(dbController, id);



    }).catch(err=>{
        reject(err);
    })
}

//***************************************************-patch-**************************************************************
async function updateProjectGraph(dbController,id, graphObject){
    const db = dbController.getConnectionInstance();
    return await new Promise((resolve, reject)=>{
        db.collection('Projects').updateOne({
            "_id": ObjectId(id)
        },{
            $set:{
                graph:graphObject,
                lastAccessed: new Date().toString().split("GMT")[0]
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

async function addNewProjectMember(dbController, id, newMembers){
    const db = dbController.getConnectionInstance();
   return await new Promise((resolve,reject)=>{
        getProjectByID(dbController,id).then((project)=>{
            console.log("This is the project inside addNewProjectMember: ",project);
            if(project===undefined || project ==null){
                resolve("The project does not exist");
            }

            let members = project.groupMembers;
            console.log("This is groupMembers",members);

            for(let i =0 ; i < newMembers.length; i++){
                if(!members.some(member => member.email === newMembers[i].email)){
                    members.push(newMembers[i]);

                }
                else{
                    console.log("Member '"+newMembers[i].email+"' already exists ,not added");
                }
            }

            db.collection('Projects').findOneAndUpdate({
                "_id":ObjectId(id)
                }, {
                $set:{groupMembers: members}
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


async function editMemberRole(dbController, id, email , newRole){


    const db = dbController.getConnectionInstance();
    let  project = null;
    await new Promise((resolve, reject)=>{
        db.collection('Projects').findOne({
            "_id": ObjectId(id)
        })
            .then((ans)=>{
                if(ans !==null){

                    project = ans;
                    resolve();
                }else{
                    throw "Project with given ID does not exist"
                }

            })
            .catch(err=>{
                //console.log(err);
                reject(err);
            });

    })

    if(project !== null)
    {
        let Members = project.groupMembers;
        let MemberFound = false;
        for( let i =0 ; i < Members.length ; i ++)
        {
          if(Members[i].email === email)
          {
              Members[i].role = newRole;
              MemberFound = true;

          }
        }

        return await new Promise((resolve,reject)=>{

            db.collection('Projects').updateOne({
                "_id":ObjectId(id)
            },{
                $set: {
                    groupMembers: Members
                }
            })
                .then(ans=>{


                    if(ans.result.nModified >= 1 && MemberFound === true)
                    {
                        project.groupMembers = Members;
                        resolve({
                            message: "successfully edited role",
                            data: project
                        });
                    }

                    else if(!MemberFound)
                    {
                        resolve({
                            message:"Role update failed. Member does not exist in in project",
                            data: []
                        })
                    }

                })
                .catch(err=>{


                    reject(err);
                })
        })


    }



}

async function updateProjectOwner(dbController, id, mail){
    const db = dbController.getConnectionInstance();
    return await new Promise((resolve, reject)=>{

        db.collection('Projects').updateOne({
            "_id":ObjectId(id)
        },{
            $set: {
                owner: mail
            }
        })
        .then((ans)=>{
            if(ans ===null){

                resolve("No project found");
            }else{
                resolve(ans);
            }

        })
            .catch(err=>{
                reject(err);
            });
    })

}

//***************************************************-put-**************************************************************
async function updateEverythingProject(dbController, id, pname, ddate, sdate, own, grph, members){
    const db = dbController.getConnectionInstance();
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
                graph: grph,
                lastAccessed: new Date().toString().split("GMT")[0]
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

async function updateProjectAccessData(dbController, id, lastDate){
    const db = dbController.getConnectionInstance();
    return await new Promise((resolve, reject)=>{

        db.collection('Projects').updateOne({
            "_id":ObjectId(id)
        },{
            $set: {
                lastDateAccessed: lastDate
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

module.exports = {
    //project
    insertProject,
    getProjectByID,
    getAllProjects,
    getAllProjectsByUserEmail,
    removeProjectByID,
    updateProjectGraph,
    addNewProjectMember,
    updateEverythingProject,
    removeProjectMember,
    editMemberRole,
    updateProjectOwner,
    updateProjectAccessData

}