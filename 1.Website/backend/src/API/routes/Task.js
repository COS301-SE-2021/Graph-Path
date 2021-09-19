require('dotenv').config({path:'../../.env'})
const authentication = require("./Middleware/Authentication");
const authorisation = require("./Middleware/Authorisation");
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const TaskManagerService = require('../../Services/TaskManagerService');
const { body, validationResult, param,check} = require('express-validator');
const ProjectManagerService = require("../../Services/ProjectManagerService");
const mailer = require("../../Helpers/SendMail");

function  makeTaskRoute(db)
{
    /**
     * @api {get}  /task/getTasksByDescription
     * @apiName get All tasks by Description
     * @apiDescription This endpoint returns a list of task objects matching the given description
     * @apiPermission authorised user
     * @apiGroup Task
     * @apiParam  {String} [description] Description
     * @apiSuccess (200) {Object} mixed `User` object
     */


    router.get('/getStatusStats',
        (req,res)=>{
        // get NodeID
        //get Tasks for NodeID
        //separate by Status
        const nodeID = req.body.nodeID;
        TaskManagerService.getAllNodeTasks(db,nodeID).then((tasks)=>{
            let notStarted = 0;
            let inProgress = 0;
            let completed =  0;
            for (let i = 0; i < tasks.length; i++) {

                if(tasks[i].status ==="not started"){
                    notStarted++;
                }
                else if(tasks[i].status ==="in progress"){
                    inProgress++;
                }
                else if(tasks[i].status ==="complete"){
                    completed++;
                }

            }

            let total  = completed+inProgress+notStarted;
            let threshold;
            if(total === 0){
                 threshold = 0;
            }
            else{
                 threshold = completed/(completed+inProgress+notStarted);
            }



            res.send({
                message: "successfully sent",
                nodeCompletionStatus: threshold
            })

        })
            .catch(err=>{
                console.log("err getting tasks of a node")
                res.send({
                    message:"err getting tasks of a node",
                    data: err
                })
            })

    })
    router.get('/getTasksByDescription',

        body('description').exists().not().isEmpty().trim(),
        (req, res)=> {
            const failedValidations = validationResult(req);
            if(!failedValidations.isEmpty()){
                res.status(420).send({
                    message: "Bad Request",
                    data: []
                })
            }

            let desc = req.body.description;
            let responseObj = {
            message:"",
            body:[]
            }

        db.collection('Tasks').findOne({
            description:desc
        })
            .then((result)=>{
                if (result != null) {
                    console.log("get task by description successful")
                    responseObj.message="successful";
                    responseObj.body = result;
                    res.send(responseObj);
                }

                else {
                    console.log("get task by description failed: No task with such description")
                    responseObj.message ="failed. No task with given description";
                    responseObj.body = null;
                    res.status(404).send(responseObj)

                }

            })
            .catch((err)=>{
                console.log("Server error: "+err);
                responseObj.message="failed. Error with DB:"+err;
                res.status(500).send(responseObj)

            });


    });




    /**
     * @api {get} task/getAllTasks
     * @apiName get all Tasks
     * @apiPermission admin
     * @apiGroup Task
     * @apiSuccess (200) {Array}  an array of all the tasks in a project.
     */
    router.get('/getAllTasks',
        (req, res)=> {

        TaskManagerService.getAllTasks(db)
            .then((ans)=>{
                if(ans === "No available tasks"){
                    res.send({
                        message:"There were no available tasks to retrieve.",
                        data: []
                    })
                }else if(ans !== null){
                    res.send({
                        message: "The tasks were retrieved.",
                        data: ans
                    })
                }
            })
            .catch((err)=>{
                res.status(500).send({
                    message:"Server error: could not get tasks.",
                    err:err
                })
            });

    });



    /**
     * @api {get}  /task/getTasksByProject
     * @apiName get All tasks by Project ID
     * @apiDescription This endpoint returns a list of task objects matching the given project ID
     * @apiPermission authorised user
     * @apiGroup Task
     * @apiParam  {String} [id] Description
     * @apiSuccess (200) {list} list of task objects
     */
    router.get('/getAllTasksByProject/:id',

        param('id').exists().isMongoId(),
        (req, res)=> {
            const invalidValidations = validationResult(req);
            if(!invalidValidations.isEmpty()) {
                res.status(420).send({
                    message : "Bad request , Invalid params",
                    data: invalidValidations
                })
            }


            let ID = req.params.id;
            TaskManagerService.getAllTasksByProject(db,ID)
                .then((ans)=>{
                if(ans === "No tasks found"){
                    res.send({
                        message: "There were no tasks found."
                    })
                }else{
                    res.send({
                        message: "Tasks found successfully.",
                        data: ans
                    })
                }
            })
                .catch((err)=>{
                res.status(500).send({
                    message: "Server error: could not retrieve tasks.",
                    err: err
                })
            });


    });

    /**
     * @api {get}  /task/getTaskByID/:id
     * @apiName get All tasks by task ID
     * @apiDescription This endpoint returns a single task object matching the given task ID
     * @apiGroup Task
     * @apiParam  {String} [id] task id
     * @apiSuccess (200) {object} mixed  'task' object
     */
    router.get('/getTaskByID/:id',

        param('id').exists().not().notEmpty().contains('_n'),
        (req,res)=>{
            const invalidFields = validationResult(req);
            if(!invalidFields.isEmpty()){
            res.status(420).send({
                message: "Bad request , invalid id",
                data: invalidFields
            })
            }


        TaskManagerService.getTaskByID(db,ID)
            .then((ans)=>{
                if (ans === "No available task"){

                    res.send({
                        message:"Could not find the task."
                    }) ;
                }
                else{
                    res.send({
                        message:`The task was retrieved.` ,
                        data:ans
                    }) ;
                }

            })
            .catch(err=>{
                res.status(500).send({
                    message:"Server error: could not get task.",
                    err: err
                })
            })
    }) ;

    router.get('/getUserTasks/:email',
        authentication.authenticateToken,
        param('email').exists().notEmpty().isEmail(),
       async (req,res)=>{
            const invalidFields = validationResult(req);
            if(!invalidFields.isEmpty()){
                res.status(420).send({
                    message: "Bad request , invalid id",
                    data: invalidFields
                })
            };

           const userEmail = req.params.email;
           let responseObj = {
               message:"",
               data: []
           }

           let projects = {
               names: [],
               IDs: []
           };
           await ProjectManagerService.getAllProjectsByUserEmail(db,userEmail)
               .then((UserProjects)=>{
                   for (const userProject of UserProjects) {
                        projects.names.push(userProject.projectName);
                        projects.IDs.push(userProject._id.toString());
                   }

               })
               .catch((err)=>{
                   responseObj.message= "failed to get projects by email";
                   responseObj.data = err;
               })

             await TaskManagerService.getTasksMultipleProjects(db,projects.IDs)
               .then((tasks)=>{
                   responseObj.message = "successful";
                   for (let i = 0; i < tasks.length ; i++) {
                       let pName = "";
                       for (let j = 0; j < projects.names.length; j++) {

                           if(projects.IDs[j] === tasks[i].projectID.toString()){

                               pName = projects.names[j];
                               break;
                           }
                       }
                       let taskObj = {
                           projectID: tasks[i].projectID,
                           ProjectName:pName,
                           title: tasks[i].title,
                           description: tasks[i].description,
                           issued: tasks[i].issued,
                           dueDate: tasks[i].due,

                       }

                      responseObj.data.push(taskObj);

                   }


               })
               .catch(err=>{
                   responseObj.message = "failed to get tasks of list of projects";
                   responseObj.data = err
               })

           res.send(
               responseObj,
           )


    })

    // all tasks
    // all tasks by node
    //
    /**
     * @api {post}  /task/insertTask
     * @apiName  insert new task
     * @apiDescription This endpoint inserts a new task to the Project
     * @apiGroup Task
     * @apiParam  {String} [description] Description
     * @apiParam  {String} [status] 'not started' ,'in progress', 'complete' , 'back-log'
     * @apiParam  {String} [project] projectID
     * @apiParam  {object} [assignee] {email: "user email address",role: "user role}
     * @apiParam  {string} [assigner] email of assigner
     * @apiParam  {Date} [due]  due date of task
     * @apiParam  {Date} [issued]  issued date of task
     * @apiSuccess (200) {list} list of task objects
     */
    router.post('/insertTask',
        body('description').exists().notEmpty().notEmpty().isString(),
        body('title').exists().notEmpty().notEmpty().isString(),
        body('status').exists().notEmpty().isIn(['not started' ,'in progress', 'complete' , 'back-log']),
        body('projectID').exists().notEmpty(),
        body('email').exists().notEmpty().isEmail(),
        //body('taskMembers').exists().notEmpty(),
        body('assigner').exists().notEmpty(),
        body('due').exists().isDate(),
        body('issued').exists().isDate(),
        body('nodeID').exists().notEmpty().isString(),
        authentication.authenticateToken,
        authorisation.AuthoriseAddTask,
        async (req, res)=>{

            const validationFails = validationResult(req);
            if(!validationFails.isEmpty()){
                console.log("validation failed",validationFails)
                res.send({
                    message: "invalidation failed , check fields",
                    data : validationFails
                })
            }
            else {
                let TaskObject = {
                    _id: new mongoose.mongo.ObjectID(),
                    description:req.body.description,
                    title:req.body.title,
                    status:req.body.status,
                    projectID:req.body.projectID,
                    taskMembers:req.body.taskMembers,
                    assigner:req.body.assigner,
                    due:req.body.due,
                    issued:req.body.due,
                    nodeID: req.body.nodeID
                }
                console.log("Attempting to insert a new task...");
                let insertTaskServiceResponse;
                await TaskManagerService.insertTask(db,TaskObject)
                    .then((ans)=>{
                        console.log("Successfully added new task");
                        insertTaskServiceResponse = ans;


                    })
                    .catch(err=>{
                        console.log("failed to add new task due to server error...");
                        res.status(500).send({
                            message:"Server error: could not create task.",
                            err:err
                        })
                    });

                const nodeID = req.body.nodeID;
                let responseObj = {
                    data:insertTaskServiceResponse,
                    message:"" ,
                } ;
                console.log("Attempting to get create node completion stats after insert Task...");
                await TaskManagerService.getAllNodeTasks(db,nodeID)
                    .then((tasks)=>{
                        console.log("processing all tasks of node : " +req.body.title+"...");
                        let notStarted = 0;
                        let inProgress = 0;
                        let completed =  0;
                        for (let i = 0; i < tasks.length; i++) {

                            if(tasks[i].status ==="not started"){
                            notStarted++;
                            }
                            else if(tasks[i].status ==="in progress"){
                                inProgress++;
                            }
                            else if(tasks[i].status ==="complete"){
                                completed++;
                            }
                        }

                        let total  = completed+inProgress+notStarted;
                        if( notStarted !== 0 && inProgress === 0){
                            responseObj.nodeCompletionStatus = "not started";
                        }

                       else if(inProgress !== 0){
                            responseObj.nodeCompletionStatus = "in progress";
                        }

                       else if(notStarted === 0 && inProgress === 0 && completed === total ){
                            responseObj.nodeCompletionStatus = "complete";

                        }

                    console.log("Successfully generated node completion statistics");
                    
                        responseObj.message ="The task was saved successfully." ;
                        //responseObj.nodeCompletionStatus =  threshold
                    
                })
                    .catch(err=>{

                        console.log("failed to get all tasks of node : " +req.body.title+"...");
                            responseObj.message  = "err getting tasks of a node" ; 
                            responseObj.data =  err
                    })
                res.send(responseObj) ;
                
            }



    });



    /**
     * @api {delete}  /task/deleteTaskByID/:id
     * @apiName  delete task by task ID
     * @apiDescription This endpoint deletes a task matching the passed in ID
     * @apiGroup Task
     * @apiParam  {String} [id] task ID
     */
    router.delete('/deleteTaskByID/:id',
        authentication.authenticateToken,
        authorisation.AuthoriseDeleteTask,
        param('id').isMongoId(),
       async (req, res)=>{
            const failedValidation = validationResult(req);
            if(!failedValidation.isEmpty()){
            res.status(420).send({
                message: "Bad request , invalid parameters",
                data: failedValidation
            })
            }
            let ID = req.params.id ;
            let responseObj = {};
            await TaskManagerService.deleteTaskByID(db,ID)
                .then((ans)=>{
                if(ans.deletedCount >0){
                    responseObj.message="The task was successfully removed.";

                }else{
                    responseObj.message="The task could not be removed.";
                }

            })
                .catch(err=>{
                res.status(500).send({
                    message:"Server error: could not remove the task.",
                    err:err
                })
            });


           res.send(responseObj);
    })

    //Also add delete for all tasks by nodeid 

    router.delete("/deleteTaskByNodeID/:id",
        authentication.authenticateToken,
        authorisation.AuthoriseDeleteTask,
        body('projectID').exists().notEmpty(),
        body('email').exists().notEmpty().isEmail(),
        // param('nodeID').exists().notEmpty(),
        async (req, res)=>{
        console.log("attempting to delete all tasks of a Node...");
        const failedValidation = validationResult(req);
        if(!failedValidation.isEmpty()){
            res.status(420).send({
                message: "Bad request , invalid parameters",
                data: failedValidation
            })
        }
        let ID = req.params.id ;
        let responseObj = {};

        await TaskManagerService.deleteTaskByNodeID(db,ID)
            .then((ans)=>{
                if(ans.deletedCount >0){
                    console.log("successfully deleted all tasks of a Node.");
                    responseObj.message="The task was successfully removed.";
                }else{
                    console.log("failed to  delete all tasks of a Node.");
                    responseObj.message="The task could not be removed.";
                }

            })
            .catch(err=>{
                console.log("failed to  delete all tasks of a Node.");
                res.status(500).send({
                    message:"Server error: could not remove the task.",
                    err:err
                })
            });

        console.log("Attempting to get create node completion stats after delete task by ID...");
        await TaskManagerService.getAllNodeTasks(db,ID)
            .then((tasks)=>{
                    console.log("processing all tasks of node : " +req.body.title+"...");
                    let notStarted = 0;
                    let inProgress = 0;
                    let completed =  0;
                    for (let i = 0; i < tasks.length; i++) {

                        if(tasks[i].status ==="not started"){
                            notStarted++;
                        }
                        else if(tasks[i].status ==="in progress"){
                            inProgress++;
                        }
                        else if(tasks[i].status ==="complete"){
                            completed++;
                        }
                    }

                    let total  = completed+inProgress+notStarted;
                    if( notStarted !== 0 && inProgress === 0 ){
                        responseObj.nodeCompletionStatus = "not started";
                    }

                    else if(inProgress !== 0){
                        responseObj.nodeCompletionStatus = "in progress";
                    }

                    else if(notStarted === 0 && inProgress === 0 && completed === total ){
                        responseObj.nodeCompletionStatus = "complete";

                    }

                    console.log("Successfully generated node completion statistics");
                    responseObj.message ="The task was saved successfully." ;
                    //responseObj.nodeCompletionStatus =  threshold

                })
            .catch(err=>{

                    console.log("failed to get all tasks of node : " +req.body.title+"...");
                    responseObj.message  = "err getting tasks of a node" ;
                    responseObj.data =  err
                })

            res.send(responseObj);
    })

    //and delete task by projectID, for when the project is deleted. - or you can just hook that up to when a project is deleted.





    /**
     * @api {patch}  /updateTaskDescription'
     * @apiName  update task description
     * @apiDescription This endpoint updates the description of the task matching the passed in ID
     * @apiGroup Task
     * @apiParam  {String} [id] task ID
     * @apiParam  {String} [description] " "
     * @apiSuccess (200) {object}  message : "The task updated successfully"
     */
    router.patch('/updateTaskDescription',
        body('id').isMongoId(),
        body('description').exists().notEmpty(),

        (req,res)=>{
            const failedValidation = validationResult(req);
            if(!failedValidation.isEmpty()){
                res.status(420).send({
                    message: "Bad request , invalid parameters",
                    data: failedValidation
                })
            }

            let id = req.body.id;
            let newDesc = req.body.description;
            if(newDesc === undefined || newDesc === ""){
            res.send({
                message:"The description can't be empty.",
                data: []
            })
        }
            TaskManagerService.updateTaskDescription(db,id, newDesc)
                .then(ans=>{
                if(ans.modifiedCount >0){
                    res.send({
                        message: "The task was updated successfully.",
                        data: []
                    })
                }else{
                    res.send({
                        message: "The task could not be updated.",
                        data: []
                    })
                }
            })
                .catch(err=>{
                res.status(200).send({
                    message: "server error: could not update task.",
                    data:err
                })
            })


    });


    /**
     * @api {patch}  /updateTaskStatus'
     * @apiName  update task status
     * @apiDescription This endpoint updates the status of the task matching the passed in ID
     * @apiGroup Task
     * @apiParam  {String} [id] task ID
     * @apiParam  {String} [status] 'not started' ,'in progress', 'complete' , 'back-log'
     * @apiSuccess (200) {object}  message : "The task updated successfully"
     */
    router.patch('/updateTaskStatus',
        body('id').isMongoId(),
        body('status').exists().notEmpty().isIn(['not started' ,'in progress', 'complete' , 'back-log']),
        (req,res)=>{

            const failedValidation = validationResult(req);
            if(!failedValidation.isEmpty()){
                res.status(420).send({
                    message: "Bad request , invalid parameters",
                    data: failedValidation
                })
            }


            let ID = req.body.id;
            let newStat = req.body.status;
            TaskManagerService.updateTaskStatus(db,ID, newStat)
            .then(ans=>{
              if(ans === "Success"){
                  res.send({
                      message: "The task updated successfully"
                  })
              }else{
                  res.send({
                      message: "Could not update the task."
                  })
              }
          })
            .catch(err=>{
              res.status(500).send({
                  message: "Server error: could not update the task",
                  err: err
              })
          })


    });



    router.post('/addToTaskGroupMembers',
        authentication.authenticateToken,
        authorisation.AuthoriseAddMembers,
        body('email').exists().notEmpty().isEmail(),
        body('projectID').exists().notEmpty().isMongoId(),
        body('groupMembers').exists().notEmpty(),
        (req, res)=>{

            const invalidFields = validationResult(req);
            if(!invalidFields.isEmpty()){
                res.status(420).send({
                    message: "Bad request , invalid id",
                    data: invalidFields
                })
            }
            let taskID = req.body.taskID;
            let memberObjects = req.body.groupMembers;

            let MemberEmails = [];
            for (const memberKey in memberObjects) {

                MemberEmails.push(memberObjects[memberKey].email);
            }

            console.log("attempting to add new members...")
            TaskManagerService.addTaskMembers(db,taskID,memberObjects)
                .then((project)=>{
                    const projectName = project.projectName;
                    const projectOwner =project.owner;
                    const projectDueDate =project.dueDate;
                    const recipients =MemberEmails ;
                    mailer.sendInvites(projectName,projectOwner,projectDueDate,recipients);

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
     * @api {patch}  /updateTaskAssigner'
     * @apiName  update task Assigner
     * @apiDescription This endpoint updates the assigner of the task matching the passed in ID
     * @apiGroup Task
     * @apiParam  {String} [id] task ID
     * @apiParam  {object} [Assignee] '{email:"" , role:""}'
     * @apiSuccess (200) {object}  message : "The task updated successfully"
     */
    router.patch('/updateTaskAssigner',
        body('id').exists().notEmpty().isMongoId(),
        body('assigner').exists().notEmpty(),

        (req,res,)=>{
            const failedValidation = validationResult(req);
            if(!failedValidation.isEmpty()){
                res.status(420).send({
                    message: "Bad request , invalid parameters",
                    data: failedValidation
                })
            }


            let ID = req.body.id;
            let assigner =req.body.assigner;
            TaskManagerService.updateTaskAssigner(db,ID, assigner)
                .then(ans=>{
                if(ans === "Success"){
                    res.send({
                        message: "The task updated successfully"
                    })
                }else{
                    res.send({
                        message: "Could not update the task."
                    })
                }
            })
                .catch(err=>{
                res.status(500).send({
                    message: "Server error: could not update the task",
                    err: err
                })
            })

    });




    /**
     * @api {patch}  /updateEverythingTask'
     * @apiName  update all details of a task object
     * @apiDescription This endpoint updates all fields of the task matching the passed in ID
     * @apiGroup Task
     * @apiParam  {String} [id] task ID
     * @apiParam  {object} [Assignee] '{email:"" , role:""}'
     * @apiParam  {object} [Assigner] '{email:"" , role:""}'
     * @apiParam  {String} [description] "description"
     * @apiParam  {String} [issued] YYYY/MM/DD
     * @apiParam  {String} [due] YYYY/MM/DD
     * @apiParam  {String} [nodeID] ""
     * @apiParam  {String} [stats] 'not started' ,'in progress', 'complete' , 'back-log'
     * @apiParam  {String} [project] project ID
     * @apiSuccess (200) {object}  message : "The task updated successfully"
     */
    router.patch('/updateEverythingTask',

        body('taskID').exists().notEmpty().isMongoId(),
        body('assigner').exists().notEmpty().isArray(),
        body('description').exists().notEmpty().isString(),
        body('issued').exists().notEmpty().isDate(),
        body('due').notEmpty().isDate(),
        body('nodeID').exists().notEmpty(),
        body('status').exists().isIn(['not started' , 'in progress' , 'complete']),
        body('projectID').exists().isMongoId(),
        authentication.authenticateToken,
        // authorisation.AuthoriseDeleteTask,
        async (req, res)=>{

            const invalidFields = validationResult(req);
            if(!invalidFields.isEmpty()){
            res.status(420).send({
                message: "Bad Request. Validation failed",
                data: invalidFields
            })
            }
            const taskID = req.body.taskID;
            const nodeID = req.body.nodeID ; 
            let TaskObject = {
                description:req.body.description,
                title:req.body.title,
                status:req.body.status,
                projectID:req.body.projectID,
                taskMembers:req.body.taskMembers,
                assigner:req.body.assigner,
                due:req.body.due,
                issued:req.body.issued,
                nodeID: req.body.nodeID
            }
            let responseObj = {};

            await TaskManagerService.updateEverythingTask(db,taskID,TaskObject)
                .then((ans)=>{
                if(ans == null){
                   responseObj.message="The task was not updated.";
                }else if(ans.modifiedCount < 1){
                        responseObj.message= "Could not update the task.";
                }else if(ans.modifiedCount > 0){
                        responseObj.message= "The task was updated successfully.";

                }
            })
                .catch((err)=>{
                    res.status(500).send({
                    message: "Server error: failed to update task data",
                    err:err
                })
                })

            console.log("Attempting to get create node completion stats after update everything task...");
            await TaskManagerService.getAllNodeTasks(db,nodeID)
                .then((tasks)=>{
                    console.log("processing all tasks of node : " +req.body.title+"...");
                    let notStarted = 0;
                    let inProgress = 0;
                    let completed =  0;
                    for (let i = 0; i < tasks.length; i++) {

                        if(tasks[i].status ==="not started"){
                            notStarted++;
                        }
                        else if(tasks[i].status ==="in progress"){
                            inProgress++;
                        }
                        else if(tasks[i].status ==="complete"){
                            completed++;
                        }
                    }

                    let total  = completed+inProgress+notStarted;
                    if( notStarted !== 0 && inProgress === 0 ){
                        responseObj.nodeCompletionStatus = "not started";
                    }

                    else if(inProgress !== 0){
                        responseObj.nodeCompletionStatus = "in progress";
                    }

                    else if(notStarted === 0 && inProgress === 0 && completed === total ){
                        responseObj.nodeCompletionStatus = "complete";

                    }

                    console.log("Successfully generated node completion statistics");

                    responseObj.message ="The task was saved successfully." ;
                    //responseObj.nodeCompletionStatus =  threshold

                })
                .catch(err=>{

                    console.log("failed to get all tasks of node : " +req.body.title+"...");
                    responseObj.message  = "err getting tasks of a node" ;
                    responseObj.data =  err
                })
            res.send(
                responseObj
            )

    });



    //module.exports = router;
    return router
}
module.exports = makeTaskRoute





