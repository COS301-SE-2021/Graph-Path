const express = require('express')
const router = express.Router();
const ManageUser = require('../../Services/ManageUser')
const mongoose = require('mongoose') ;
var db = require('../../Controllers/DBController').getDB();

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
    if (req == undefined || req.body == undefined || req === null ){
        res.json({
            message:"Req is null" 
        }) ;
    }else{
        console.log('received request ',req.body,'servicing.....') ;
        var data = req.body ;
        const id = new mongoose.mongo.ObjectID() ;
        data["_id"] = id ;
        db.collection('Users').insertOne(data) 
        .then((ans)=>{
            console.log('success',ans.ops) ;
            res.send({
                message:"saved",
                data: ans.ops
            }) ;
        },(ans)=>{
            console.log('rejected',ans) ; 
            res.send({
                message:"request has been denied please try again"
            }) ;
        }) 
        .catch(err=>{
            console.log('from db req',err)
        })
    }
}) ;

router.get('/login/:email',(req,res,next)=>{
    const emailParam = req.params.email ;
    db.collection('Users').findOne({
        email:emailParam
    }) 
    .then((ans)=>{
        if (ans === null){
            console.log(`GET ${emailParam} fail`,ans) ;
            
            res.send({
                message:"User not found"
            }) ;
        }
        else{
            console.log(`GET ${emailParam} success`,ans) ;
            res.send({
                message:`found ` , 
                data:ans
            }) ;    
        }
        
    },(ans)=>{
        console.log('GET rejected',ans) ; 
        res.send({
            message:"request rejected", 
            data:ans
        }) ;
    }) 
    .catch(err=>{
        console.log('from db req',err)
    })
}) ;


router.post('/oldnewUser',(req,res)=>{
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