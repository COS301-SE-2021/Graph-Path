const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const assert = require('assert');
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
    router.get('/getAllTasks',(req, res, next)=> {
        //console.log("TaskByProjectBody: "+req.body);
        // console.log("TaskByProjectBodyProject: "+req.body.project);
        let tsknr = req.body.tasknr;
        db.collection('Tasks').find().toArray()
            .then((result)=>{
                //console.log("This is result in all tasks: "+result);
                res.send(result); //returns an array of objects

            })
            .catch((err)=>{
                console.log("Could not retrieve task by number in the project: "+err);
            });

    });

    router.get('/getAllTasksByProject',(req, res, next)=> {

        //console.log("TasksByProjectBody: "+req.body);
        // console.log("TasksByProjectBodyProject: "+req.body.project);
        let proj = req.body.project;
        db.collection('Tasks').find({project:proj}).toArray()
            .then((result)=>{
                // console.log("This is result in all tasks by project: "+result);
                res.send(result); //returns an array of objects
            })
            .catch((err)=>{
                console.log("Could not retrieve tasks by project: "+err);
            });


    });

//POST ENDPOINTS////////////////////////////////////////////////////////////////////////////////////////////////////////
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
            });


    });

//DELETE ENDPOINTS//////////////////////////////////////////////////////////////////////////////////////////////////////
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

router.post('/insertTask',(req, res, next)=>{
    var task= {
        Description: "Finish the getters and setters."
    }
    mongo.connect(url,(err, db)=>{
        db.collection('Tasks').insertOne(task, (err,result)=>{
            console.log("We inserted the task into the database: " + task);
            db.close();
        });
    });
})


//PATCH ENDPOINTS///////////////////////////////////////////////////////////////////////////////////////////////////////
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
                console.log("Could not update the task description: "+err);
                res.send({
                    message: "Failed",
                    data: err
                });
            }else{
                //console.log("The update of the task description was a success: "+result);
                res.send({
                    message: "success",
                    data: result['ops']
                });
            }

        })
        //.catch((err)=>{
        //    console.log("Could not update the task description: "+err);
       // })
    });

    router.patch('/updateTaskStatus/:project/:tasknr/:status',(req,res,next)=>{

        let proj = req.params.project;
        let tsknr = req.params.tasknr;
        let newStat = req.params.status;
        db.collection('Tasks').updateOne({
            project:proj,
            tasknr:tsknr
        },{
            $set:{status:newStat}
        },(err,result)=>{

            if(err){
                console.log("Could not update the task status: "+err);
                res.send({
                    message: "Failed",
                    data: err
                });
            }else{
                //console.log("The update of the task status was a success: "+result);
                res.send({
                    message: "success",
                    data: result['ops']
                });
            }

        })
        //.catch((err)=>{
        //    console.log("Could not update the task description: "+err);
        // })
    });



    //module.exports = router;
    return router
}
module.exports = makeTaskRoute





