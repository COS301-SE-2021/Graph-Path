const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const assert = require('assert');
var db = require('../../Controllers/DBController').getDB();

//var url = 'mongodb+srv://NoCap2021:NoCap2021@cluster0.n67tx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

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

router.get('/getAllTasks',(req, res, next)=> {

    //console.log("TaskByProjectBody: "+req.body);
    // console.log("TaskByProjectBodyProject: "+req.body.project);
    let tsknr = req.body.tasknr;
    db.collection('Tasks').find().toArray()
        .then((result)=>{
            console.log("This is result in all tasks: "+result);
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


module.exports = router;