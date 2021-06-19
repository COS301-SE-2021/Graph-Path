const express = require('express');
//swap out service
const projectManager = require('../../Services/ProjectService');
const mongoose = require('mongoose') ;
const router = express.Router();


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
        }) 

    }
    else{
        console.log('received request ',req.body,'servicing.....') ;
        var data = req.body ;
        const id = new mongoose.mongo.ObjectID() ;
        data["_id"] = id ;
        db.collection('Projects').insertOne(data) 
        .then((ans)=>{
            console.log('success',ans.ops) ;
            res.send({
                message:"saved",
                data: ans.ops
            }) ;
        },(ans)=>{
            console.log('rejected',ans) ; 
            res.send({
                message:"request has been denied please try again"
            }) ;
        }) 
        .catch(err=>{
            console.log('from db req',err)
        })
    }
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
    db.collection('Projects').find({}).toArray()
    .then((projects)=>{
        console.log('success',projects) ;
        if (projects.length>0){
            res.send({
                message:projects//.json()
            }) ;
        }
        else{
            res.send({
                message:"No Projects found"
            })
        }
    },(ans)=>{
        console.log('rejected',ans) ; 
        res.send({
            data:ans
        }) ;
    }) 
    .catch(err=>{
        console.log('from db req',err)
    })
   
})


module.exports = router;
