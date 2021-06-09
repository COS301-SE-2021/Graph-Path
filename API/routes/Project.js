const express = require('express');
const app = require('../../app');
const createNewProject = require('../../Services/CreateNewProject');
//const retriveProject = require('../../Services/RetrieveProjects');

const router = express.Router();
const mongo = require('mongodb').MongoClient;
const assert = require('assert');

var url = 'mongodb+srv://NoCap2021:NoCap2021@cluster0.n67tx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
//var url = 'mongodb+srv://Aliandro:Aliandro2000@cluster0.y5ggo.mongodb.net/Graph-Path?\n' +
    //'retryWrites=true&w=majority';



router.post('/newProject' , (req,res,next) =>{
    data  = req.body;
    Status = createNewProject(data);
    Status = 1;
    if(Status ==1)
    {
        res.status(200).json({

            statusCode : 1,
            message : "new project creation successful",


        })
    }

    else
    {
        res.status(200).json({

            statusCode : 0,
            message : "Projection creation failed",
            error : "",
            body: ""
        })

    }



})

router.get('/retrieveByName/:projectName' , (req,res,next) =>{

    console.log("get by ID");
    ProjectJsonObj = retriveProject.getProjectByName(req.params.projectName);
    console.log(ProjectJsonObj);
    found =1 ;
    if (found == 1)
    {
        res.status(200).json({

            statusCode : 1,
            message : ProjectJsonObj,
            error : "",
            body: ProjectJsonObj

        })
    }

    else
    {
        res.status(200).json({
            statusCode : 0,
            message : "retrival for "+req.params.projectId +"failed",
            error : "",
            body: ""
        })
    }

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
        Name: "graph-path",
        id: "00",
        startDate:"2021-02-23",
        endDate:"2022-02-24",
        owner:"5DT",
        members:{
            developer1 : "Person 1",
            developer2 : "Person 2",
            developer3 : "Person 3",
        }

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
