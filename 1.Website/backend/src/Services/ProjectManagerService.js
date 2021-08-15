const bcrypt = require("bcrypt");
const ObjectId = require('mongodb').ObjectID;
const Permissions = require('../Helpers/Permissions');

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

async function addNewProjectMember(dbController, id, email){
    const db = dbController.getConnectionInstance();
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
    updateEverythingProject

}