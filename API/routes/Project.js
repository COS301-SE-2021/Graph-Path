const express = require('express')
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const assert = require('assert');

var url = 'mongodb+srv://NoCap2021:NoCap2021@cluster0.n67tx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
//var url = 'mongodb+srv://Aliandro:Aliandro2000@cluster0.y5ggo.mongodb.net/Graph-Path?\n' +
    //'retryWrites=true&w=majority';



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

router.post('/insertProject',(req, res, next)=>{
    var project ={

    }
    mongo.connect(url,(err, db)=>{
        db.collection('Projects').insertOne(project, (err,result)=>{
            console.log("We inserted the project into the database: " + project);
            db.close();
        });
    });
});

router.get('/projectlist',(req, res, next)=> {

    var arr =[];
    mongo.connect(url,(err,db)=>{
        var cursor = db.collection('Projects').find();
        cursor.forEach((proj,err)=>{
            arr.push(proj);
        },()=>{
            db.close();
        });
    });

});

module.exports = router;
