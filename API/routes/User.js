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


    //module.exports = router;
    return router;
}

module.exports = makeUserRoute;



