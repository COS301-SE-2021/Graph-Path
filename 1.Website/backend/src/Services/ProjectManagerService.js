const bcrypt = require("bcrypt");
const ObjectId = require('mongodb').ObjectID;
const Permissions = require('../Helpers/Permissions');
const {each} = require("mongodb/lib/operations/cursor_ops");
const email = require("../Helpers/SendMail");
/////////////////////////////////////////////////////-Project-//////////////////////////////////////////////////////////////
//***************************************************-get-**************************************************************
async function getProjectByID(dbController, id){
    const db = dbController.getConnectionInstance();
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

async function getAllProjects(dbController){
    const db = dbController.getConnectionInstance();
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
async function insertProject(dbController, projectObject){
    const db = dbController.getConnectionInstance();
    return await new Promise((resolve, reject)=>{
        db.collection('Projects').insertOne(projectObject)
            .then((ans)=>{
                email.sendNotification("New project",'u19016477@tuks.co.za');
                resolve(ans);
            })
            .catch(err=>{
                reject(err);
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
            .then(ans =>{
                resolve(ans);
            })
            .catch(err=>{
                reject(err);
            })
    })

}

async function removeProjectMember(dbController, id, email){
    const db = dbController.getConnectionInstance();
    return await new Promise(async (resolve,reject)=>{

        let proj = await  getProjectByID(dbController, id);

        if(proj === undefined || proj === null){
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
    })
}

//***************************************************-patch-**************************************************************
async function updateProjectGraph(dbController,id, graphObject){
    const db = dbController.getConnectionInstance();
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

async function addNewProjectMember(dbController, id, newMembers){

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
                    throw "Project with given ID does not exist";
                }

            })
            .catch(err=>{
                console.log(err);
                reject(err);
            });

    })
    if(project !== null)
    {
        let Members = project.groupMembers;
        for( let i =0 ; i < newMembers.length ; i ++)
        {
                //check if member already in project

            Members.push(newMembers[i]);
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

                    if(ans.result.nModified >= 1)
                    {

                        project.groupMembers = Members;
                        resolve({
                            message: "successfully added new Members",
                            data: project
                        });
                    }

                    else
                    {

                        resolve({
                            message: "Project members not updated",
                            data: []
                        });

                    }
                })
                .catch(err=>{

                    reject(err);
                })
        })


    }



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
                console.log(err);
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
    editMemberRole

}