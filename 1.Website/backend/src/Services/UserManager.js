const {ObjectID: ObjectId} = require("mongodb");

function initUserManager(db)
{


    async function getUserByEmail(email){
        return await new Promise((resolve, reject)=>{
            db.collection('Users').findOne({
                "email": email
            }).then((ans)=>{
                resolve(ans);
            }).catch(err=>{
                reject(err);
            });
        })

    }

    async function getAllUsers(){
        return await new Promise((resolve, reject)=>{
            db.collection('Users').find({}).toArray()
                .then((ans)=>{
                    resolve(ans);
                }).catch(err=>{
                reject(err);
            })
        })
    }

    async function getAllOtherUsers(email,id){
        return await  new Promise((resolve, reject)=>{
            db.collection('Users').find({}).toArray()
                .then((ans)=>{
                    if (ans.length > 0) {
                        //remove current user first
                        let newarray = ans.filter((val)=>{
                            if(val.email !== email) {
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

                    resolve(ans);
                })
                .catch(err=>{
                    reject(err);
                });
        })
    }

    async function insertUser(userObject){


    }




    return getUserByID;
}




module.exports={
  initUserManager,

};