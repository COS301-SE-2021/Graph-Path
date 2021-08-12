const express = require('express');
//swap out service
const projectManager = require('../../Services/ProjectService');
const Permissions = require('../../Helpers/Permissions');
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

                if (ans ==="No matched projects")
                {
                    res.send({
                        message: "unsuccessful. "+ans+" for user: "+mail,
                        data: null
                    })
                }

                else{

                    res.send({
                        message: "successful",
                        data: ans
                    })
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Server error. Could not retrieve projects.",
                    data: null

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
                    message: "Could not remove project."
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
router.patch('/updateProjectGraph/:name/:graph',(req, res, next)=>{
    let nme = req.params.name;
    let grph = req.params.graph;
    //let tst = req.body.graph;
    let grph2 = JSON.parse(grph);
    console.log("type of graph: "+ typeof grph);
   // console.log("req.body: "+tst);
    console.log("nme: "+nme);
    console.log("grph.nodes[0].id: "+grph2.nodes[0].id);
    console.log("grph.edges[0].id: "+grph2.edges[0].id);
    db.collection('Projects').updateOne({
        projectName:nme
    },{
        $set:{graph:grph2}
    },(err,result)=>{

        if(err){
            console.log("Could not update the project graph: "+err);
            res.send({
                message: "Failed",
                data: err
            });
        }else{
            console.log("The update of the project graph was a success: "+result);
            res.send({
                message: "success",
                data: result
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
                message: "success"
               // data: result['ops']
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
