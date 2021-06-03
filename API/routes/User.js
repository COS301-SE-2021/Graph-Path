const express = require('express')
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const assert = require('assert');

var url = 'mongodb+srv://NoCap2021:NoCap2021@cluster0.n67tx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
//var url = 'mongodb+srv://Aliandro:Aliandro2000@cluster0.y5ggo.mongodb.net/Graph-Path?retryWrites=true&w=majorityvar '
//url = 'mongodb://localhost:27017/test';

router.get('/userlist',(req, res, next)=> {

    body = req.body;
    res.status(200).json({
        body
    })

  /* var arr =[];
    mongo.connect(url,(err,db)=>{
        var cursor = db.collection('Users').find();
        cursor.forEach((usr,err)=>{
            arr.push(usr);
        },()=>{
            db.close();
        });
    });
  */
});

router.post('/insertUser',(req, res, next)=> {

    var body= req.body;
    console.log(body);
    res.status(200).json({
        body
       // message: "jekh"
    })
});
    //*******************************************************************
    //Step 1:  Take request Body :  body = req.body
    /*Step 2:  body should look like this body= { name:
                                            Surname:
                                            email
                                            password
                                            username
                                            type:
                                            Notification:
                                            */
    //step 3: res.status(200).json({body })

    // step 4: use postman to check if it returns the body as expected

    // from here i'll help you setup User into a mongoDB








module.exports = router;