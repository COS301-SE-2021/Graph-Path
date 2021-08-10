const express = require('express')
const router = express.Router();
const ManageUser = require('../../Services/ManageUser')
const mongoose = require('mongoose') ;
var db = require('../../Controllers/DBController').getDB();



 function makeUserRoute (db)
{
//GET ENDPOINTS/////////////////////////////////////////////////////////////////////////////////////////////////////////
     router.get('/login/:email',(req,res,next)=>{

         const emailParam = req.params.email ;
         if(emailParam =='' || emailParam == undefined)
         {
             res.status(400).send({
                 message:"invalid email given"
             })
         }


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

     router.get('/listOfAllUsers', (req, res, next) => {
         //console.log('received request ', req.body, 'servicing.....');
         db.collection('Users').find({}).toArray()
             .then((usrs) => {
                 console.log('success', usrs);
                 if (usrs.length > 0) {
                     res.send({
                         success: 1,
                         message: usrs//.json()
                     });
                 } else {
                     res.send({
                         success: 0,
                         message: "No Users found"
                     })
                 }
             }, (ans) => {
                 console.log('rejected', ans);
                 res.send({
                     data: ans
                 });
             })
             .catch(err => {
                 console.log('from db req', err)
             })

     })


     router.get('/listOfAllUsersExceptYourself/:email', (req, res, next) => {
         //console.log('received request ', req.body, 'servicing.....');
         let mail= req.params.email;
         db.collection('Users').find({}).toArray()
             .then((usrs) => {
                 //console.log('success', usrs);
                 if (usrs.length > 0) {
                     //remove current user first
                    let newarray = usrs.filter((val)=>{
                        //console.log("Val: ",val.email);
                        if(val.email !=mail) {
                            return true;
                        }
                         //return val!=mail;
                    });
                     //console.log("This is usrs: ",usrs);
                     //console.log("This is the user who made the request: "+mail)
                    //console.log("This is newarray: ",newarray);
                     //send response
                     res.send({
                         message: newarray//.json()
                     });
                 } else {
                     res.send({
                         message: "No Users found"
                     })
                 }
             }, (ans) => {
                 console.log('rejected', ans);
                 res.send({
                     data: ans
                 });
             })
             .catch(err => {
                 console.log('from db req', err)
             })

     })

//POST ENDPOINTS////////////////////////////////////////////////////////////////////////////////////////////////////////
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



//DELETE ENDPOINTS//////////////////////////////////////////////////////////////////////////////////////////////////////


//PATCH ENDPOINTS///////////////////////////////////////////////////////////////////////////////////////////////////////
     router.patch('/updateUserUsername/:email/:username',(req, res, next)=>{
         let mail = req.params.email;
         let usrnme = req.params.username;
        // console.log("User email: "+ mail);
        // console.log("New user username: "+usrnme);
         db.collection('Users').updateOne({
             email:mail
         },{
             $set:{username:usrnme}
         },(err,result)=>{

             if(err){
                 console.log("Could not update the user's username: "+err);
                 res.send({
                     message: "Failed",
                     data: err
                 });
             }else{
                 //console.log("The update of the user's username was a success: "+result);
                 res.send({
                     message: "success",
                     success: 1
                     //data: result
                 });
             }

         })
         //.catch((err)=>{
         //    console.log("Could not update the task description: "+err);
         // })
     });

     router.patch('/updateUserPassword/:email/:password',(req, res, next)=>{
         let mail = req.params.email;
         let psw = req.params.password;
         console.log("User email: "+ mail);
         console.log("New user password: "+psw);
         db.collection('Users').updateOne({
             email:mail
         },{
             $set:{password:psw}
         },(err,result)=>{

             if(err){
                 console.log("Could not update the user's password: "+err);
                 res.send({
                     message: "Failed",
                     data: err
                 });
             }else{
                 //console.log("The update of the user's password was a success: "+result);
                 res.send({
                     message: "success",
                     success: 1
                     //data: result
                 });
             }

         })
         //.catch((err)=>{
         //    console.log("Could not update the task description: "+err);
         // })
     });

     router.patch('/updateUserUsernameAndPassword/:email/:username/:password',(req, res, next)=>{
         let mail = req.params.email;
         let usrnme = req.params.username;
         let psw = req.params.password;
         console.log("User email: "+ mail);
         console.log("New user username: "+usrnme);
         console.log("New user password: "+psw);
         db.collection('Users').updateOne({
             email:mail
         },{
             $set:{
                 username:usrnme,
                 password:psw
             }

         },(err,result)=>{

             if(err){
                 console.log("Could not update the user's username and password: "+err);
                 res.send({
                     message: "Failed",
                     data: err
                 });
             }else{
                 //console.log("The update of the user's username and password was a success: "+result);
                 res.send({
                     message: "success",
                     success: 1
                    // data: result
                 });
             }

         })
         //.catch((err)=>{
         //    console.log("Could not update the task description: "+err);
         // })
     });



     //module.exports = router;
    return router;
}

module.exports = makeUserRoute;



