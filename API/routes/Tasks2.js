const express = require('express')
//const taskManger = require('/Services/TaskManger')
const router = express.Router();
const { Validate } = require('/Helpers/Validate_NewTask')

router.post('/NewTask' , (req,res,next) =>{

    let MockTask = {
        CreationDate: Date.now() ,
        DueDate: Date.now()+1 ,
        TaskName: "Task 0 ",
        Description: "This is a test task",
        Label: "Green",
        Status: 'In progress',
        Assignee: ['User1' , 'User2'],
        Assigner: "Kagiso 1",
        Parent_Node : "SomeID of the parent Node",
    }

    if (req == undefined || req.body == undefined ){

        let Validator = new Validate();
        Validator.validateNewTask(JSON.stringify(MockTask))
        console.log("request to create new task recieved");
        res.json({
            message:"Req is null"
        }) ;
    }






})


module.exports = router;
