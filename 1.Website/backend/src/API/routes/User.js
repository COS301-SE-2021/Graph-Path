const express = require('express')
const router = express.Router();
const ManageUser = require('../../Services/ManageUser')

router.get('/userList',(req, res, next)=> {

    const back = ManageUser.getAllUsers(req.body);
    res.send(back);
});

router.get('/userEmail',(req, res, next)=>{
    const back = ManageUser.getUserByEmail(req.body);
    res.send(back);
})

router.post('/insertUser',(req, res, next)=> {

    const body= req.body;
    if( ManageUser.insertNewUser(body) == 0){
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