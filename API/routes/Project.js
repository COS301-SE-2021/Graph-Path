const express = require('express');
const app = require('../../app');
const createNewProject = require('../../Services/CreateNewProject');
const retriveProject = require('../../Services/RetrieveProjects');

const router = express.Router();

router.post('/newProject' , (req,res,next) =>{
    data  = req.body
    status = createNewProject(data);
    if(status ==1)
    {
        res.status(200).json({

            statusCode : 1,
            message : "new project creation successful",
            error : "",
            body: ""

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
