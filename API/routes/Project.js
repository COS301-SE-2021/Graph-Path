const express = require('express');
const app = require('../../app');
const createNewProject = require('../../Services/CreateNewProject');
const retriveProject = require('../../Services/RetrieveProjects');

const router = express.Router();

router.get('/:projectName' , (req,res,next) =>{

    const projectName = req.params.projectName;
    res.status(200).json({

        Name: projectName,
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
