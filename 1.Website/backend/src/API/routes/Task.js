const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;
const TaskManagerService = require('../../Services/TaskManagerService');
const { body, validationResult, param,check} = require('express-validator');
const {isIn} = require("validator");
const authentication = require("./Middleware/Authentication");
const authorisation = require("./Middleware/Authorisation");


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
                        message:"There were no available tasks to retrieve."
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
        authentication.authenticateToken,
        authorisation.AuthoriseAddTask,
        body('description').exists().notEmpty().notEmpty().isString(),
        body('title').exists().notEmpty().notEmpty().isString(),
        body('status').exists().notEmpty().isIn(['not started' ,'in progress', 'complete' , 'back-log']),
        body('projectID').exists().notEmpty(),
        body('email').exists().notEmpty().isEmail(),
        body('taskMembers').exists().notEmpty(),
        body('assigner').exists().notEmpty(),
        body('due').exists().isDate(),
        body('issued').exists().isDate(),
        body('nodeID').exists().notEmpty().isString(),

        (req, res)=>{

            const validationFails = validationResult(req);
            if(!validationFails.isEmpty()){
                res.send({
                    message: "invalidation failed , check fields",
                    data : validationFails
                })
            }

            let TaskObject = {
                _id: new mongoose.mongo.ObjectID(),
                description:req.body.description,
                title:req.body.title,
                status:req.body.status,
                projectID:req.body.projectID,
                taskMembers:req.body.taskMembers,
                Assigner:req.body.assigner,
                due:req.body.due,
                issued:req.body.due,
                nodeID: req.body.projectID+"_"+req.body.nodeID
            }



            console.log("Attempting to insert a new task...")
            TaskManagerService.insertTask(db,TaskObject)
                .then((ans)=>{
                if(ans.insertedCount > 0){
                    console.log("Successfully added new task");
                    res.send({
                        message:"The task was saved successfully.",
                        data:ans.ops
                    }) ;
                }else{
                    console.log("failed to add new task");
                    res.send({
                        message: "The task was not created."
                    })
                }

            })
                .catch(err=>{
                console.log("failed to add new task due to server error...");
                res.status(500).send({
                    message:"Server error: could not create task.",
                    err:err
                })
            });


    });



    /**
     * @api {delete}  /task/deleteTaskByID/:id
     * @apiName  delete task by ID
     * @apiDescription This endpoint deletes a task matching the passed in ID
     * @apiGroup Task
     * @apiParam  {String} [id] task ID
     */
    router.delete('/deleteTaskByID/:id',
        param('id').isMongoId(),
        (req, res)=>{
            const failedValidation = validationResult(req);
            if(!failedValidation.isEmpty()){
            res.status(420).send({
                message: "Bad request , invalid parameters",
                data: failedValidation
            })
        }
            let ID = req.params.id ;
            TaskManagerService.deleteTaskByID(db,ID)
                .then((ans)=>{
                if(ans.deletedCount >0){
                    res.send({
                        message:"The task was successfully removed."
                    });
                }else{
                    res.send({
                        message:"The task could not be removed."
                    });
                }

            })
                .catch(err=>{
                res.status(500).send({
                    message:"Server error: could not remove the task.",
                    err:err
                })
            });
    })



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



    /**
     * @api {patch}  /updateTaskAssignee'
     * @apiName  update task Assignee
     * @apiDescription This endpoint updates the assignee of the task matching the passed in ID
     * @apiGroup Task
     * @apiParam  {String} [id] task ID
     * @apiParam  {object} [Assignee] '{email:"" , role:""}'
     * @apiSuccess (200) {object}  message : "The task updated successfully"
     */
    router.patch('/updateTaskAssignee',
        body('id').exists().notEmpty().isMongoId(),
        body('assignee').exists().notEmpty(),

        (req,res)=>{
            const failedValidation = validationResult(req);
            if(!failedValidation.isEmpty()){
                res.status(420).send({
                    message: "Bad request , invalid parameters",
                    data: failedValidation
                })
            }

            let ID = req.body.id;
            let assignee =req.body.assignee;

            TaskManagerService.updateTaskAssignee(db,ID, assignee)
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

        body('id').exists().notEmpty(),
        body('assignee').exists().notEmpty().isJSON(),
        body('assigner').exists().notEmpty().isJSON(),
        body('description').exists().notEmpty().isString(),
        body('issued').exists().notEmpty().isDate(),
        body('due').notEmpty().isDate(),
        body('nodeID').exists().notEmpty(),
        body('status').exists().isIn(['not started' , 'in progress' , 'complete']),
        body('project').exists().isMongoId(),
        (req, res)=>{

            const invalidFields = validationResult(req);
            if(!invalidFields.isEmpty()){
            res.status(420).send({
                message: "Bad Request. Validation failed",
                data: invalidFields
            })
        }

            let ID = req.body.id;
            let assignee = req.body.assignee;
            let assigner = req.body.assigner;
            let description = req.body.description;
            let issued = req.body.issued;
            let due = req.body.due;
            let nodeID = req.body.nodeID;
            let tasknr = req.body.tasknr;
            let status = req.body.status;
            let project = req.body.project;

            TaskManagerService.updateEverythingTask(db,ID, assignee, assigner, description, issued, due, nodeID, tasknr, status, project)
                .then((ans)=>{
                if(ans == null){
                    res.send({
                        message:"The task was not updated."
                    })
                }else if(ans.modifiedCount < 1){
                    res.send({
                        message: "Could not update the task."
                    })
                }else if(ans.modifiedCount > 0){
                    res.send({
                        message: "The task was updated successfully."
                    })
                }
            })
                .catch((err)=>{
                    res.status(500).send({
                    message: "Server error: Nothing was updated, make sure the provided ID is correct and valid.",
                    err:err
                })
                })

    });



    //module.exports = router;
    return router
}
module.exports = makeTaskRoute





