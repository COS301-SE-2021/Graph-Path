const mongClient = require('mongodb').MongoClient ;
require('dotenv').config() ;
const DB_URI =process.env.TEST_DB_URI ;
var ObjectId = require('mongodb').ObjectID;


let db ;

const dbController = {
    connect: (callback)=>{
        mongClient.connect(DB_URI,
            {useNewUrlParser:true,useUnifiedTopology:true},
            (err,clientDB)=>{
                db = clientDB.db('test') ;
                console.log('+++++++++++++++++++++++++++connect to db, to serve request++++++++++') ;
                //return callback(err) ;
            }) ;
    },
    getDB : ()=>{
        console.log('returned DB')
        return db ;
    }
}

dbController.connect();
dbController.getDB();
//console.log(db);


/////////////////////////////////////////////////////-User-///////////////////////////////////////////////////////////////////
//***************************************************-get-**************************************************************
async function getUserByID(id){
    return await new Promise((resolve, reject)=>{
         db.collection('Users').findOne({
            "_id": ObjectId(id)
        })
            .then((ans)=>{
                console.log("This is ans: ",ans);
                //return ans;
                resolve(ans);


            })
            .catch(err=>{
                console.log('from Alisdb req', err)
                reject(err);
            });



    })
   // return prom;
}

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
                    let newArray = ans.filter((val)=>{
                        if(val.email !== email) {
                            return true;
                        }
                    });
                    //send response
                    resolve(newArray);
                } else {
                    console.log("This is ans in getAllOtherUsers: ",ans);
                    resolve(ans);
                }

                resolve(ans);
            })
            .catch(err=>{
                reject(err);
            });
    })
}

//***************************************************-post-**************************************************************
async function insertUser(userObject){


}
/////////////////////////////////////////////////////-Project-//////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////-Node-//////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////-Graph-//////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////-Task-//////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////-exports-//////////////////////////////////////////////////////////////
module.exports={
    getUserByID,
    getUserByEmail,
    getAllUsers,
    getAllOtherUsers,
    insertUser
};