require('dotenv').config({path:'../../.env'})
const express = require('express');
const Permissions = require('../../Helpers/Permissions');
const mongoose = require('mongoose') ;
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;
const ProjectManagerService = require('../../Services/ProjectManagerService');
const userManagementService = require('../../Services/UserManagerService');
const kanbanBoard = require('../../Helpers/kanbanBoard');
const DAGservice = require('../../Helpers/DAG');
const { param,body, validationResult } = require('express-validator');
const mailer = require('../../Helpers/SendMail');
const authentication = require('../../Helpers/Authentication');
const authorisation =  require('../../Helpers/Authorisation');
const { auth, requiresAuth } = require('express-openid-connect');
const jwt = require("jsonwebtoken");
function makeProjectRoute(db) {


    router.get('/requestToken',
        (req,res)=>{
            // Authentication Uuser

            authentication.generateToken(req,res,db)
                .then((token)=>{
                    res.send({
                        message3: token
                    })
                })
                .catch(err=>{
                    res.send({
                        message: "token creation failed"
                    })
                });


        })

    router.get("/sendMail", (req,res)=> {

        const projectOwner =  req.body.ownerName;
        const email = req.body.email

        mailer.sendInvites("test Project 1", email);

    })

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

    router.get("/deleteTask",
        authentication.authenticateToken,
        authorisation.AuthoriseDeleteTask,
        param('email').exists().isEmail(),
        (req,res)=>{

    })

    /**
     * @api {get}  /task/convertToKanbanBoard
     * @apiName return as given project as datasourse for kanban
     * @apiDescription This endpoint creates a datasourse for a kanban board
     * @apiGroup Project
     * @apiSuccess (200) {object} datasourse for kanban
     */
    router.get('/convertToKanbanBoard',
        authentication.authenticateToken,
        authorisation.AuthoriseKanbanBoard,
        param('id').exists().notEmpty().isMongoId(),
        (req,res)=>{
            const failedValidation = validationResult(req);
            if(!failedValidation.isEmpty()){
                res.status(420).send({
                    message: "Bad request , invalid parameters",
                    data: failedValidation
                })
            }


        const ProjectId = req.body.projectID;
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
    router.get('/listProjects',
        (req, res) => {

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
     * @api {get}  /task/getProjectByID/:id
     * @apiName list projects owned by email
     * @apiDescription This endpoint returns a list of all Projects belonging to the user mathing the passed in email
     * @apiGroup Project
     * @apiSuccess (200) {List} list of Project objects
     */
    router.get('/getProjectByID/:id',
        param('id').exists().notEmpty().isMongoId(),
        (req,res)=>{
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


    /**
     * @api {post}  /task/newProject
     * @apiName create new Project
     * @apiDescription This endpoint creates a new Project
     * @apiGroup Project
     * @apiSuccess (200) {List} list of Project objects
     */
    router.post('/newProject',
        body('projectName').exists().notEmpty().isString(),
        body('startDate').exists().notEmpty().isDate(),
        body('dueDate').exists().notEmpty().isDate(),
        body('groupMembers').exists().notEmpty().isArray(),
        (req, res) => {
            const invalidFields = validationResult(req);
            if(!invalidFields.isEmpty()){
                res.status(420).send({
                    message: "Bad request , invalid id",
                    data: invalidFields
                })
            }

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

    router.post('/addToProjectGroupMembers',
        authentication.authenticateToken,
        authorisation.AuthoriseAddMembers,
        body('email').exists().notEmpty().isEmail(),
        body('projectID').exists().notEmpty().isMongoId(),
        (req, res)=>{
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


    router.delete('/deleteProject',
        authentication.authenticateToken,
        authorisation.AuthoriseDeleteProject,
        body('email').exists().notEmpty().isEmail(),
        body('projectID').exists().notEmpty().isMongoId(),
    (req,res)=>{
        let ID = req.body.projectID;

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


    router.patch('/updateProjectGraph',
        authentication.authenticateToken,
        authorisation.AuthoriseUpdateGraph,
        body('projectID').exists().notEmpty().isMongoId(),
        body('email').exists().notEmpty().isEmail(),
        (req, res, )=>{
            let ID = req.body.projectID;
            let grph = req.body.graph;
            let grph2 = JSON.parse(grph);


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


    router.patch('/removeProjectMember',
        authentication.authenticateToken,
        authorisation.AuthoriseRemoveMembers,
        body('projectID').exists().notEmpty().isMongoId(),
        body('email').exists().notEmpty().isEmail(),
        (req, res)=>{
            let ID = req.body.projectID;
            let mail = req.body.email;
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


    router.put('/updateEverythingProject',
        authentication.authenticateToken,
        authorisation.AuthoriseUpdateAllProject,
        body('projectID').exists().notEmpty().isMongoId(),
        body('projectName').exists().notEmpty(),
        body('dueDate').exists().notEmpty().isDate(),
        body('startDate').exists().notEmpty().isDate(),
        body('owner').exists().notEmpty(),
        body('graph').exists().notEmpty(),
        body('email').exists().notEmpty().isEmail(),
        (req,res)=>{
            const ID = req.body.projectID;
            let pname = req.body.projectName;
            let ddate = req.body.dueDate;
            let sdate = req.body.startDate;
            let owner = req.body.owner;
            let graph = req.body.graph;
            let groupMembers = req.body.groupMembers;


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


    router.patch('/updateProjectOwner/:id/:email',
        authentication.authenticateToken,
        authorisation.AuthoriseUpdateProjectOwner,
        body('email').exists().notEmpty().isEmail(),
        body('projectID').exists().notEmpty().isMongoId(),
        body('newOwnerEmail').exists().notEmpty().isEmail(),
        (req,res)=>{
            let ID = req.body.projectID;
            let mail = req.body.newOwnerEmail;

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





 return router;
}



module.exports = makeProjectRoute;
