const bcrypt = require("bcrypt");
const ObjectId = require('mongodb').ObjectID;
const ProjectManagerService = require('./ProjectManagerService');
const {nextObject} = require("mongodb/lib/operations/common_functions");
const {reject} = require("bcrypt/promises");
const mongoose = require("mongoose");

async function getAllUsers(dbController){

    const db = dbController.getConnectionInstance();
    return await new Promise((resolve, reject)=>{
        db.collection('Users').find({}).toArray()
            .then((ans)=>{
                if(ans == null){
                    resolve("No users");
                }else{
                    resolve(ans);
                }
            }).catch(err=>{
            reject(err);
        })
    })
}

async function getUserByID(dbController,id) {

    const db = dbController.getConnectionInstance();
    return await new Promise((resolve, reject) => {
        db.collection('Users').findOne({
            "_id": ObjectId(id)
        })
            .then((ans) => {
                if(ans == null){
                    resolve("No user found");
                }else{
                    resolve(ans);
                }

            })
            .catch(err => {

                reject(err);
            });


    })

}

async function getUserByEmail(dbController ,email){

    const db = dbController.getConnectionInstance();
    return await new Promise((resolve, reject)=>{
        db.collection('Users').findOne({
            "email": email
        }).then((ans)=>{
            if(ans == null)
            {
                resolve("user not found")
            }
            else
            {
                resolve(ans);
            }


        }).catch(err=>{

            reject("Server DB");
        });
    })

}

async function getAllOtherUsers(dbController,email){

    const db = dbController.getConnectionInstance();
    return await  new Promise((resolve, reject)=>{
        db.collection('Users').find({}).toArray()
            .then((ans)=>{
                if(ans == null || ans ===undefined){
                    resolve("Users not found");
                }else if (ans.length > 0) {
                    //remove current user first
                    let newArray = ans.filter((val)=>{
                        if(val.email !== email) {
                            return true;
                        }
                    });
                    //send response
                    resolve(newArray);
                } else if(ans.length < 1){

                    resolve("No other users");
                }

            })
            .catch(err=>{
                reject(err);
            });
    })
}

async function insertUser(dbController, userObject){
    console.log("Attempting to insert/update User...");
    const db = dbController.getConnectionInstance();
    const newUser ={
        //_id:  new mongoose.mongo.ObjectID(),
        email: userObject.email,
        fullNames:  userObject.name,//full names
        username: userObject.given_name,
        picture: userObject.picture,//link to an image
        Notifications: [],
        email_verified: userObject.email_verified

    };

    const query = { email:userObject.email };
    const update = { $set: newUser};
    const options = { upsert: true };
    try {
        const result = await db.collection('Users').updateOne(query, update, options);
        if(result.matchedCount>0){
            console.log("User already exists...no update occurred");
            return("success");
        }
        if(result.modifiedCount> 0){
            console.log("User "+newUser.email+" successfully updated/inserted");
            return("success");
        }

    }

    catch (err){
        // something went wrong
        console.log("Failed to update/insert user: ",err);
        return("failed");
    }


}


//***************************************************-delete-**************************************************************
async function removeUserByID(dbController, id){
    const db = dbController.getConnectionInstance();
    return await new Promise(async (resolve, reject) => {
        //remove from all projects
            //retrieve user email
            let mail = await getUserByID(dbController,id);
            if(mail === "No user found"){
                resolve("User does not exist");
            }
            let email = mail.email;
            //console.log("email: ",email);
            //get list of all projects involved in
        let ProjectList = await ProjectManagerService.getAllProjectsByUserEmail(dbController, email)
            .then(ans=>{
                //console.log("ProjectList: ",ans);

                if(ans !== "No matched projects"){
                    //delete user from each of those projects

                    for(let i=0; i<ans.length;i++){
                        ProjectManagerService.removeProjectMember(dbController, ans[i]._id, email)
                            .catch(err=>{
                                reject(err);
                            });
                    }

                }
                //remove user
                db.collection('Users').deleteOne({
                    "_id": ObjectId(id)
                })
                    .then((ans)=>{
                        resolve(ans);
                    })
                    .catch(err=>{
                        reject(err);
                    });

            })
            .catch(err=>{
                reject(err);
            });



    });
}

async function removeUserByEmail( dbController, mail){
    const db = dbController.getConnectionInstance();
    return await new Promise(async (resolve, reject) => {
        //remove from all projects

        //get list of all projects involved in
        let ProjectList = await ProjectManagerService.getAllProjectsByUserEmail(dbController, mail)
            .then(ans=>{
               // console.log("ProjectList: ",ans);
               // console.log(ans[0]._id);
                if(ans !== "No matched projects"){
                    //delete user from each of those projects

                    for(let i=0; i<ans.length;i++){
                        ProjectManagerService.removeProjectMember(dbController, ans[i]._id, mail)
                            .catch(err=>{
                                reject(err);
                            });
                    }

                }
                //remove user
                db.collection('Users').deleteOne({
                    email: mail
                })
                    .then((ans)=>{
                        resolve(ans);

                    })
                    .catch(err=>{
                        reject(err);
                    });

            })
            .catch(err=>{
                reject(err);
             });


    });
}
//***************************************************-patch-**************************************************************
async function updateUserUsername(dbController, mail, usrnme){
    const db = dbController.getConnectionInstance();
    return await  new Promise((resolve, reject) => {
        db.collection('Users').updateOne({
            email:mail
        },{
            $set:{username:usrnme}

        })
            .then(ans=>{
                resolve(ans);
            })
            .catch(err=>{
                reject(err);
            });
    })
}

