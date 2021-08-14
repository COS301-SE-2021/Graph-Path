const bcrypt = require("bcrypt");
const ObjectId = require('mongodb').ObjectID;

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
    //first check if user exists
    let UserExist = null;
    db.collection('Users').findOne({
        "email":userObject.email,
    }).then((result)=>{

        if(result)
        {
            resolve("")
        }

        UserExist = true;
        if(UserExist === true)
        {
            console.log(result);
        }
    }).catch((err)=>{
        UserExist= false;
        console.log('New user');
    })



    const salt = await bcrypt.genSalt(10);
    userObject.password = await  bcrypt.hash(userObject.password,salt);
    return await new Promise((resolve, reject)=>{
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
    });
}

//***************************************************-delete-**************************************************************
async function removeUserByID(dbController, id){
    const db = dbController.getConnectionInstance();
    return await new Promise((resolve, reject) => {
        db.collection('Users').deleteOne({
            "_id": ObjectId(id)
        })
            .then((ans)=>{
                resolve(ans);
            })
            .catch(err=>{
                reject(err);
            });
    });
}

async function removeUserByEmail( dbController, mail){
    const db = dbController.getConnectionInstance();
    return await new Promise((resolve, reject) => {
        db.collection('Users').deleteOne({
            email: mail
        })
            .then((ans)=>{
                resolve(ans);

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

    return await  new Promise(((resolve, reject) => {
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


    }))

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






