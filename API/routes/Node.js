const express = require('express')
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const mongoose = require('mongoose') ;
const assert = require('assert');
var db = require('../../Controllers/DBController').getDB();
//const ManageNode = require('../../Services/ManageNode')

//GET ENDPOINTS/////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/getNodeByProjectTasknr',(req,res,next)=>{
    let proj=req.body.task.project;
    let tsknr = req.body.task.tasknr;
    //console.log("This is proj: "+proj);
    //console.log("This is tsknr: "+tsknr);
         db.collection('Node').findOne({

                 "task.project":proj,
                 "task.tasknr":tsknr

         })
             .then((data)=>{
                // console.log("The task was used to retrieve the node: "+data);
                 res.send(data);
             })
             .catch(err=>{
                 console.log("Could not retrieve node by task project and nr: "+err);
             });

})

//POST ENDPOINTS////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/createNode',(req,res,next)=>{

        let data = req.body;
        const id = new mongoose.mongo.ObjectID() ;
        data["_id"] = id ;
        db.collection('Node').insertOne(data)
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
         });





})

//DELETE ENDPOINTS//////////////////////////////////////////////////////////////////////////////////////////////////////
router.delete('/deleteNodeByProjectTasknr',(req,res,next)=>{

    let proj = req.body.project;
    let tsknr = req.body.tasknr;

        //console.log("This is proj inside the delete node: "+proj);
       // console.log("This is tsknr inside the delete node: "+tsknr);
        db.collection('Node').deleteOne({
            "task.project":proj,
            "task.tasknr":tsknr
        })
            .then((data)=>{
                res.send({
                    message:"Deleted",
                    data: data
                });
            })
            .catch(err=>{
                console.log("Could not delete node: "+err);
            });


})

//PATCH ENDPOINTS///////////////////////////////////////////////////////////////////////////////////////////////////////
router.patch('/updateNodeTaskDescription',(req,res,next)=>{
 let proj = req.body.project;
 let tsknr = req.body.tasknr;
 let newDesc = req.body.description;
     db.collection('Node').updateOne({
         "task.project":proj,
         "task.tasknr":tsknr
     },{
        $set:{"task.description":newDesc}
     },(err,result)=>{

            if(err){
                console.log("Could not update the task description in this node: "+err);
                res.send({
                    message: "Failed",
                    data: result,
                     data2: result.ops
                });
            }else{
                console.log("The update of the task description in the node was a success: "+result);
                res.send({
                   message: "success",
                   data: result,
                    data2: result.ops
                });
            }

     })
     .catch((err)=>{
         console.log("Could not update the task description in the node: "+err);
     })
});

module.exports = router;
