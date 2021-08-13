



module.exports = {
    getUserByID: async function getUserByID(db, id) {

        return await new Promise((resolve, reject) => {

            db.collection('Users').findOne({
                "_id": ObjectId(id)
            })
                .then((ans) => {

                    resolve(ans);


                })
                .catch(err => {

                    reject("memo");
                });


        })
        console.log("ln 9");

    }
}






