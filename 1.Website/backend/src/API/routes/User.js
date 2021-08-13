const express = require('express')
const router = express.Router();
const ManageUser = require('../../Services/ManageUser')
const mongoose = require('mongoose') ;
var ObjectId = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');


 function makeUserRoute (db)
{
//GET ENDPOINTS/////////////////////////////////////////////////////////////////////////////////////////////////////////
     router.get('/login/:email',async (req,res,next)=>{

         const emailParam = req.params.email;

         if(emailParam ==='' || emailParam === undefined)
         {
             res.status(400).send({
                 message:"invalid email provided.",
                 data:null
             })
         }



         let returnedUser = null;
        await db.getUserByEmail(emailParam).then((ans)=>{
            if(ans != null){


                returnedUser = ans;

                /*res.send({
                    message:`user found ` ,
                    data:ans
                }) ;*/
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
        if ( returnedUser !=null)
        {
            const GivenPassword = req.body.password;
            const MatchedPassword = returnedUser.password;
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

     router.get('/listOfAllUsers', (req, res, next) => {
         //console.log('received request ', req.body, 'servicing.....');
         db.getAllUsers()
         .then((ans)=>{
                 if(ans != null){
                     res.send({
                         message:"All users retrieved",
                         data:ans
                     })
                 }else{
                     res.send({
                         message:"Could not retrieve the users.",
                         data: ans
                     })
                 }
         }).catch(err=>{
                 res.status(500).send({
                    message: "Could not retrieve all users."
                 });
         });

     })

     router.get('/listOfAllUsersExceptYourself/:email', (req, res, next) => {

         let mail= req.params.email;
         db.getAllOtherUsers(mail)
             .then((ans)=>{
                 if(ans != null) {
                    res.send({
                        message:"List of users retrieved.",
                        data: ans
                    })
                 }else{
                     res.send({
                         message:"List of users not retrieved.",
                         data: ans
                     })
                 }
             })
             .catch(err=>{
                 res.status(500).send({
                     message: "Could not retrieve all users."
                 });
             });


     })

     router.get('/getUserByID/:id',(req,res,next)=>{

         const ID = req.params.id ;
         console.log(ID);
         //let ID = req.body.id;
         if(ID ==='' || ID === undefined)
         {
             res.status(400).send({
                 message:"invalid ID provided."
             })
         }

         db.getUserByID(ID).then((ans)=>{
             if(ans != null){
                 res.send({
                     message: "User found",
                     data: ans
                 })
             }else{
                 console.log(ans);
                 res.send({
                    message: "User not found",
                     data: ans
                 })
             }
         }).catch((err)=>{
             res.status(500).send({
                 message:"User not found"
             }) ;
         });

     }) ;

//POST ENDPOINTS////////////////////////////////////////////////////////////////////////////////////////////////////////
     router.post('/newUser',(req,res)=>{
         if (req == undefined || req.body == undefined || req == null ){
             res.json({
                 message:"There is no user to insert."
             }) ;
         }else{
             //console.log('received request ',req.body,'servicing.....') ;

             let data = req.body ;
             const id = new mongoose.mongo.ObjectID() ;
             data["_id"] = id ;
             db.insertUser(data)
                 .then((ans)=>{
                    if(ans != null){
                        res.send({
                            message:"The user was created successfully.",
                            data:ans
                        });

                    }else{
                        res.send({
                            message:"The user was not created successfully."
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
        db.removeUserByID(id)
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
         db.removeUserByEmail(mail)
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

        db.updateUserUsername(mail, usrnme)
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

         db.updateUserPassword(mail, psw)
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

         db.updateUsernameAndPassword(mail,usrnme, psw)
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



