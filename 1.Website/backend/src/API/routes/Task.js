const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;
const TaskManagerService = require('../../Services/TaskManagerService');
const { body, validationResult, param,check} = require('express-validator');
const {isIn} = require("validator");

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the task
 *
 *         status:
 *           type: string
 *           description: This is the current state of the task expected states are not started, in progress, completed
 *
 *         description:
 *           type: string
 *           description: this is description of the task.
 *         project:
 *           type: string
 *           description: This is the name of the project, no two projects can have the same name.
 *         tasknr:
 *           type: int
 *           description: This is a task number to indicate the # of task.
 *         asignee:
 *           type: List[string]
 *           description: These are email addresses of the members that have been assigned to a project
 *         assigner:
 *           type: string
 *           description: The name of the person that iniaited and created the project
 *         due:
 *           type: date
 *           description: The date of when the project should be completed
 *         issued:
 *           type: date
 *           description: The date of when the project was created
 *       example:
 *         description: Help Mark with his work.
 *         status: in-progress
 *         project: Graph-Path
 *         tasknr: 1
 *         assignee: Joe
 *         assigner: Alistair
 *         due: 20/05/2021
 *         issued: 20/05/2019
 *
 */



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
    router.get('/getAllTasks',(req, res)=> {

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

        // insert Task validation
        body('description').exists(),
        body('status').exists().isIn(['not started' ,'in progress', 'complete' , 'back-log']),
        body('project').exists(),
        body('assignee').exists(),
        body('assigner').exists(),
        body('due').isDate(),
        body('issued').isDate(),
        (req, res)=>{

            // check if any of the above validations failed
            const validationFails = validationResult(req);
            if(!validationFails.isEmpty()){
                res.status(400).send({
                    message: "unsuccessful",
                    data : validationFails
                })
            }
            let data = req.body;
            const id = new mongoose.mongo.ObjectID() ;
            data["_id"] = id ;

        TaskManagerService.insertTask(db,data)
            .then((ans)=>{
                if(ans ==="Task object empty"){
                    res.send({
                        message: "Not enough task information provided."
                    })
                }else if(ans.insertedCount > 0){
                    res.send({
                        message:"The task was saved successfully.",
                        data:ans.ops
                    }) ;
                }else{
                    res.send({
                        message: "The task was not created."
                    })
                }

            })
            .catch(err=>{
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


//PATCH ENDPOINTS///////////////////////////////////////////////////////////////////////////////////////////////////////


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

    router.patch('/updateTaskAssigner/:id/:assigner',

        (req,res,next)=>{


        let ID = req.params.id;
        let assigner =req.params.assigner;
        if(assigner === undefined || assigner ===""){
            res.send({
                message: "The assigner name provided is not valid."
            })
        }


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

    router.put('/updateEverythingTask/:id',
        // validation
        param('id').exists(),
        body('assignee').exists().isJSON(),
        body('assigner').exists().isJSON(),
        body('description').exists().isString(),
        body('issued').isDate(),
        body('due').isDate().isAfter('issued'),
        body('nodeID').exists(),
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

        let ID = req.params.id;
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





