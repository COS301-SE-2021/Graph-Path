const express = require('express')
const router = express.Router();
const mongoose = require('mongoose') ;
const ObjectId = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');
const UserManagerService = require('../../Services/UserManagerService');


 function makeUserRoute (db)
{

//GET ENDPOINTS/////////////////////////////////////////////////////////////////////////////////////////////////////////


     router.get('/listOfAllUsers', (req, res, next) => {

         UserManagerService.getAllUsers(db)
         .then((ans)=>{
                 if(ans === "No users"){
                     res.send({
                         message:"No available users to retrieve."
                     })
                 }else{
                     res.send({
                         message:"Users retrieved successfully.",
                         data: ans
                     })
                 }
         }).catch(err=>{
                 res.status(500).send({
                    message: "Server error: Could not retrieve all users.",
                     err :err
                 });
         });

     })

     router.get('/listOfAllUsersExceptYourself/:email', (req, res, next) => {


         let mail= req.params.email;
         UserManagerService.getAllOtherUsers(db,mail)
             .then((ans)=>{
                 if(ans === "Users not found") {
                    res.send({
                        message:"Could not get the users."
                    })
                 }else if(ans === "No other users"){
                     res.send({
                         message:"There are no other users.",
                         data: []
                     })
                 }else{
                     res.send({
                         message:"List retrieved successfully.",
                         data: ans
                     })
                 }
             })
             .catch(err=>{
                 res.status(500).send({
                     message: "Server error: Could not retrieve the users.",
                     err: err
                 });
             });


     })

     router.get('/getUserByID/:id',(req,res,next)=>{

         const ID = req.params.id ;
         if(ID ==='' || ID === undefined)
         {
             res.status(400).send({
                 message:"invalid ID provided."
             })
         }

         UserManagerService.getUserByID(db,ID).then((ans)=>{

                 if(ans === "No user found"){
                     res.send({
                         message: "User not found"
                     })
                 }else if(ans != null){
                     res.send({
                         message: "User found",
                         data: ans
                     })
                 }

         }).catch((err)=>{

             res.status(500).send({
                 message:"Server error: Could not find the user. Make sure the ID is correct and valid.",
                 err:err
             }) ;
         });



     }) ;

//POST ENDPOINTS////////////////////////////////////////////////////////////////////////////////////////////////////////

     router.post('/login/',async (req,res,next)=>{

         const emailParam = req.body.email;
         const GivenPassword = req.body.password;

         if(emailParam ==='' || emailParam === undefined)
         {
             res.status(400).send({
                 message:"invalid email provided.",
                 data:null
             })
         }

         let returnedUser = null;
         await UserManagerService.getUserByEmail(db,emailParam).then((ans)=>{
             if(ans != null){
                 returnedUser = ans;

             }else{

                 res.send({
                     message:`no user found ` ,
                     data:ans
                 }) ;
             }

         }).catch(err=>{
             res.status(500).send({
                 message:"User not found"
             }) ;
         });
         if ( returnedUser === "user not found")
         {
             res.send({
                 message:"unsuccessful. user not found",
                 data: []
             })
         }

         else
         {

             const MatchedPassword = returnedUser.password;
             console.log(returnedUser)
             const isPasswordValid  = await bcrypt.compare(GivenPassword,MatchedPassword);
             if(isPasswordValid)
             {
                 returnedUser.password= null;
                 res.send({
                     message:"successful",
                     data: returnedUser,
                 })
             }

             else
             {
                 res.send({
                     message: "invalid password given",
                     data: null
                 })
             }


         }
         console.log("returned User is null");


     }) ;

     router.post('/newUser',(req,res)=>{
         if (req === undefined || req.body === undefined || req === null ){
             res.json({
                 message:"There is no user to insert."
             }) ;
         }else{

             let data = req.body ;
             const id = new mongoose.mongo.ObjectID() ;
             data["_id"] = id ;
             UserManagerService.insertUser(db,data)
                 .then((ans)=>{

                     console.log(ans)
                    if(ans === "user already exists"){
                        res.send({
                            message:" Unsuccessful . The user already exists",
                           data: []
                        });

                    }


                    else{
                        res.send({
                            message:"The user was created successfully.",
                            data:ans.ops
                        })
                    }
                 })
                 .catch(err=>{
                     res.status(500).send({
                         message: "Could not create the new user.",
                         data:err
                     })
                 })
         }
     }) ;



//DELETE ENDPOINTS//////////////////////////////////////////////////////////////////////////////////////////////////////
    router.delete('/deleteUserByID/:id',(req,res, next)=>{
       let id = req.params.id;
        //let id = req.body.id;
        UserManagerService.removeUserByID(db,id)
            .then((ans)=>{
               if(ans != null){
                   res.send({
                       message: "The user was removed."
                   })
               } else{
                   res.send({
                       message: "Could not remove user."
                   })
               }
            })
            .catch(err=>{
                res.status(500).send({
                    message: "Could not remove user."
                })
            });
    });

     router.delete('/deleteUserByEmail/:email',(req,res, next)=>{
         let mail = req.params.email;
         //let id = req.body.id;
         UserManagerService.removeUserByEmail(db,mail)
             .then((ans)=>{
                 if(ans != null){
                     res.send({
                         message: "The user was removed."
                     })
                 } else{
                     res.send({
                         message: "Could not remove user."
                     })
                 }
             })
             .catch(err=>{
                 res.status(500).send({
                     message: "Could not remove user."
                 })
             });
     });

//PATCH ENDPOINTS///////////////////////////////////////////////////////////////////////////////////////////////////////
     router.patch('/updateUserUsername/:email/:username',(req, res, next)=>{
         let mail = req.params.email;
         let usrnme = req.params.username;

        UserManagerService.updateUserUsername(db ,mail, usrnme)
            .then((ans)=>{
                if(ans != null){
                    res.send({
                        message:"The Username was updated."
                    })
                }else{
                    res.send({
                        message: "The username was not updated."
                    })
                }
            })
         .catch((err)=>{
             res.status(500).send({
                 message: "The username was not updated."
             })
          })
     });

     router.patch('/updateUserPassword/:email/:password',(req, res, next)=>{
         let mail = req.params.email;
         let psw = req.params.password;

         UserManagerService.updateUserPassword(db,mail, psw)
             .then((ans)=>{
                 if(ans != null){
                     res.send({
                         message:"The Password was updated."
                     })
                 }else{
                     res.send({
                         message: "The Password was not updated."
                     })
                 }
             })
             .catch((err)=>{
                 res.status(500).send({
                     message: "The Password was not updated."
                 })
             })
     });

     router.patch('/updateUserUsernameAndPassword/:email/:username/:password',(req, res, next)=>{
         let mail = req.params.email;
         let usrnme = req.params.username;
         let psw = req.params.password;

         UserManagerService.updateUsernameAndPassword(db,mail,usrnme, psw)
             .then((ans)=>{
                 if(ans != null){
                     res.send({
                         message:"The Password and username was updated."
                     })
                 }else{
                     res.send({
                         message: "The Password and username was not updated."
                     })
                 }
             })
             .catch((err)=>{
                 res.status(500).send({
                     message: "Nothing was updated."
                 })
             })

     });



     //module.exports = router;
    return router;
}

module.exports = makeUserRoute;



