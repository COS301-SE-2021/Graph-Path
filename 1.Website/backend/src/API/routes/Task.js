const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;
const TaskManagerService = require('../../Services/TaskManagerService');

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

/**@swagger
 * tags:
 *   name: Task
 *   description: This is the task managing API
 */

function  makeTaskRoute(db)
{
    //GET ENDPOINTS/////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     *@swagger
     * /task/getTaskByDescription:
     *   get:
     *     summary: Returns information about a task given its description as parameter
     *     tags: [Task]
     *     responses:
     *       200:
     *         description: Json body of the task
     *         contents:
     *           application/json
     *         schema:
     *           type: array
     *           items:
     *             $ref: '#components/schemas/Task'
     *       404:
     *         description: the given description does not match any task
     *         contents:
     *           application/json
     *
     *
     *
     */
    router.get('/getTaskByDescription',(req, res, next)=> {
        let desc = req.body.description;
        let responseObj = {
            message:"",
            body:null
        }

        db.collection('Tasks').findOne({
            description:desc
        })
            .then((result)=>{
                if (result != null)
                {
                    console.log("get task by description successful")
                    responseObj.message="successful";
                    responseObj.body = result;
                    res.send(responseObj);
                }

                else
                {
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
     *@swagger
     * /task/getTaskByTasknr:
     *   get:
     *     summary: Returns information about a task given its unique number as parameter
     *     tags: [Task]
     *     responses:
     *       200:
     *         description: Json body of the task
     *         contents:
     *           application/json
     *         schema:
     *           type: array
     *           items:
     *             $ref: '#components/schemas/Task'
     *       404:
     *         description: the given task number does not match any task
     *         contents:
     *           application/json
     *
     *
     *
     */
    router.get('/getTaskByTasknr',(req, res, next)=> {

        let tsknr = req.body.tasknr;
        let responseObj = {
            message:"",
            body:null
        }
        db.collection('Tasks').findOne({
            tasknr:tsknr
        })
            .then((result)=>{

                //console.log("This is result in Tasks by project: "+result);
                if(result != null)
                {
                    responseObj.message = "successful";
                    responseObj.body = result;
                    res.send(responseObj)
                }

                else
                {
                    responseObj.message = "failed.No task exists with given number";
                    res.status(404).send(responseObj);
                }


            })
            .catch((err)=>{
                console.log("Could not retrieve task by number in the project: "+err);
                responseObj.message="failed. Error with DB:"+err;
                res.status(500).send(responseObj)
            });

    });

    /**
     *@swagger
     * /task/getAllTasks:
     *   get:
     *     summary: Returns all existings tasks
     *     tags: [Task]
     *     responses:
     *       200:
     *         description: A list of Json objects of tasks
     *         contents:
     *           application/json
     *         schema:
     *           type: array
     *           items:
     *             $ref: '#components/schemas/Task'
     *
     *
     *
     */
    router.get('/getAllTasks',(req, res, next)=> {

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
     *@swagger
     * /task/getAllTasksByProject:
     *   get:
     *     summary: Returns all tasks that belong to the given Project name as a parameter
     *     tags: [Task]
     *     responses:
     *       200:
     *         description: An array of Json objects each representing a task
     *         contents:
     *           application/json
     *         schema:
     *           type: array
     *           items:
     *             $ref: '#components/schemas/Task'
     *       404:
     *         description: the given route does not exist
     *         contents:
     *           application/json
     *
     *
     *
     */
    router.get('/getAllTasksByProject/:id',(req, res, next)=> {

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

    router.get('/getTaskByID/:id',(req,res,next)=>{

        const ID = req.params.id ;
        if(ID ==='' || ID === undefined)
        {
            res.status(400).send({
                message:"invalid ID provided."
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

//POST ENDPOINTS////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     *@swagger
     * /task/insertTask:
     *   post:
     *     summary: Insert a new Task
     *     tags: [Task]
     *     responses:
     *       200:
     *         description: Insert of new task successful
     *         contents:
     *           application/json
     *         schema:
     *           type: array
     *           items:
     *             $ref: '#components/schemas/Task'
     *       500:
     *         description: could not insert task
     *         contents:
     *           application/json
     *
     *
     *
     */
    router.post('/insertTask',(req, res, next)=>{
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

//DELETE ENDPOINTS//////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     *@swagger
     * /task/deleteTaskByTasknr:
     *   delete:
     *     summary: deletes a task that has the passed in unique number as parameter
     *     tags: [Task]
     *     responses:
     *       200:
     *         description: deletion of task successful
     *         contents:
     *           application/json
     *         schema:
     *           type: array
     *           items:
     *             $ref: '#components/schemas/Task'
     *       500:
     *         description: could not insert task
     *         contents:
     *           application/json
     *
     *
     *
     */
    router.delete('/deleteTaskByID/:id',(req, res, next)=>{
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
     *@swagger
     * /task/updateTaskDescription/:project/:tasknr/:description:
     *   patch:
     *     summary: Updates the description of the task that matches the given projectName , task number and description
     *     tags: [Task]
     *     responses:
     *       200:
     *         description: update of task description successful
     *         contents:
     *           application/json
     *         schema:
     *           type: array
     *           items:
     *             $ref: '#components/schemas/Task'
     *       400:
     *         description: The given parameters do not match any existing task
     *         contents:
     *           application/json
     *
     *
     *
     */
    router.patch('/updateTaskDescription/:id/:description',(req,res,next)=>{


        let id = req.params.id;
        let newDesc = req.params.description;
        if(newDesc === undefined || newDesc === ""){
            res.send({
                message:"The description can't be empty."
            })
        }
        TaskManagerService.updateTaskDescription(db,id, newDesc)
            .then(ans=>{
                if(ans.modifiedCount >0){
                    res.send({
                        message: "The task was updated successfully."
                    })
                }else{
                    res.send({
                        message: "The task could not be updated."
                    })
                }
            })
            .catch(err=>{
                res.status(500).send({
                    message: "server error: could not update task.",
                    err:err
                })
            })


    });

    /**
     *@swagger
     * /task/updateTaskStatus/:project/:tasknr/:status:
     *   patch:
     *     summary: Updates the status of the task that matches the given projectName , task number and description
     *     tags: [Task]
     *     responses:
     *       200:
     *         description: update of task status successful
     *         contents:
     *           application/json
     *         schema:
     *           type: array
     *           items:
     *             $ref: '#components/schemas/Task'
     *       500:
     *         description: could not update task status due to server error
     *         contents:
     *           application/json
     *       400:
     *         description: could not update task  status . Invalid task information was given
     *         contents:
     *           application/json
     *
     *
     *
     */
    router.patch('/updateTaskStatus/:id/:status',(req,res,next)=>{

        let ID = req.params.id;
        let newStat = req.params.status;
        let fine = false;
        const AcceptedStatuses = ['In-progress','complete','not yet started','on hold']
        for( let i = 0 ; i < AcceptedStatuses.length ; i++)
        {

            if(newStat === AcceptedStatuses[i])
            {
                 fine = true;

            }

        }
        if(fine === false){
            res.status(400).send({
                message: "Failed. The provided status  '\ "+newStat+" '\ is not part of the currently accepted statuses: 'In-progress','complete','not yet started','on hold'",
                data: null
            })
            return;
        }

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
     *@swagger
     * /task/updateTaskDueDate/:project/:tasknr/:dueDate:
     *   patch:
     *     summary: Updates the due date of the task that matches the given projectName , task number and new due date
     *     tags: [Task]
     *     responses:
     *       200:
     *         description: update of task due date successful
     *         contents:
     *           application/json
     *         schema:
     *           type: array
     *           items:
     *             $ref: '#components/schemas/Task'
     *       400:
     *         description: The given parameters do not match any existing task
     *         contents:
     *           application/json
     *       500:
     *         description: The task update failed due to a server error as listed in the response body
     *         contents:
     *           application/json
     *
     *
     *
     */
    /*
    router.patch('/updateTaskDueDate/:id/:dueDate/:startDate',(req,res,next)=>{

        let ID = req.params.id;
        let newDate = req.params.dueDate;
        let beginDate =req.params.startDate;
        if(newDate === undefined || newDate ===""){
            res.send({
                message: "The Due date provided is not valid."
            })
        }else if(beginDate === undefined || beginDate ===""){
            res.send({
                message: "The start date provided is not valid."
            })

        }else if(beginDate > dueDate){
            res.send({
                message: "The due date can not be before the start date."
            })
        }


        db.updateTaskDueDate(ID, newDate)
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

     */


    /**
     *@swagger
     * /task/updateTaskAssignee/:project/:tasknr/:Assignee:
     *   patch:
     *     summary: Updates the assignee of the task that matches the given projectName , task number and new due date
     *     tags: [Task]
     *     responses:
     *       200:
     *         description: update of task assignee successful
     *         contents:
     *           application/json
     *         schema:
     *           type: array
     *           items:
     *             $ref: '#components/schemas/Task'
     *       400:
     *         description: The given parameters do not match any existing task
     *         contents:
     *           application/json
     *       500:
     *         description: The task update failed due to a server error as listed in the response body
     *         contents:
     *           application/json
     *
     *
     *
     */
    router.patch('/updateTaskAssignee/:id/:assignee',(req,res,next)=>{

        let ID = req.params.id;
        let assignee =req.params.assignee;
        if(assignee === undefined || assignee ===""){
            res.send({
                message: "The assignee name provided is not valid."
            })
        }


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

    router.patch('/updateTaskAssigner/:id/:assigner',(req,res,next)=>{

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

    router.put('/updateEverythingTask/:id',(req, res, next)=>{
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
        if(description === undefined || description ===""){
            res.send({
                message:"The description provided is not valid."
            })
        }else if(nodeID === undefined || nodeID ===""){
            res.send({
                message:"The node ID provided is not valid."
            })
        }else if(ID ===undefined || ID ==="") {
            res.send({
                message: "The Task ID provided is not valid."
            })
        }else  if(project  ===undefined || project ===""){
            res.send({
                message: "The project ID provided is not valid."
            })
        }else if(status ===undefined || status ===""){
            res.send({
                message:"The Task status cant be empty."
            })
        }else if(  !((status === "complete")||(status === "In-progress")||(status === "not yet started")||(status === "on hold"))  ){
            res.send({
                message:"The Task status can only be one of: completed, In-progress, not yet started, on hold"
            })
        }

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





