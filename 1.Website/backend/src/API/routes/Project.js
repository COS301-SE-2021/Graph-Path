const express = require('express');
//swap out service
const projectManager = require('../../Services/ProjectService');
const mongoose = require('mongoose') ;
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;
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

        db.getAllProjects()
            .then((ans) => {
               res.send({
                   message: "The retrieval of the projects was successful.",
                   data: ans
               })
                })
            .catch(err => {
                res.status(500).send({
                    message: "Could not retrieve the projects."
                })
            })

    })


    router.get('/getAllProjectsByUserEmail/:email', (req, res, next) => {
        // console.log('received request ', req.params, 'servicing.....');
        let mail=req.params.email;
        db.getAllProjectsByUserEmail(mail)
            .then(ans=>{
                if(ans == null || ans === 0){
                    console.log(ans);
                    res.send({
                        message: "Could not retrieve the projects"
                    })
                }else{
                    res.send({
                        message: "The list was retrieved successfully.",
                        data: ans
                    })
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "could not retrieve projects.",

                });
            })

    })

    router.get('/getProjectByID/:id',(req,res,next)=>{

        let ID = req.params.id ;
        if(ID ==='' || ID === undefined)
        {
            res.status(400).send({
                message:"Invalid ID provided."
            })
        }
        db.getProjectByID(ID)
            .then(ans=>{
                if(ans != null){
                    res.send({
                        message: "Project retrieved.",
                        data: ans
                    })
                }else{
                    res.send({
                        message: "Could not retrieve project."
                    })
                }

            })
            .catch(err=>{
                res.status(500).send({
                    message: "Could not retrieve the project"
                })
            })
    }) ;


//POST ENDPOINTS////////////////////////////////////////////////////////////////////////////////////////////////////////
    router.post('/newProject',  (req, res, next) => {
        if (req === undefined || req.body === undefined) {
            res.json({
                message: "There was no information provided."
            });
        }
        if (req.body.projectName === undefined) {
            console.log('no project name')
            res.send({
                message: "Please specify a Project Name"
            })


        } else {
            let data = req.body;
            const id = new mongoose.mongo.ObjectID();
            data["_id"] = id;
            db.insertProject(data)
                .then(ans=>{
                    res.send({
                        message:"The Project has been created.",
                        data: id
                    })
                })
                .catch(err=>{
                    res.status(500).send({
                        message: "The project was not created."
                    })
                })


        }
    });

//DELETE ENDPOINTS//////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 
 * /deleteProject/:
 *   delete:
 *     summary: Deletes the project owner is deleting using the name
 *     tags: [Books]
 *     parameters:
 *       projectName: The name of the project 
 *       owner: The email address of the owner of project
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *      400:
 *          description:The body is not complete.
 */

router.delete('/deleteProject/:id',(req,res)=>{
    let ID = req.params.id;

        // console.log(projectName,owner); 
        db.removeProjectByID(ID)
        .then(ans =>{
            if(ans === null){
                res.send({
                    message: "Couldn't remove project."
                });
            }else{
                res.send({
                    message: "Project was removed successfully."
                });
            }

        })
        .catch(err=>{
            res.status(500).send({
                message:"Could not remove project."
            })
        })
})

//PATCH ENDPOINTS///////////////////////////////////////////////////////////////////////////////////////////////////////
router.patch('/updateProjectGraph/:id/:graph',(req, res, next)=>{
    let ID = req.params.id;
    let grph = req.params.graph;
    let grph2 = JSON.parse(grph);
    //console.log("type of graph: "+ typeof grph);
   // console.log("grph.nodes[0].id: "+grph2.nodes[0].id);
    //console.log("grph.edges[0].id: "+grph2.edges[0].id);
    db.updateProjectGraph(ID,grph2 )
    .then(ans=>{
            if(ans.modifiedCount === 0){
                res.send({
                    message: "Could not update the graph."
                })
            }else{
                res.send({
                    message: "The graph was updated."
                })
            }
        })
    .catch((err)=>{
       res.status(500).send({
           message: "Could not update the project graph."
       })
     })
});

router.patch('/addToProjectGroupMembers/:id/:email',(req, res, next)=>{
    let ID = req.params.id;
    let mail = req.params.email;
    db.collection('Projects').updateOne({
        "_id": ObjectId(ID)
    },{

            $push: {
                groupMembers: mail
            }

    },(err,ans)=>{

        if(err){
            console.log("Could not update the project graph: "+err);
            res.send({
                message:"found",
                data:ans//.json()
            }) ;
        }
        else{
            res.send({
                message: "success"

            });
        }

    })
    //.catch((err)=>{
    //    console.log("Could not update the task description: "+err);
    // })
});

router.put('/updateProjectGraph',(req,res)=>{
    const project = req.body.projectName ;
    const graph = req.body.graph ;

    console.log('PUT ../',project,'body: ',graph) ; 
    if (graph === undefined || graph.nodes === undefined){
        return res.status(400).send({
            message:"Invalid Graph structure"
        })
    }

    db.collection('Projects').updateOne({
        projectName:project
    },
    {
        $set:{graph:graph}
    },(err,ans)=>{
        if (err){
            console.log('error',err)
            return res.status(500).send({
                message:err
            }) ; 
        }
        console.log(ans.result.nModified + " document(s) updated");
        if (ans.result.nModified > 0){
            res.status(201).send({
                message:"Update Successful",
                data:graph
            })
        }
        else{
            res.send({
                message:`Project ${project}, not found`
            }) ;
        }
    }) ; 
})




 return router;
}



module.exports = makeProjectRoute;
