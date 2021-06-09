const express = require('express');
const { response } = require('../../app');
const app = require('../../app');
// const createNewProject = require('../../Services/CreateNewProject');
//swap out service
const projectManager = require('../../Services/ProjectService');
//const retriveProject = require('../../Services/RetrieveProjects');

const router = express.Router();

router.post('/newProject' ,  (req,res,next) =>{
    console.log('received request ',req,'servicing.....') ;
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

module.exports = router
