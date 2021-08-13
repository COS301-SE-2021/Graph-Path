const ObjectId = require('mongodb').ObjectID;


async function getUserByID(dbController,id) {

    const db = dbController.getConnectionInstance();
    return await new Promise((resolve, reject) => {
        db.collection('Users').findOne({
            "_id": ObjectId(id)
        })
            .then((ans) => {

                resolve(ans);


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


async function getAllUsers(dbController){
    const db = dbController.getConnectionInstance();
    return await new Promise((resolve, reject)=>{
        db.collection('Users').find({}).toArray()
            .then((ans)=>{
                resolve(ans);
            }).catch(err=>{
            reject(err);
        })
    })
}

module.exports = {
    getUserByID,


}






