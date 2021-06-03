const express = require('express')
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const assert = require('assert');

var url = 'mongodb+srv://NoCap2021:NoCap2021@cluster0.n67tx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
//var url = 'mongodb+srv://Aliandro:Aliandro2000@cluster0.y5ggo.mongodb.net/Graph-Path?retryWrites=true&w=majority';
//var url = 'mongodb://localhost:27017/test';
router.get('/users',(req, res, next)=> {


    res.status(200).json({
            Name: "John",
            Surname: "Doe"
    })


});
router.get('/userlist',(req, res, next)=> {

    var arr =[];
    mongo.connect(url,(err,db)=>{
        var cursor = db.collection('Users').find();
        cursor.forEach((usr,err)=>{
            arr.push(usr);
        },()=>{
            db.close();
        });
    });

});

router.post('/insertUser',(req, res, next)=>{
    var user= {
        Name: "john",
        Surname: "doe",
        id: 1,
        email:"John@gmail.com"
    }
    mongo.connect(url,(err, db)=>{
        db.collection('Users').insertOne(user, (err,result)=>{
            console.log("We inserted the user into the database: " + user);
            db.close();
        });
    });

});



module.exports = router;