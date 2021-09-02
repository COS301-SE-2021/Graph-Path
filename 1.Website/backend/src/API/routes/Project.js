require('dotenv').config({path:'../../.env'})
const express = require('express');
const mongoose = require('mongoose') ;
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;
const ProjectManagerService = require('../../Services/ProjectManagerService');
const kanbanBoard = require('../../Helpers/kanbanBoard');
const DAGservice = require('../../Helpers/DAG');
const { param,body, validationResult } = require('express-validator');
const mailer = require('../../Helpers/SendMail');
const authentication = require('./Middleware/Authentication');
const authorisation =  require('./Middleware/Authorisation');
const { auth, requiresAuth } = require('express-openid-connect');
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

    router.get("/sendMail",
        (req,res)=> {

        const projectOwner =  req.body.email;
        const email = req.body.email;
        const projectName = "test new project";
        const projectDueDate = "1998/10/25";
        const projectDescription = " this is the project and tells us what the project is about";
       // mailer.newAccount(email);
        //mailer.sendInvites("test Project 1", email);
        //mailer.newProject(projectName,projectOwner,projectDueDate,projectDescription)


    })



    router.get("/deleteTask",
        authentication.authenticateToken,
        authorisation.AuthoriseDeleteTask,
        param('email').exists().isEmail(),
        (req,res)=>{

        res.send({
            message: "token still works"
        })

    })

    /**
     * @api {get}  /project/convertToKanbanBoard
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
     * @api {get}  /project/listProjects
     * @apiName list of Projects
     * @apiDescription This endpoint returns a list of all Projects
     * @apiGroup Project
     * @apiSuccess (200) {List} list of Project objects
     */
    router.get('/listProjects',
        authentication.authenticateToken,
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
     * @api {get}  /project/getAllProjectsByUserEmail/:email
     * @apiName list projects owned by email
     * @apiDescription This endpoint returns a list of all Projects belonging to the user
     *                 mathing the passed in email
     * @apiGroup Project
     * @apiSuccess (200) {List} list of Project objects
     */
    router.get('/getAllProjectsByUserEmail/:email',
        authentication.authenticateToken,
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
     * @api {get}  /project/getProjectByID/:id
     * @apiName list projects owned by email
     * @apiDescription This endpoint returns a list of all Projects belonging to the user
     *                 mathing the passed in email
     * @apiGroup Project
     * @apiSuccess (200) {List} list of Project objects
     */
    router.get('/getProjectByID/:id',
        authentication.authenticateToken,
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
     * @api {post}
     * @apiName
     * @apiDescription
     * @apiGroup Project
     * @apiSuccess (200)
     */
    router.post('/newProject',
        body('projectName').exists().notEmpty().isString(),
        body('description').exists().notEmpty().isString(),
        body('startDate').exists().notEmpty().isDate(),
        body('dueDate').exists().notEmpty().isDate(),
        body('email').exists().notEmpty(),
        authentication.authenticateToken,
        (req, res,next) => {
            const invalidFields = validationResult(req);
            if(!invalidFields.isEmpty()){
                res.send({
                    message: "Bad request , invalid id",
                    data: invalidFields
                })
            }

            else {

                let ownerMemberObject = {
                    email:req.body.email,
                    permissions: ['owner']
                }

                let data ={
                    _id:  new mongoose.mongo.ObjectID(),
                    projectOwner: req.body.email,
                    projectName: req.body.projectName,
                    projectDescription: req.body.description,
                    startDate :req.body.startDate,
                    dueDate : req.body.dueDate,
                    status: "not started",
                    groupMembers :[ownerMemberObject],
                    graph: {},
                    lastAccessed: new Date(),

                };

                console.log("attempting to add new project...")
                ProjectManagerService.insertProject(db,data)
                    .then(ans=>{

                        //mailer.newProject(data.projectName,data.projectOwner,data.dueDate,data.description)
                        console.log("successfully added new project.");
                        console.log("attempting to update token...");
                        authentication.generateToken(req,res,db)
                            .then((token)=>{
                                console.log("successfully updated token...check your headers");
                                res.setHeader("authorization","Bearer "+token);
                                res.send({
                                    message:"The Project has been created.",
                                    newToken: token,
                                    data: ans,
                                })
                            })
                            .catch(err=>{

                                console.log("failed to add new project.");
                                res.send({
                                    message: "failed to update token after project creation"
                                })
                            })

                })
                    .catch(err=>{
                    res.send({
                        message: "The project was not created."
                    })
                })

            }
    });


    /**
     * @api {post}
     * @apiName
     * @apiDescription
     * @apiGroup Project
     * @apiSuccess (200)
     */
    router.post('/addToProjectGroupMembers',
        authentication.authenticateToken,
        authorisation.AuthoriseAddMembers,
        body('email').exists().notEmpty().isEmail(),
        body('projectID').exists().notEmpty().isMongoId(),
        (req, res)=>{

            const invalidFields = validationResult(req);
            if(!invalidFields.isEmpty()){
                res.status(420).send({
                    message: "Bad request , invalid id",
                    data: invalidFields
                })
            }
            let ID = req.body.projectID;
            let memberObjects = req.body.groupMembers;

            let MemberEmails = [];
            for (const memberKey in memberObjects) {

                MemberEmails.push(memberObjects[memberKey].email);
            }

            console.log("attempting to add new members...")
            ProjectManagerService.addNewProjectMember(db,ID,memberObjects)
                .then((project)=>{
                const projectName = project.projectName;
                const projectOwner =project.owner;
                const projectDueDate =project.dueDate;
                const recipients =MemberEmails ;
                //mailer.sendInvites(projectName,projectOwner,projectDueDate,recipients);

                    console.log("successfully added new members...")
                res.send({
                    message:"successfully added members"
                })
            })
                .catch(err=>{
                res.send({
                    message: "failed to add members",
                    data: err
                })
            })



    });

    /**
     * @api {post}
     * @apiName
     * @apiDescription
     * @apiGroup Project
     * @apiSuccess (200)
     */
    router.delete('/deleteProject',
        authentication.authenticateToken,
        authorisation.AuthoriseDeleteProject,
        body('email').exists().notEmpty().isEmail(),
        body('projectID').exists().notEmpty().isMongoId(),
        (req,res)=>{
            const invalidFields = validationResult(req);
            if(!invalidFields.isEmpty()){
                res.send({
                    message: "Bad request , invalid id",
                    data: invalidFields
                })
            }

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
                    console.log('this why',err)
            res.send({
                message:"Could not remove project."
            })
        })
});

    /**
     * @api {post}
     * @apiName
     * @apiDescription
     * @apiGroup Project
     * @apiSuccess (200)
     */
    router.patch('/updateProjectGraph',
        authentication.authenticateToken,
        authorisation.AuthoriseUpdateGraph,
        body('projectID').exists().notEmpty().isMongoId(),
        body('email').exists().notEmpty().isEmail(),
        body('graph').exists().notEmpty().isObject(),
        (req, res, )=>{

            const invalidFields = validationResult(req);
            if(!invalidFields.isEmpty()){
                res.status(420).send({
                    message: "Bad request , invalid id",
                    data: invalidFields
                })
            }
            let ID = req.body.projectID;
            let grph = req.body.graph;
            //let grph2 = JSON.parse(grph);

            ProjectManagerService.updateProjectGraph(db,ID,grph )
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

    /**
     * @api {post}
     * @apiName
     * @apiDescription
     * @apiGroup Project
     * @apiSuccess (200)
     */
    router.patch('/removeProjectMember',
        authentication.authenticateToken,
        authorisation.AuthoriseRemoveMembers,
        body('projectID').exists().notEmpty().isMongoId(),
        body('email').exists().notEmpty().isEmail(),
        (req, res)=>{
            const invalidFields = validationResult(req);
            if(!invalidFields.isEmpty()){
                res.status(420).send({
                    message: "Bad request , invalid id",
                    data: invalidFields
                })
            }
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

    /**
     * @api {post}
     * @apiName
     * @apiDescription
     * @apiGroup Project
     * @apiSuccess (200)
     */
    router.put('/updateEverythingProject',
        authentication.authenticateToken,
        authorisation.AuthoriseUpdateAllProject,
        body('projectID').exists().notEmpty().isMongoId(),
        body('email').exists().notEmpty().isEmail(),
        body('projectName').exists().notEmpty(),
        body('dueDate').exists().notEmpty().isDate(),
        body('startDate').exists().notEmpty().isDate(),
        body('owner').exists().notEmpty(),
        body('graph').exists().notEmpty().isObject(),

        (req,res)=>{
            const invalidFields = validationResult(req);
            if(!invalidFields.isEmpty()){
                res.send({
                    message: "Bad request , invalid id",
                    data: invalidFields
                })
            }
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
            res.send({
                message: "Server error: Could not update the project.",
                err: err
            })
        })
});

    /**
     * @api {post}
     * @apiName
     * @apiDescription
     * @apiGroup Project
     * @apiSuccess (200)
     */
    router.patch('/updateProjectOwner',
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


    /**
     * @api {post} /updateProjectAccessData
     * @apiName update project access date
     * @apiDescription  This endpoint updates the last time a user accessed a project.
     * @apiGroup Project
     * @apiSuccess (200) {object}  message : "The project updated successfully"
     */
    router.post('/updateProjectAccessData',
        authentication.authenticateToken,
        authorisation.AuthoriseUpdateProjectAccessData,
        body('projectID').exists().notEmpty().isMongoId(),
        body('lastDateAccessed').exists().notEmpty().isDate(),
        (req,res)=>{
            const ID = req.body.projectID;
            let lastDate = req.body.lastDateAccessed;


            ProjectManagerService.updateProjectAccessData(db,ID,lastDate)
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


 return router;
}



module.exports = makeProjectRoute;
