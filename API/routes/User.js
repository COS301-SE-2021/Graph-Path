const express = require('express')
const router = express.Router();
const userManagement = require('../../Services/ManageUser')

router.get('/userlist',(req, res, next)=> {

   var body = req.body;
    res.status(200).json({
        body
    })
    if( userManagement.getAllUsers(body) ==0){
        res.status(200).json({

            status: true,
            message: "The users was retrieved successfully."

        })
    }else{
        res.status(200).json({

            status: false,
            message: "The users weren't retrieved successfully."

        })
    }
});

router.post('/insertUser',(req, res, next)=> {

    var body= req.body;
    if( userManagement.insertNewUser(body) == 0){
        res.status(200).json({

            status: true,
            message: "The user was inserted successfully."

        })
    }else{
        res.status(200).json({

            status: false,
            message: "The user was not inserted successfully."

        })
    }
    //Pass body into function :   boolean insertNewUser(body)
    //if (insertNewUSer == true){
    //send response (JSON object) ={status:0, message: "user was inserted"}
    //}else{
    //send response (JSON object) ={status:1, message: "error"}
    //}
});

router.post('/newUser',(req,res)=>{
    console.log(req.body) ;
    if (req.body && req.body.firstName){
        var data = req.body ; 
        var result = userManagement.create(data) ; 
        if (result > 0 ){
            res.json({
                message: 'User saved successfully. Please Log in'
            }) ;
        }
        else if (result == 0 ){
            res.json({
                message:"error in database"
            }) ; 
        }
        else if (result == -1){
            res.status(201).json({
                message:"Api did not save"
            })
        }
        else{
            res.status(201).json({
                message:"Unhandled Case"
            })
        }
    }
    else{
        res.status(400).json({
            message:"req not complete"
        }) ;
    }
})

module.exports = router;