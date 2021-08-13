const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;
//var db = require('../../Controllers/DBController').getDB();
//var url = 'mongodb+srv://NoCap2021:NoCap2021@cluster0.n67tx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

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

        db.getAllTasks()
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
        db.getAllTasksByProject(ID)
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

        db.getTaskByID(ID)
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

        db.collection('Tasks').insertOne(data)
            .then((result)=>{
                res.send({
                    message:"saved",
                    data: result['ops']
                }) ;
            })
            .catch(err=>{
                console.log("Could not create task: "+err);
                res.status(500).send({
                    message:"could not create task",
                    body:null
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
    router.delete('/deleteTaskByTasknr',(req, res, next)=>{
        let del = req.body.tasknr ;
        //console.log("This is tasknr inside delete task by tasknr: "+del);
        db.collection('Tasks').deleteOne({
            tasknr:del
        })
            .then((data)=>{
                res.send({
                    message:"Deleted",
                    data: data['ops']
                });
            })
            .catch(err=>{
                console.log("Could not delete task: "+err);
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
    router.patch('/updateTaskDescription/:project/:tasknr/:description',(req,res,next)=>{


        let proj = req.params.project;
        let tsknr = req.params.tasknr;
        let newDesc = req.params.description;
        db.collection('Tasks').updateOne({
            project:proj,
            tasknr:tsknr
        },{
            $set:{description:newDesc}
        },(err,result)=>{

            if(err){

                res.status(500).send({
                    message: "Failed.Could not update the task description",
                    data: err
                });
            }
            else{

                const {matchedCount,modifiedCount} = result;
                if(matchedCount === 0)
                {
                    res.status(400).send({
                        message: "Failed. No matched task with given parameters",
                        data:null
                    })

                }
                else
                {

                    res.send({
                        message: "success",
                        data: null
                    });
                }


            }

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
    router.patch('/updateTaskStatus/:project/:tasknr/:status',(req,res,next)=>{

        let proj = req.params.project;
        let tsknr = req.params.tasknr;
        let newStat = req.params.status;

        const AcceptedStatuses = ['In-progress','complete','not yet started','on hold']
        for( var i = 0 ; i < AcceptedStatuses.length ; i++)
        {

            if(i === (AcceptedStatuses.length -1 ) && newStat !== AcceptedStatuses[i])
            {
                res.status(400).send({
                    message: "Failed. The provided status  '\ "+newStat+" '\ is not part of the currently accepted status: 'In-progress','complete','not yet started','on hold'",
                    data: null
                })
                return;

            }

        }

        db.collection('Tasks').updateOne({
            project:proj,
            tasknr:tsknr
        },{
            $set:{status:newStat}
        },(err,result)=>{

            if(err){
                console.log("Could not update the task status: "+err);
                res.status(500).send({
                    message: "Failed.Could not update the task description",
                    data: err
                });
            }
            else{

                const {matchedCount,modifiedCount} = result;
                if(matchedCount === 0)
                {
                    res.status(400).send({
                        message: "Failed. No matched task with given parameters",
                        data:null
                    })

                }
                else
                {

                    res.send({
                        message: "success",
                        data: null
                    });
                }


            }

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
    router.patch('/updateTaskDueDate/:project/:tasknr/:dueDate',(req,res,next)=>{

        let proj = req.params.project;
        let tsknr = req.params.tasknr;
        let newdate = req.params.dueDate;
        db.collection('Tasks').updateOne({
            project:proj,
            tasknr:tsknr
        },{
            $set:{due:newdate}
        },(err,result)=>{

            if(err){

                res.status(500).send({
                    message: "Failed.Could not update the task date due to server error.",
                    data: err
                });
            }
            else{

                const {matchedCount,modifiedCount} = result;
                if(matchedCount === 0)
                {
                    res.status(400).send({
                        message: "Failed. No matched task with given parameters",
                        data:null
                    })

                }
                else
                {

                    res.send({
                        message: "success",
                        data: null
                    });
                }


            }

        })

    });


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
    router.patch('/updateTaskAssignee/:project/:tasknr/:Assignee',(req,res,next)=>{

        let proj = req.params.project;
        let tsknr = req.params.tasknr;
        let newAssignee = req.params.Assignee;
        db.collection('Tasks').updateOne({
            project:proj,
            tasknr:tsknr
        },{
            $set:{assignee:newAssignee}
        },(err,result)=>{

            if(err){

                res.status(500).send({
                    message: "Failed.Could not update the task assignee",
                    data: err
                });
            }
            else{

                const {matchedCount,modifiedCount} = result;
                if(matchedCount === 0)
                {
                    res.status(400).send({
                        message: "Failed. No matched task with given parameters",
                        data:null
                    })

                }
                else
                {

                    res.send({
                        message: "success",
                        data: null
                    });
                }


            }

        })

    });


    //module.exports = router;
    return router
}
module.exports = makeTaskRoute





