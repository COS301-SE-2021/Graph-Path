const express = require('express');
const Permissions = require('../../Helpers/Permissions');
const mongoose = require('mongoose') ;
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;
const ProjectManagerService = require('../../Services/ProjectManagerService');
const kanbanBoard = require('../../Helpers/kanbanBoard');
const DAGservice = require('../../Helpers/DAG');
const { param,body, validationResult } = require('express-validator');
function makeProjectRoute(db) {


    router.get('/isAcyclic/:id',
        param('id').exists().notEmpty().isMongoId(),
        (req,res)=>{
            const failedValidation = validationResult(req);
            if(!failedValidation.isEmpty()){
                res.status(420).send({
                    message: "Bad request , invalid parameters",
                    data: failedValidation
                })
            }

        const ProjectId = req.params.id;
        ProjectManagerService.getProjectByID(db,ProjectId).then((project)=>{
            const Graph = project.graph;

            if(DAGservice.isAcyclic(Graph))
            {
                res.send({
                    message: "Graph is DAG",
                    data: []
                })
            }

            else
            {
                res.send({
                    message:"Graph is not DAG",
                    data: []
                })
            }




        })
    })


    router.get('/convertToKanbanBoard/:id',
        param('id').exists().notEmpty().isMongoId(),
        (req,res)=>{
            const failedValidation = validationResult(req);
            if(!failedValidation.isEmpty()){
                res.status(420).send({
                    message: "Bad request , invalid parameters",
                    data: failedValidation
                })
            }


        const ProjectId = req.params.id;
        kanbanBoard.getProjectGraph(db,ProjectId)
            .then((project)=>{

                kanbanBoard.updateNodesID(db ,project).then(()=>{})
                let projectNodes = kanbanBoard.getNodes(project);
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
                    kanbanBoard.getTasks(db,projectNodes).then((AllTasks)=>{
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
                                data: kanbanBoard.splitTasksByStatus(AllTasks),
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

    /**
     * @api {get}  /task/listProjects
     * @apiName list of Projects
     * @apiDescription This endpoint returns a list of all Projects
     * @apiGroup Project
     * @apiSuccess (200) {List} list of Project objects
     */
    router.get('/listProjects', (req, res) => {

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


    /**
     * @api {get}  /task/getAllProjectsByUserEmail/:email
     * @apiName list projects owned by email
     * @apiDescription This endpoint returns a list of all Projects belonging to the user mathing the passed in email
     * @apiGroup Project
     * @apiSuccess (200) {List} list of Project objects
     */
    router.get('/getAllProjectsByUserEmail/:email',
        param('email').exists().notEmpty().isEmail(),
        (req, res) => {
            const invalidFields = validationResult(req);
            if(!invalidFields.isEmpty()){
                res.status(420).send({
                    message: "Bad request , invalid id",
                    data: invalidFields
                })
            }

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


    /**
     * @api {get}  /task//getProjectByID/:id
     * @apiName list projects owned by email
     * @apiDescription This endpoint returns a list of all Projects belonging to the user mathing the passed in email
     * @apiGroup Project
     * @apiSuccess (200) {List} list of Project objects
     */
    router.get('/getProjectByID/:id',
        param('id').exists().notEmpty().isMongoId(),
        (req,res,xt)=>{
            const invalidFields = validationResult(req);
            if(!invalidFields.isEmpty()){
                res.status(420).send({
                    message: "Bad request , invalid id",
                    data: invalidFields
                })
            }

            const ID = req.params.id;
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
    router.post('/newProject', (req, res, next) => {
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
    router.post('/addToProjectGroupMembers',(req, res, next)=>{
        let ID = req.body.id;
        let memberObjects = req.body.groupMembers;
       //  let memberObjects = [{
       //          "email": "demo3@gmail.com",
       //          "role": "owner"
       //      },
       //      {
       //          "email": "ntpnaane@gmail.com",
       //          "role": "Project Manager",
       //          "label": "Godiragetse Naane"
       //      },
       //      {
       //          "email": "kage@gmail.com",
       //          "role": "Developer",
       //          "label": "Kagiso Monareng"
       //      }]

        ProjectManagerService.addNewProjectMember(db,ID,memberObjects)
            .then((ans)=>{

               res.send(ans)
            })
            .catch((err)=>{
                res.send({
                    message: "unsuccessful. Server Error",
                    data: err
                })
            })


    });

//DELETE ENDPOINTS//////////////////////////////////////////////////////////////////////////////////////////////////////


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

router.patch('/addToProjectGroupMembers/:id/:memberObject',(req, res, next)=>{
    let ID = req.params.id;
    let mail = req.params.memberObject;
    //console.log("mail:",mail);
    ProjectManagerService.addNewProjectMember(db,ID, mail)

        .then(ans=>{
            if(ans.modifiedCount >0){
                res.send({
                    message: "Member added successfully."
                })
            }else if(ans === "Invalid project id"){
                res.send({
                    message: "Invalid project id provided."
                })
            }else if(ans === "Invalid memberObject"){
                res.send({
                    message: "Invalid member object provided."
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

    router.patch('/removeProjectMember/:id/:email',(req, res, next)=>{
        let ID = req.params.id;
        let mail = req.params.email;
        ProjectManagerService.removeProjectMember(db,ID, mail)
            .then(ans=>{
                if(ans.modifiedCount >0){
                    res.send({
                        message: "Member removed successfully."
                    })
                }else{
                    res.send({
                        message: "Could not remove member."
                    })
                }
            })
            .catch((err)=>{
                res.status(500).send({
                    message: "Server error: could not remove member.",
                    err: err
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

    if(ID===undefined || ID == null){
        res.send({
            message: "The provided ID is invalid."
        })
    }else if(pname===undefined || pname == null){
        res.send({
            message: "The provided project name is invalid."
        })
    }else if(ddate===undefined || ddate == null){
        res.send({
            message: "The provided due date is invalid."
        })
    }else if(sdate===undefined || sdate == null){
        res.send({
            message: "The provided starting date is invalid."
        })
    }else if(owner===undefined || owner == null){
        res.send({
            message: "The provided owner is invalid."
        })
    }else if(graph===undefined || graph == null){
        res.send({
            message: "The provided graph is invalid."
        })
    }else if(groupMembers===undefined || groupMembers == null){
        res.send({
            message: "The provided groupmembers is invalid."
        })
    }

    ProjectManagerService.updateEverythingProject(db,ID,pname,ddate,sdate,owner, graph, groupMembers)
        .then(ans=>{
            if(ans.modifiedCount > 0){
                res.send({
                    message: "The project was updated."
                })
            }else{
                res.send({
                    message: "The project was not updated."
                })
            }

        })
        .catch(err=>{
            res.status(500).send({
                message: "Server error: Could not update the project.",
                err: err
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

router.patch('/updateProjectOwner/:id/:email',(req,res)=>{
    let ID = req.params.id;
    let mail = req.params.email;
    if(ID=== undefined || ID == null){
        res.send({
            message: "The ID provided was not valid"
        })
    }else if(mail ===undefined || mail == null){
        res.send({
            message: "The email address provided is not valid."
        })
    }

    ProjectManagerService.updateProjectOwner(db,ID,mail)
        .then(ans=>{
            if(ans == null || undefined){
                res.send({
                    message: "Could not update the project."
                })
            }else if(ans.modifiedCount > 0){
                res.send({
                    message: "The project was updated."
                })
            }else{
                res.send({
                    message: "The project was not updated."
                })
            }

        })
        .catch(err=>{
            res.status(500).send({
                message: "Server error: Could not update the project.",
                err: err
            })
        })

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
