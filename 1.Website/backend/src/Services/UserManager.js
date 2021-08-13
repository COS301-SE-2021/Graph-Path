

async function getUserByID(id){
    return await new Promise((resolve, reject)=>{
        db.collection('Users').findOne({
            "_id": ObjectId(id)
        })
            .then((ans)=>{
                resolve(ans);


            })
            .catch(err=>{
                reject(err);
            });



    })

}


