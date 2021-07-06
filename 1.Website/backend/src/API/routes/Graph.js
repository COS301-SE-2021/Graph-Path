const express = require('express')
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const mongoose = require('mongoose') ;
const assert = require('assert');

function makeGraphRoute(db) {
//GET ENDPOINTS/////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/getGraphByProject',(req,res,next)=>{
    if(req.body.project == undefined || req.body.project == null){
        res.send({
            message: "error",
            data: req.body.project
        });
    }

    let proj = req.body.project;
    db.collection('Graphs').findOne({
        project: proj
    })
        .then((err,result)=>{
            if(err){
                res.send({
                    message: "error",
                    data: err
                });
            }else{
                res.send({
                    message: "success",
                    data: result.ops
                });
            }
        })
        .catch(err=>{
           console.log("Failed to retrieve the Graph by project: "+err);
           res.send({
               message: "error",
               data: err
           });
        });
});

//POST ENDPOINTS/////////////////////////////////////////////////////////////////////////////////////////////////////////
    router.post('/newGraph',(req, res, next)=>{
        let data = req.body;
        const id = new mongoose.mongo.ObjectID() ;
        data["_id"] = id ;

        db.collection('Graphs').insertOne(data)
            .then((result)=>{
                res.send({
                    message:"saved",
                    data: result['ops']
                }) ;
            })
            .catch(err=>{
                console.log("Could not insert graph: "+err);
                res.send({
                    message: "error",
                    data: err
                });
            });


    });

//DELETE ENDPOINTS/////////////////////////////////////////////////////////////////////////////////////////////////////////
    router.delete('/deleteGraphByProject',(req, res, next)=>{
        if(req.body.project == undefined || req.body.project == null){
            res.send({
                message: "error",
                data: req.body.project
            });
        }
        let proj = req.body.project ;
        db.collection('Graphs').deleteOne({
            project: proj
        })
            .then((data)=>{
                res.send({
                    message:"Deleted",
                    data: data.ops
                });
            })
            .catch(err=>{
                console.log("Could not delete graph: "+err);
                res.send({
                    message: "error",
                    data: err
                });
            });

    });

//PATCH ENDPOINTS/////////////////////////////////////////////////////////////////////////////////////////////////////////




    return router;
}
module.exports = makeGraphRoute;