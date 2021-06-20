const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const assert = require('assert');
//var db = require('../../Controllers/DBController').getDB();
//var url = 'mongodb+srv://NoCap2021:NoCap2021@cluster0.n67tx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

function  makeTaskRoute(db)
{
    //GET ENDPOINTS/////////////////////////////////////////////////////////////////////////////////////////////////////////
    router.get('/getTaskByDescription',(req, res, next)=> {
        let desc = req.body.description;
        db.collection('Tasks').findOne({
            description:desc
        })
            .then((result)=>{
                //console.log("This is result.description in Tasks by project: "+result.description);
                res.send(result);
            })
            .catch((err)=>{
                console.log("Could not retrieve task by description in the project: "+err);
            });




    });

    router.get('/getTaskByTasknr',(req, res, next)=> {

        //console.log("TaskByProjectBody: "+req.body);
        // console.log("TaskByProjectBodyProject: "+req.body.project);
        let tsknr = req.body.tasknr;
        db.collection('Tasks').findOne({
            tasknr:tsknr
        })
            .then((result)=>{
                //console.log("This is result.tasknr in Tasks by project: "+result.tasknr);
                res.send(result);
            })
            .catch((err)=>{
                console.log("Could not retrieve task by number in the project: "+err);
            });
        /*  mongo.connect(url,(err,db)=>{
              var cursor = db.collection('Tasks').find();
              cursor.forEach((tsk,err)=>{
                  arr.push(tsk);
              },()=>{
                  db.close();
              });
          });

         */

    });

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
        /*  mongo.connect(url,(err,db)=>{
              var cursor = db.collection('Tasks').find();
              cursor.forEach((tsk,err)=>{
                  arr.push(tsk);
              },()=>{
                  db.close();
              });
          });

         */

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
                    data: result
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
                    data: data
                });
            })
            .catch(err=>{
                console.log("Could not delete task: "+err);
            });

    });

    //module.exports = router;
    return router
}

module.exports = makeTaskRoute