async function updateUserPassword(dbController,mail,psw){

    const db = dbController.getConnectionInstance();
    const salt = await bcrypt.genSalt(10);
    psw = await  bcrypt.hash(psw,salt);
    return await  new Promise((resolve, reject) => {
        db.collection('Users').updateOne({
            email:mail
        },{
            $set:{password:psw}

        })
            .then(ans=>{
                resolve(ans);
            })
            .catch(err=>{
                reject(err);
            });
    })
}

async function updateUsernameAndPassword(dbController, mail, usrnme, psw){
    const db = dbController.getConnectionInstance();
    const salt = await bcrypt.genSalt(10);
    psw = await  bcrypt.hash(psw,salt);
    return await  new Promise(((resolve, reject) => {
        db.collection('Users').updateOne({
            email:mail
        },{
            $set:{
                username:usrnme,
                password:psw
            }})
            .then(ans=>{
                resolve(ans);
            })
            .catch(err=>{
                reject(err);
            });


    }))
}

async function updateEverythingUser(dbController,id, mail,lastName, Notif, psw, type, firstName, userName){
    const db = dbController.getConnectionInstance();

    const salt = await bcrypt.genSalt(10);
    psw = await  bcrypt.hash(psw,salt);
    let oldEmail ;
    let Person=[{
        "email": "",
        "role": "",
        "label": ""
    }]
    Person[0].email = mail;
    return await  new Promise(async (resolve, reject) => {
        //check if new email is already in use
       await getUserByEmail(dbController, mail)
            .then(ans=>{

                if(ans !== "user not found" && ans !== null){
                    resolve("email already in use");
                }
            })
           .catch(err=>{
               reject(err);
           })
        //get old email and role
        await  getUserByID(dbController, id)
            .then(ans=>{

                if(ans !== "No user found" && ans != null){
                    oldEmail = ans.email;
                    Person[0].label = firstName+" "+lastName;

                }
            })
            .catch(err=>{
                console.log("err was thrown here");
                reject(err);

            })
        //use old email to retrieve all projects the user belongs in
        let Members;
       await ProjectManagerService.getAllProjectsByUserEmail(dbController,oldEmail)
            .then(async (ans)=>{

                if(ans != null && ans !== "No matched projects"){
                    if(ans.length > 0){
                        for(let i =0; i<ans.length;i++){//projects
                            Person[0].role = ans[i].role;
                            await ProjectManagerService.addNewProjectMember(dbController, ans[i]._id,Person)
                                .catch(err=>{reject(err)});

                            await ProjectManagerService.removeProjectMember(dbController,ans[i]._id,oldEmail)
                                .catch(err=>{reject(err)});
                        }
                    }
                }
            })
            .catch(err=>{
                reject(err);
            })



        db.collection('Users').updateOne({
            "_id":ObjectId(id)
        },{
            $set:{
                email: mail,
                lastName: lastName,
                Notification:Notif,
                password:psw,
                type: type,
                firstName:firstName,
                username:userName
            }})
            .then(ans=>{
                resolve(ans);
            })
            .catch(err=>{
                reject(err);
            });


    })

}

async function getInvitesTo(dbController,id) {

    const db = dbController.getConnectionInstance();
    return await new Promise((resolve, reject) => {
        db.collection('Users').findOne({
            "_id": ObjectId(id)
        })
            .then((ans) => {
                if(ans == null){
                    resolve("No user found");
                }else{
                    //console.log(ans)
                    resolve(ans.invitesTo);
                }

            })
            .catch(err => {

                reject(err);
            });


    })

}

async function appendInvitesTo(dbController, newInvites, id){

    const db = dbController.getConnectionInstance();
   return new Promise((resolve,reject)=>{

       getInvitesTo(dbController,id)
           .then((result)=>{
               let invites = [];

               for (let i =0 ; i < result.length ;i++){
                   if(result !== '[]'){
                       invites.push(result[i]);
                   }

               }
               for (let i =0 ; i < newInvites.length ;i++){
                   invites.push(newInvites[i]);
               }

               db.collection('Users').updateOne({
                   "_id": ObjectId(id)
               },{
                   $set:{
                       invitesTo:invites,

                   }})
                   .then(()=>{
                       console.log("443");
                       resolve("hello world");
                       return "invites updated";

                   })
                   .catch(()=>{
                       console.log(448);
                   })


           })
           .catch((err)=>{
               console.log(err)
           })

   })




}


async function appendInvitesFrom(dbController, newInvite, receviers){

    const db = dbController.getConnectionInstance();
    console.log(receviers);
    for(let i =0 ; i < receviers.length ; i ++)
    {

        let email =receviers[i];
        getUserByEmail(dbController,email)
            .then((user)=>{
                let InvitesFrom = user.invitesFrom;
                if(invitesFrom === '[]')
                {
                    InvitesFrom = [];
                }

                InvitesFrom.append(newInvite);
                db.collection('Users').updateOne({
                   email: receviers[i]
                },{
                    $set:{
                        invitesFrom:InvitesFrom,

                    }})
                    .then(()=>{
                        console.log("489");
                        return "invites updated";

                    })
                    .catch(()=>{
                        console.log(494);
                    })

            })
            .catch(()=>{
                console.log("failed to get user");
            })


    }

}

module.exports = {
    getUserByID,
    getAllUsers,
    getUserByEmail,
    getAllOtherUsers,
    insertUser,
    removeUserByID,
    removeUserByEmail,
    updateUserUsername,
    updateUserPassword,
    updateUsernameAndPassword,
    updateEverythingUser,
    appendInvitesTo,
    appendInvitesFrom

}






