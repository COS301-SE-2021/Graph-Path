const express = require('express')
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const mongoose = require('mongoose') ;
const assert = require('assert');
const { param,body, validationResult } = require('express-validator');
function makeGraphRoute(db) {
//GET ENDPOINTS/////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * @api {get}  /getGraphByProject'
     * @apiName  get a graph object
     * @apiDescription This endpoint retrieves a graph matching the passed in project ID
     * @apiGroup Graph
     * @apiParam  {String} [id] project ID
     * @apiSuccess (200) {object}  message : "The graph retrieved successfully"
     */
    router.get('/getGraphByProject',
    body('project').exists().notEmpty().isMongoId(),
    (req, res, next)=>{
        const failedValidation = validationResult(req);
        if(!failedValidation.isEmpty()){
            res.status(420).send({
                message: "Bad request , invalid parameters",
                data: failedValidation
            })
        }

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
    /**
     * @api {post}  /newGraph'
     * @apiName  create a graph object
     * @apiDescription This endpoint creates a graph object
     * @apiGroup Graph
     * @apiParam  {object} [nodes] '{id:"", color:"", label:"",x:"",y:""}'
     * @apiParam  {object} [edges] '{id:"", color:"", source:"",target:""}'
     * @apiSuccess (200) {object}  message : "The graph created successfully"
     */
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
    /**
     * @api {delete}  /deleteGraphByProject'
     * @apiName  delete a graph object
     * @apiDescription This endpoint deletes a graph matching the passed in project ID
     * @apiGroup Graph
     * @apiParam  {String} [id] project ID
     * @apiSuccess (200) {object}  message : "The graph deleted successfully"
     */
    router.delete('/deleteGraphByProject',
        body('project').exists().notEmpty().isMongoId(),
        (req, res, next)=>{
            const failedValidation = validationResult(req);
            if(!failedValidation.isEmpty()){
                res.status(420).send({
                    message: "Bad request , invalid parameters",
                    data: failedValidation
                })
            }
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