const express = require('express');
const Permissions = require('../../Helpers/Permissions');
const mongoose = require('mongoose') ;
const {route} = require("express/lib/router");
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;
const ProjectManagerService = require('../../Services/ProjectManagerService');
const scratchPad = require('../../Helpers/kanbanBoard');

function makeProjectRoute(db) {
//GET ENDPOINTS/////////////////////////////////////////////////////////////////////////////////////////////////////////
    router.get('/convertToKanbanBoard/:id',(req,res)=>{

        const ProjectId = req.params.id;
        scratchPad.getProjectGraph(db,ProjectId)

            .then((project)=>{

                scratchPad.updateNodesID(db ,project).then(()=>{})

                let projectNodes = scratchPad.getNodes(project);
                if(projectNodes.length === 0)
                {
                    res.send({
                        message:"this project graph has no nodes",
                        data: []
                    })
                }

                else {
                    // pool all tasks of nodes
                    //console.log(projectNodes);
                    scratchPad.getTasks(db,projectNodes).then((AllTasks)=>{
                        if(AllTasks === "Tasks collection empty")
                        {
                            res.send({
                                message:AllTasks,
                                data: []
                            })
                        }

                        else if(AllTasks.length == 0)
                        {
                            res.send({
                                message: "This project has no tasks",
                                data: []
                            })
                        }

                        else
                        {
                            res.send({
                                message:"success",
                                data: scratchPad.splitTasksByStatus(AllTasks),
                            })
                        }

                   })
                        .catch((err)=>{
                            res.send({
                                message:"error",
                                data: err
                            })
                        });



                }


            })
            .catch((err)=>{

            })


    })
    router.get('/find', (req, res, next) => {


        db.collection('Projects').findOne({})
            .then((ans) => {
                console.log('success', ans);
                res.send({
                    data: ans
                });
            }, (ans) => {
                console.log('rejected', ans);
                res.send({
                    data: ans
                });
            })
            .catch(err => {
                console.log('from db req', err)
            })

    });

    router.get('/list', (req, res, next) => {

        ProjectManagerService.getAllProjects(db)
            .then((ans) => {
                if(ans ==="No projects"){
                    res.send({
                        message: "There are no projects.",
                        data: []
                    })
                }else{
                    res.send({
                        message: "The retrieval of the projects was successful.",
                        data:ans
                    })
                }

                })
            .catch(err => {
                res.status(500).send({
                    message: "Could not retrieve the projects."
                })
            })

    })

    router.get('/getAllProjectsByUserEmail/:email', (req, res, next) => {

        // console.log('received request ', req.params, 'servicing.....');
        let mail=req.params.email;

        ProjectManagerService.getAllProjectsByUserEmail(db,mail)
            .then(ans=>{

                if (ans ==="No matched projects")
                {
                    res.send({
                        message: "unsuccessful. "+ans+" for user: "+mail,
                        data: []
                    })
                }

                else{

                    res.send({
                        message: "successful",
                        data: ans
                    })
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Server error. Could not retrieve projects.",
                    data: null

                });
            })

    })

    router.get('/getProjectByID/:id',(req,res,next)=>{

        let ID = req.params.id ;
        if(ID ==='' || ID === undefined)
        {
            res.status(400).send({
                message:"Invalid ID provided."
            })
        }
        ProjectManagerService.getProjectByID(db,ID)
            .then(ans=>{
                if(ans === "No project"){
                    res.send({
                        message: "No project with this ID"
                    })

                }else if(ans != null){
                    res.send({
                        message: "Project retrieved.",
                        data: ans
                    })
                }else{
                    res.send({
                        message: "Could not retrieve project."
                    })
                }

            })
            .catch(err=>{
                res.status(500).send({
                    message: "Server error: Could not retrieve the project, make sure your ID is valid and correct.",
                    err:err
                })
            })
    }) ;

    router.get("/AllPermissions",(req,res)=>{


        console.log(Permissions.getAllRolesAndPermissions())
        res.send({
            message:"successful",
            data: {
                roles : Permissions.getAllRoles(),
                rolePermissions: Permissions.getAllRolesAndPermissions(),
            }
        })
    })


//POST ENDPOINTS////////////////////////////////////////////////////////////////////////////////////////////////////////
    router.post('/newProject',  (req, res, next) => {
        if (req === undefined || req.body === undefined) {
            res.json({
                message: "There was no information provided."
            });
        }
        if (req.body.projectName === undefined) {
            console.log('no project name')
            res.send({
                message: "Please specify a Project Name"
            })


        } else {
            let data = req.body;
            const id = new mongoose.mongo.ObjectID();
            data["_id"] = id;
            ProjectManagerService.insertProject(db,data)
                .then(ans=>{
                    res.send({
                        message:"The Project has been created.",
                        data: id
                    })
                })
                .catch(err=>{
                    res.status(500).send({
                        message: "The project was not created."
                    })
                })


        }
    });

