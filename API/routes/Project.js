const express = require('express');
// const createNewProject = require('../../Services/CreateNewProject');
//swap out service
const projectManager = require('../../Services/ProjectService');
const mongoose = require('mongoose') ;
const router = express.Router();
var db = require('../../Controllers/DBController').getDB() ;
// var url = 'mongodb+srv://<p>:NoCap2021@cluster0.n67tx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
//var url = 'mongodb+srv://<p>:Aliandro2000@cluster0.y5ggo.mongodb.net/Graph-Path?\n' +
    //'retryWrites=true&w=majority';

router.post('/newProject' ,  (req,res,next) =>{
    if (req == undefined || req.body == undefined ){
        res.json({
            message:"Req is null" 
        }) ;
    }
    if (req.body.projectName == undefined){
        console.log('no projec name')
        res.send({
            message:"Please specify a Project Name"
        }) ;

    }
    console.log('received request ',req.body,'servicing.....') ;
    var data = req.body ;
    const id = new mongoose.mongo.ObjectID() ;
    data["_id"] = id ;
    db.collection('Projects').insertOne(data) 
    .then((ans)=>{
        console.log('success',ans) ;
        res.send(ans.ops) ;
    },(ans)=>{
        console.log('rejected',ans) ; 
        res.send({
            data:ans
        }) ;
    }) 
    .catch(err=>{
        console.log('from db req',err)
    })
}) ; 

router.get('/find',(req,res,next)=>{
    
    db.collection('Projects').findOne({})
    .then((ans)=>{
        console.log('success',ans) ;
        res.send({
            data:ans
        }) ;
    },(ans)=>{
        console.log('rejected',ans) ; 
        res.send({
            data:ans
        }) ;
    }) 
    .catch(err=>{
        console.log('from db req',err)
    })
}) ;

router.get('/list',(req,res,next)=>{
    console.log('received request ',req.body,'servicing.....') ;
    const projects = db.collection('Projects').find({})
    console.log('success',ans) ;
    if (projects){
        res.send({
            message:projects//.json()
        }) ;
    }
    else{
        res.send({
            message:"Error"
        })
    }
})

router.post('/createnewProject' ,  (req,res,next) =>{
    // try{

        
        data  = req.body;

        // let response = await projectManager.createProject(data);
        // Status = 1;
        projectManager.createProject(data)
        .then(response=>{
            console.log('res from await',response)
            if(response ==1)
            {
                res.status(200).json({

                    statusCode : 1,
                    message : "new project creation successful",
                    code:response
                })
            }
            else if (response == -1 ){ //untouched -> we wait for it give it?
                console.log('dead/loacking',response)
            }
            else{
                console.log('error 400')
                res.status(500).json({
                    message:"request can't be fulfilled"
                });
            }
        },(response)=>{
            if (response == 0){
                res.status(501).json({
                    message:"An Error happened when saving.",
                    code:response
                }) ; 
            }
        })
        .catch(errr=>{
            console.log('error from create',errr)
        })
    // }
    
        // .catch(err=>{
        //     console.log('cacth ',err)
        //     res.status(400).json({

        //         statusCode : 0,
        //         message : "Projection creation failed",
        //         error : "",
        //         body: ""
        //     })

        // })
    // }
    // catch(err){
    //     console.log(err) ;
    //     return next(err)
    // }


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
