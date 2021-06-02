const express = require('express');
const app = require('../../app');
const createNewProject = require('../../Services/CreateNewProject');
//const retriveProject = require('../../Services/RetrieveProjects');

const router = express.Router();

router.post('/newProject' , (req,res,next) =>{
    data  = req.body;
    Status = createNewProject(data);
    Status = 1;
    if(Status ==1)
    {
        res.status(200).json({

            statusCode : 1,
            message : "new project creation successful",


        })
    }

    else
    {
        res.status(200).json({

            statusCode : 0,
            message : "Projection creation failed",
            error : "",
            body: ""
        })

    }



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
