const express = require('express')
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const assert = require('assert');

var url = 'mongodb+srv://NoCap2021:NoCap2021@cluster0.n67tx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
//var url = 'mongodb+srv://Aliandro:Aliandro2000@cluster0.y5ggo.mongodb.net/Graph-Path?retryWrites=true&w=majority';
//var url = 'mongodb://localhost:27017/test';
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
    var task= {
        Description: "Finish the getters and setters."
    }
    mongo.connect(url,(err, db)=>{
        db.collection('Tasks').insertOne(task, (err,result)=>{
            console.log("We inserted the task into the database: " + Task);
            db.close();
        });
    });

});



module.exports = router;