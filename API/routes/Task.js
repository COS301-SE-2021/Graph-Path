const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const assert = require('assert');
var db = require('../../Controllers/DBController').getDB();

//var url = 'mongodb+srv://NoCap2021:NoCap2021@cluster0.n67tx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

router.get('/tasks',(req, res, next)=> {


    res.status(200).json({
        Description: "Finish connecting to DB"

    })


});
router.get('/tasklist',(req, res, next)=> {

    var arr =[];
    mongo.connect(url,(err,db)=>{
        var cursor = db.collection('Tasks').find();
        cursor.forEach((tsk,err)=>{
            arr.push(tsk);
        },()=>{
            db.close();
        });
    });

});

router.post('/insertTask',(req, res, next)=>{
    console.log("Inside insert tasks");
    let data = req.body;
    const id = new mongoose.mongo.ObjectID() ;
    data["_id"] = id ;

        db.collection('Tasks').insertOne(data, (err,result)=>{
            console.log("We inserted the task into the database: " + data);

        })
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



module.exports = router;