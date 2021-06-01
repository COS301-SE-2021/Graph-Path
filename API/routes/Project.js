const express = require('express')
const router = express.Router();
const mongo = require('mongodb');
const assert = require('assert');

var url = 'mongodb+srv://NoCap2021:NoCap2021@cluster0.n67tx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

router.get('/:projectName' , (req,res,next) =>{

    const projectName = req.params.projectName;
    res.status(200).json({

        Name: projectName,
        id: "000",
        startDate: "2021-01-01",
        dueDate:"2021-05-05",
        Members:{
            developer1 : "Person 1",
            developer2 : "Person 2",
            developer3 : "Person 3",
        },
        Owner: "Bob Vans",
        Graph:" some object" ,
    })

})

router.get('/:projectId' , (req,res,next) =>{

    res.status(200).json({

        Name: "Demo project",
        id: "000",
        startDate: "2021-01-01",
        dueDate:"2021-05-05",
        Members:{
            developer1 : "Person 1",
            developer2 : "Person 2",
            developer3 : "Person 3",
        },
        Owner: "Bob Vans",
        Graph:" some object" ,
    })

})

router.get('/users',(req, res, next)=> {
    res.status(200).json({
        "Name": "John",
        "surname": "",

    })
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
