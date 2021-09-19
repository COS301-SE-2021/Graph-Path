const express = require('express')
const router = express.Router();
const mongoose = require('mongoose') ;
const ObjectId = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');
const UserManagerService = require('../../Services/UserManagerService');
const { body, validationResult, param,check} = require('express-validator');
const authentication = require('./Middleware/Authentication');
const {isIn} = require("validator");


 function makeUserRoute (db)
{

//GET ENDPOINTS/////////////////////////////////////////////////////////////////////////////////////////////////////////
     router.post('/requestToken',
         (req,res)=>{
             // Authentication User
             authentication.generateToken(req,res,db)
                 .then((token)=>{
                     res.setHeader("Authorization","Bearer "+token.toString())
                     res.send({
                         message3: "Token generated in response header",
                     }) ;
                 })
                 .catch(err=>{
                     res.send({
                         message: "token generation failed"
                     })
                 });


         })
     /**
      * @api {get}  /listOfAllUsers'
      * @apiName  get all users
      * @apiDescription This endpoint retrieves all user objects
      * @apiGroup User
      * @apiSuccess (200) {object}  message : "The users retrieved successfully"
      */
     router.get('/listOfAllUsers', (req, res, next) => {

         UserManagerService.getAllUsers(db)
         .then((ans)=>{
                 if(ans === "No users"){
                     res.send({
                         message:"No available users to retrieve."
                     })
                 }else{

                     let users = [];
                     ans.forEach((user)=>{

                         users.push({
                             value: user.email,
                             label: user.fullNames,
                             picture: user.picture
                         })


                     });
                     res.send({
                         message:"Users retrieved successfully.",
                         data: users
                     })
                 }
         }).catch(err=>{
                 res.status(500).send({
                    message: "Server error: Could not retrieve all users.",
                     err :err
                 });
         });

     })

     /**
      * @api {get}  /listOfAllUsersExceptYourself'
      * @apiName  get all other users
      * @apiDescription This endpoint gets all other users a user object
      * @apiGroup User
      * @apiParam  {String} [email] "email"
      * @apiSuccess (200) {object}  message : "The user created successfully"
      */
     router.get('/listOfAllUsersExceptYourself/:email',
         param('email').exists().notEmpty(),
         (req, res, next) => {
             const failedValidation = validationResult(req);
             if(!failedValidation.isEmpty()){
                 res.status(420).send({
                     message: "Bad request , invalid parameters",
                     data: failedValidation
                 })
             }

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
                     ans.forEach((user)=>{
                         user.password = null;
                     });
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

     /**
      * @api {get}  /getUserByID'
      * @apiName  retrieve user object
      * @apiDescription This endpoint retrieves a user object based on ID
      * @apiGroup User
      * @apiParam  {String} [id] user ID
      * @apiSuccess (200) {object}  message : "The user retrieved successfully"
      */
     router.get('/getUserByID/:id',
         param('id').exists().notEmpty().isMongoId(),
         (req,res,next)=>{
             const failedValidation = validationResult(req);
             if(!failedValidation.isEmpty()){
                 res.status(420).send({
                     message: "Bad request , invalid parameters",
                     data: failedValidation
                 })
             }
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
     /**
      * @api {post}  /login'
      * @apiName  login a user
      * @apiDescription This endpoint logs in a user object
      * @apiGroup User
      * @apiParam  {String} [email] "email"
      * @apiParam  {String} [password] ''
      * @apiSuccess (200) {object}  message : "The user logged in successfully"
      */
     router.post('/login/',
         body('email').exists().notEmpty(),
         body('password').exists().notEmpty(),
         async (req,res,next)=>{
            // check if user is validated by auth0
             //genereate token for user
             const failedValidation = validationResult(req);
             if(!failedValidation.isEmpty()){
                 res.status(420).send({
                     message: "Bad request , invalid parameters",
                     data: failedValidation
                 })
             }
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



     /**
      * @api {post}  /newUser'
      * @apiName  create new user object
      * @apiDescription This endpoint creates a user object
      * @apiGroup User
      * @apiParam  {String} [id] user ID
      * @apiParam  {String} [firstName] "firstName"
      * @apiParam  {String} [lastName] "lastName"
      * @apiParam  {String} [username] "username"
      * @apiParam  {String} [email] "email"
      * @apiParam  {String} [notification] "Notification"
      * @apiParam  {String} [type] "type"
      * @apiParam  {String} [password] ''
      * @apiSuccess (200) {object}  message : "The user created successfully"
      */
     router.post('/newUser',
         body('notification').exists().notEmpty().isString(),
         body('email').exists().notEmpty(),
         body('firstName').exists().notEmpty().isString(),
         body('lastName').exists().notEmpty().isString(),
         body('userName').exists().notEmpty().isString(),
         body('password').exists().notEmpty(),
         body('type').exists().notEmpty().isString(),
         (req,res)=>{
             const failedValidation = validationResult(req);
             if(!failedValidation.isEmpty()){
                 res.status(420).send({
                     message: "Bad request , invalid parameters",
                     data: failedValidation
                 })
             }

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
     /**
      * @api {delete}  /deleteUserByID'
      * @apiName  removes an user object based on its id
      * @apiDescription This endpoint removes the user matching the passed in ID
      * @apiGroup User
      * @apiParam  {String} [id] user ID
      * @apiSuccess (200) {object}  message : "The user removed successfully"
      */
     router.delete('/deleteUserByID/:id',
        param('id').exists().notEmpty().isMongoId(),
        (req,res, next)=>{
            const failedValidation = validationResult(req);
            if(!failedValidation.isEmpty()){
                res.status(420).send({
                    message: "Bad request , invalid parameters",
                    data: failedValidation
                })
            }
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
               }else if(ans.deletedCount < 1 ||  ans==="User does not exist"){
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

     router.delete('/deleteUserByEmail/:email',
         param('email').exists().notEmpty(),
         (req,res, next)=>{
             const failedValidation = validationResult(req);
             if(!failedValidation.isEmpty()){
                 res.status(420).send({
                     message: "Bad request , invalid parameters",
                     data: failedValidation
                 })
             }

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
     /**
      * @api {patch}  /updateUserUsername'
      * @apiName  changes username of a user object
      * @apiDescription This endpoint updates username field of the user matching the passed in email
      * @apiGroup User
      * @apiParam  {String} [email] "email"
      * @apiParam  {String} [username] "username"
      * @apiSuccess (200) {object}  message : "The user updated successfully"
      */
     router.patch('/updateUserUsername/:email/:username',
         param('email').exists().notEmpty(),
         param('username').exists().notEmpty().isString(),
         (req, res, next)=>{
             const failedValidation = validationResult(req);
             if(!failedValidation.isEmpty()){
                 res.status(420).send({
                     message: "Bad request , invalid parameters",
                     data: failedValidation
                 })
             }

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

     /**
      * @api {patch}  /updateUserPassword'
      * @apiName  changes password of a user object
      * @apiDescription This endpoint updates the password field of the user matching the passed in email
      * @apiGroup User
      * @apiParam  {String} [email] "email"
      * @apiParam  {String} [password] ''
      * @apiSuccess (200) {object}  message : "The user updated successfully"
      */
     router.patch('/updateUserPassword/:email/:password',
         param('email').exists().notEmpty(),
         param('password').exists().notEmpty(),
         (req, res, next)=>{
             const failedValidation = validationResult(req);
             if(!failedValidation.isEmpty()){
                 res.status(420).send({
                     message: "Bad request , invalid parameters",
                     data: failedValidation
                 })
             }
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

     /**
      * @api {patch}  /updateUserUsernameAndPassword'
      * @apiName  changes username and password of a user object
      * @apiDescription This endpoint updates username and password fields of the user matching the passed in email
      * @apiGroup User
      * @apiParam  {String} [email] "email"
      * @apiParam  {String} [username] "username"
      * @apiParam  {String} [password] ''
      * @apiSuccess (200) {object}  message : "The user updated successfully"
      */
     router.patch('/updateUserUsernameAndPassword/:email/:username/:password',
         param('email').exists().notEmpty(),
         param('username').exists().notEmpty().isString(),
         param('password').exists().notEmpty(),
         (req, res, next)=>{
             const failedValidation = validationResult(req);
             if(!failedValidation.isEmpty()){
                 res.status(420).send({
                     message: "Bad request , invalid parameters",
                     data: failedValidation
                 })
             }
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

     /**
      * @api {put}  /updateEverythingUser'
      * @apiName  update all details of a user object
      * @apiDescription This endpoint updates all fields of the user matching the passed in ID
      * @apiGroup User
      * @apiParam  {String} [id] user ID
      * @apiParam  {String} [firstName] "firstName"
      * @apiParam  {String} [lastName] "lastName"
      * @apiParam  {String} [username] "username"
      * @apiParam  {String} [email] "email"
      * @apiParam  {String} [notification] "Notification"
      * @apiParam  {String} [type] "type"
      * @apiParam  {String} [password] ''
      * @apiSuccess (200) {object}  message : "The user updated successfully"
      */
     router.put('/updateEverythingUser/:id',
         authentication.authenticateToken,
         param('id').exists().notEmpty().isMongoId(),
         body('firstName').exists().notEmpty().isString(),
         body('lastName').exists().notEmpty().isString(),
         body('username').exists().notEmpty().isString(),
         body('email').exists().notEmpty(),
         body('notification').exists().notEmpty().isString(),
         body('type').exists().notEmpty().isString(),
         body('password').exists().notEmpty(),
         (req, res)=>{
             const failedValidation = validationResult(req);
             if(!failedValidation.isEmpty()){
                 res.status(420).send({
                     message: "Bad request , invalid parameters",
                     data: failedValidation
                 })
             }
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
    }else if(ID === undefined || ID ===""){
        res.send({
            message:"The ID provided is not valid."
        })
    }else if(firstName === undefined || firstName ===""){
        res.send({
            message:"The firstname provided is not valid."
        })
    }else if(lastName === undefined || lastName ===""){
        res.send({
            message:"The lastname provided is not valid."
        })
    }else if(userName === undefined || userName ===""){
        res.send({
            message:"The username provided is not valid."
        })
    }else if(Notif === undefined || Notif ===""){
        res.send({
            message:"The notification provided is not valid."
        })
    }else if(type === undefined || type ===""){
        res.send({
            message:"The type provided is not valid."
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
                 }else if(ans ==="email already in use"){
                     res.send({
                         message: "The email address is already in use."
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



