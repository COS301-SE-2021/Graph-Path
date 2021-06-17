const express = require('express')
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const mongoose = require('mongoose') ;
const assert = require('assert');
var db = require('../../Controllers/DBController').getDB();
//const ManageNode = require('../../Services/ManageNode')

router.post('/createNode',(req,res,next)=>{
  /*  if(  ManageNode.create(req.body) == 0){
        res.status(200).json({

            status: true,
            message: "The node was inserted successfully."

        })
    }else{
        res.status(200).json({

            status: false,
            message: "The node was not inserted successfully."

        })
    }

   */

    try{
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
          /* .catch(err=>{
               console.log('from db req',err)
           })

           */

    }catch(err){
        console.log("Could not create node: "+err);
    }

})

router.delete('/deleteNode',(req,res,next)=>{
    try{
        db.collection('Node').deleteOne({
            _id:req.body.id
        })
            .then((data)=>{
                res.send({
                    message:"Deleted",
                    data: data
                });
            })
            .catch(err=>{
                console.log("Could not delete node: "+err);
            })
    }catch (err){
        console.log("Could not delete node: "+err);
    }
})



router.get('/getNodeByProjectTasknr',(req,res,next)=>{

    try{
       /* db.collection('Node').findOne({
            task:{
                project:req.body.project,
                tasknr:req.body.tasknr
            }
        })
            .then((data)=>{
                console.log("The task was used to retrieve the node: "+data);
                res.send(data);
            })
            .catch(err=>{
                console.log("Could not retrieve node by task project and nr: "+err);
            });

        */
    }catch(err){
        console.log("Could not retrieve node: "+err);
    }
})


module.exports = router;