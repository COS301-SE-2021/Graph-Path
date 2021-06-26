const express = require('express');
//swap out service
const projectManager = require('../../Services/ProjectService');
const mongoose = require('mongoose') ;
const router = express.Router();
var db = require('../../Controllers/DBController').getDB();
console.log("-----test2-----")



function makeProjectRoute(db) {
//GET ENDPOINTS/////////////////////////////////////////////////////////////////////////////////////////////////////////
    router.get('/find', (req, res, next) => {

        console.log("-----test2-----")
        db.collection('Projects').findOne({})
            .then((ans) => {
                console.log('success', ans);
                res.send({
                    data: ans
                });
            }, (ans) => {
                console.log('rejected', ans);
                res.send({
                    data: ans
                });
            })
            .catch(err => {
                console.log('from db req', err)
            })

    });

    router.get('/list', (req, res, next) => {
        console.log('received request ', req.body, 'servicing.....');
        db.collection('Projects').find({}).toArray()
            .then((projects) => {
                console.log('success', projects);
                if (projects.length > 0) {
                    res.send({
                        message: projects//.json()
                    });
                } else {
                    res.send({
                        message: "No Projects found"
                    })
                }
            }, (ans) => {
                console.log('rejected', ans);
                res.send({
                    data: ans
                });
            })
            .catch(err => {
                console.log('from db req', err)
            })

    })


    router.get('/getAllProjectsByUserEmail/:email', (req, res, next) => {
        console.log('received request ', req.body, 'servicing.....');
        let usr=req.params.email;
        db.collection('Projects').find({
            "groupMembers":usr
        }).toArray()
            .then((projects) => {
                console.log('success', projects);
                if (projects.length > 0) {
                    res.send({
                        message: projects//.json()
                    });
                } else {
                    res.send({
                        message: "No Projects found"
                    })
                }
            }, (ans) => {
                console.log('rejected', ans);
                res.send({
                    data: ans
                });
            })
            .catch(err => {
                console.log('from db req', err)
                res.send({
                    message: "error",
                    data: err
                });
            })

    })

//POST ENDPOINTS////////////////////////////////////////////////////////////////////////////////////////////////////////
    router.post('/newProject',  (req, res, next) => {
        if (req == undefined || req.body == undefined) {
            res.json({
                message: "Req is null"
            });
        }
        if (req.body.projectName == undefined) {
            console.log('no project name')
            res.send({
                message: "Please specify a Project Name"
            })

        } else {
            console.log('received request ', req.body, 'servicing.....');
            var data = req.body;
            const id = new mongoose.mongo.ObjectID();
            data["_id"] = id;
             db.collection('Projects').insertOne(data)
                .then((ans) => {
                    console.log('success', ans.ops);
                    res.send({
                        message: "saved",
                        data: ans['ops']
                    });
                }, (ans) => {
                    console.log('rejected', ans);
                    res.send({
                        message: "request has been denied please try again"
                    });
                })
                .catch(err => {
                    console.log('from db req', err)
                })
        }
    });

//DELETE ENDPOINTS//////////////////////////////////////////////////////////////////////////////////////////////////////


//PATCH ENDPOINTS///////////////////////////////////////////////////////////////////////////////////////////////////////
router.patch('/updateProjectGraph/:name/:graph',(req, res, next)=>{
    let nme = req.params.name;
    let grph = req.params.graph;
    db.collection('Projects').updateOne({
        name:nme
    },{
        $set:{graph:grph}
    },(err,result)=>{

        if(err){
            console.log("Could not update the project graph: "+err);
            res.send({
                message: "Failed",
                data: err
            });
        }else{
            //console.log("The update of the task description was a success: "+result);
            res.send({
                message: "success",
                data: result['ops']
            });
        }

    })
    //.catch((err)=>{
    //    console.log("Could not update the task description: "+err);
    // })
});

router.patch('/addToProjectGroupMembers/:name/:email',(req, res, next)=>{
    let nme = req.params.name;
    let eml = req.params.email;
    db.collection('Projects').updateOne({
        projectName:nme
    },{

            $push: {
                groupMembers: eml
            }

    },(err,result)=>{

        if(err){
            console.log("Could not update the project graph: "+err);
            res.send({
                message:"found",
                data:projects//.json()
            }) ;
        }
        else{
            res.send({
                message: "success",
                data: result['ops']
            });
        }

    })
    //.catch((err)=>{
    //    console.log("Could not update the task description: "+err);
    // })
});




 return router;
}



module.exports = makeProjectRoute;
