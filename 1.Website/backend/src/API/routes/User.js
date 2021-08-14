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
                 message:"Server error: User not found",
                 err:err
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
         //console.log("returned User is null");


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
                    if(ans === "user already exists"){
                        res.send({
                            message:" Unsuccessful . The user already exists"
                        });

                    }else{
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
        UserManagerService.removeUserByID(db,id)
            .then((ans)=>{
               if(ans == null){
                   res.send({
                       message: "Could not remove user."
                   })
               } else if(ans.deletedCount >0){
                   res.send({
                       message: "The user was removed."
                   })
               }else if(ans.deletedCount < 1){
                   res.send({
                       message: "User does not exist."
                   })
               }
            })
            .catch(err=>{
                res.status(500).send({
                    message: "Server error: Could not remove user.",
                    err:err
                })
            });
    });

     router.delete('/deleteUserByEmail/:email',(req,res, next)=>{

         let mail = req.params.email;
         if(mail ==="" || mail === undefined){
             res.send({
                 message: "Invalid email provided."
             })
         }
         UserManagerService.removeUserByEmail(db,mail)
             .then((ans)=>{
                 if(ans == null){
                     res.send({
                         message: "Could not remove user."
                     })
                 } else if(ans.deletedCount >0){
                     res.send({
                         message: "The user was removed."
                     })
                 }else if(ans.deletedCount < 1){
                     res.send({
                         message: "User does not exist."
                     })
                 }
             })
             .catch(err=>{
                 res.status(500).send({
                     message: "Server error:Could not remove user.",
                     err: err
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


     router.put('/updateEverythingUser/:id',(req, res, next)=>{
         let ID = req.params.id;
         let mail = req.body.email;
         let lastName = req.body.lastName;
         let Notif = req.body.Notification;
         let psw = req.body.password;
         let type = req.body.type;
         let firstName = req.body.firstName;
         let userName = req.body.username;
    if(mail === undefined || mail ===""){
        res.send({
            message:"The email provided is not valid."
        })
    }else if(psw === undefined || psw ===""){
        res.send({
            message:"The password provided is not valid."
        })
    }

         UserManagerService.updateEverythingUser(db,ID, mail,lastName, Notif, psw, type, firstName, userName)
             .then((ans)=>{
                 if(ans == null){
                     res.send({
                         message:"The user was not updated."
                     })
                 }else if(ans.modifiedCount < 1){
                     res.send({
                         message: "The user does not exist."
                     })
                 }else if(ans.modifiedCount > 0){
                     res.send({
                         message: "The user was updated successfully."
                     })
                 }
             })
             .catch((err)=>{
                 res.status(500).send({
                     message: "Server error: Nothing was updated, make sure the provided ID is correct and valid.",
                     err:err
                 })
             })

     });



     //module.exports = router;
    return router;
}

module.exports = makeUserRoute;



