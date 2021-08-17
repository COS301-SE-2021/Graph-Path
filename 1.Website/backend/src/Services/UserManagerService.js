const bcrypt = require("bcrypt");
const ObjectId = require('mongodb').ObjectID;
const ProjectManagerService = require('./ProjectManagerService');

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

    const db = dbController.getConnectionInstance();

    return await new Promise((resolve, reject)=>{
        db.collection('Users').findOne({email:userObject.email})
            .then(async (ans)=>{

                if(ans != null){
                    resolve("user already exists");
                }
                else
                {
                    const salt = await bcrypt.genSalt(10);
                    userObject.password = await  bcrypt.hash(userObject.password,salt);
                        db.collection('Users').insertOne(userObject)
                        .then((ans)=>{

                            resolve(ans);
                        })
                            .catch((err)=>{

                            reject(err);
                        })


                }
            })
            .catch((err)=>{
            reject(err);
            })
    })

}



    //const salt = await bcrypt.genSalt(10);
    //userObject.password = await  bcrypt.hash(userObject.password,salt);
    /*return await new Promise((resolve, reject)=>{
        db.collection('Users').insertOne(userObject)
            .then((ans)=>{
                resolve(ans);
            },(ans)=>{
                console.log('rejected',ans) ;
                resolve(ans);
            })
            .catch(err=>{
                reject(err);
            })
    });*/
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
    let role;
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
               // console.log("getUserByEmail call: ",ans);
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
                //console.log("updateEverythingUser: ",ans);
                if(ans !== "No user found" && ans != null){
                    oldEmail = ans.email;
                    Person[0].label = firstName+" "+lastName;
                    //console.log("This is person: ",Person);
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
                console.log("Peanuts:",ans);
                if(ans != null && ans !== "No matched projects"){
                    if(ans.length > 0){
                        for(let i =0; i<ans.length;i++){//projects
                            Person[0].role = ans[i].role;
                            await ProjectManagerService.addNewProjectMember(dbController, ans[i]._id,Person)
                                .catch(err=>{reject(err)});

                            await ProjectManagerService.removeProjectMember(dbController,ans[i]._id,oldEmail)
                                .catch(err=>{reject(err)});

                                                // for(let k=0; k<ans[i].groupMembers.length;k++){
                                                //     if(ans[i].groupMembers[k].email === oldEmail){
                                                //         role = ans[i].role;
                                                //         Person.role = role;
                                                //         console.log("This is role: ",role);
                                                //     }
                                                // }
                        }
                    }
                }
            })
            .catch(err=>{
                console.log("err was thrown from down here");
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
    updateEverythingUser

}