//DELETE ENDPOINTS//////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 
 * /deleteProject/:
 *   delete:
 *     summary: Deletes the project owner is deleting using the name
 *     tags: [Books]
 *     parameters:
 *       projectName: The name of the project 
 *       owner: The email address of the owner of project
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *      400:
 *          description:The body is not complete.
 */

router.delete('/deleteProject/:id',(req,res)=>{
    let ID = req.params.id;

        // console.log(projectName,owner); 
    ProjectManagerService.removeProjectByID(db,ID)
        .then(ans =>{
            if(ans === null){
                res.send({
                    message: "Couldn't remove project."
                });
            }else{
                res.send({
                    message: "Project was removed successfully."
                });
            }

        })
        .catch(err=>{
            res.status(500).send({
                message:"Could not remove project."
            })
        })
})

//PATCH ENDPOINTS///////////////////////////////////////////////////////////////////////////////////////////////////////
router.patch('/updateProjectGraph/:id/:graph',(req, res, next)=>{
    let ID = req.params.id;
    let grph = req.params.graph;
    let grph2 = JSON.parse(grph);
    //console.log("type of graph: "+ typeof grph);
   // console.log("grph.nodes[0].id: "+grph2.nodes[0].id);
    //console.log("grph.edges[0].id: "+grph2.edges[0].id);

    ProjectManagerService.updateProjectGraph(db,ID,grph2 )
    .then(ans=>{
            if(ans.modifiedCount === 0){
                res.send({
                    message: "Could not update the graph."
                })
            }else{
                res.send({
                    message: "The graph was updated."
                })
            }
        })
    .catch((err)=>{
       res.status(500).send({
           message: "Could not update the project graph."
       })
     })
});

router.patch('/addToProjectGroupMembers/:id/:email',(req, res, next)=>{
    let ID = req.params.id;
    let mail = req.params.email;
    ProjectManagerService.addNewProjectMember(db,ID, mail)
        .then(ans=>{
            if(ans.modifiedCount >0){
                res.send({
                    message: "Member added successfully."
                })
            }else{
                res.send({
                    message: "Could not add member."
                })
            }
        })
    .catch((err)=>{
        res.status(500).send({
            message: "An error has occurred."
        })
     })
});


//PUT ENDPOINTS/////////////////////////////////////////////////////////////////////////////////////////////////////////
router.put('/updateEverythingProject/:id',(req,res)=>{
    const ID = req.params.id;
    let pname = req.body.projectName;
    let ddate = req.body.dueDate;
    let sdate = req.body.startDate;
    let owner = req.body.owner;
    let graph = req.body.graph;
   // let graph2 = JSON.parse(graph);
    let groupMembers = req.body.groupMembers;

    ProjectManagerService.updateEverythingProject(db,ID,pname,ddate,sdate,owner, graph, groupMembers)
        .then(ans=>{
            if(ans.modifiedCount > 0){
                res.send({
                    message: "The project was updated.",
                    data: ans
                })
            }else{
                res.send({
                    message: "The project was not updated.",
                    data: ans
                })
            }

        })
        .catch(err=>{
            res.status(500).send({
                message: "Server error: Could not update the project."
            })
        })
});

router.patch('/addToProjectGroupManagers/:id/:email',(req, res, next)=>{
    let projId = req.params.id;
    let eml = req.params.email;
    db.collection('Projects').updateOne({
        "_id": ObjectId(projId)
    },{

            $push: {
                "groupManagers": eml
            }

    },true,(err,result)=>{

        if(err){
            console.log("Could not update the project graph: "+err);
            res.send({
                message:"found",
                data:projects//.json()
            }) ;
        }
        else{
            res.send({
                message: "success"
               // data: result['ops']
            });
        }

    })
    //.catch((err)=>{
    //    console.log("Could not update the task description: "+err);
    // })
});

router.put('/updateProjectGraph',(req,res)=>{
    const project = req.body.projectName ;
    const graph = req.body.graph ;
    const projId = req.body.projId ;

    console.log('PUT ../',project,'body: ',graph,projId) ; 
    if (graph === undefined || graph.nodes === undefined){
        return res.status(400).send({
            message:"Invalid Graph structure"
        })
    }

    db.collection('Projects').updateOne({
        projectName:project,
        "_id": ObjectId(projId)
    },
    {
        $set:{"graph":graph}
    },true,(err,ans)=>{
        if (err){
            console.log('error',err)
            return res.status(500).send({
                message:err
            }) ; 
        }
        console.log(ans.result.nModified + " document(s) updated");
        if (ans.result.nModified > 0){
            res.status(201).send({
                message:"Update Successful",
                data:graph
            })
        }
        else{
            res.send({
                message:`Project ${project}, not found`
            }) ;
        }
    }) ; 
})




 return router;
}



module.exports = makeProjectRoute;
