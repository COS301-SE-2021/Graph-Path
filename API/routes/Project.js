const express = require('express')
const router = express.Router();

router.get('/:projectName' , (req,res,nextTick) =>{

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
