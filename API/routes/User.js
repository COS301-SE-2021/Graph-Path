const express = require('express')
const router = express.Router();
const userManagement = require('../../Services/ManageUser')

router.get('/userlist',(req, res, next)=> {

    body = req.body;
    res.status(200).json({
        body
    })
    //
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

module.exports = router;