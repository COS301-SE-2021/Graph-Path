const mongClient = require('mongodb').MongoClient ;
require('dotenv').config() ;
const DB_URI =process.env.TEST_DB_URI ;
//const DB_URI = "mongodb+srv://NoCap2021:NoCap2021@cluster0.n67tx.mongodb.net/test?retryWrites=true&w=majority";
var ObjectId = require('mongodb').ObjectID;
const mongoose = require('mongoose') ;

let db ;

//console.log(DB_URI);
mongClient.connect(DB_URI, {useNewUrlParser:true,useUnifiedTopology:true},(err,clientDB)=>{
    if(err){
        return console.log("Could not connect to the DB: ",err)
    }
    db = clientDB.db('test');
    console.log('+++++++++++++++++++++++++++connect to db, to serve request++++++++++') ;
})


//connect to db
// const dbController = {
//     connect: (callback)=>{
//         mongClient.connect(DB_URI,
//             {useNewUrlParser:true,useUnifiedTopology:true},
//             (err,clientDB)=>{
//                 db = clientDB.db('test') ;
//                 console.log('+++++++++++++++++++++++++++connect to db, to serve request++++++++++') ;
//                 //return callback(err) ;
//             }) ;
//     },
//     getDB : ()=>{
//         console.log('returned mongoDB connection instance')
//         return db ;
//     }
// }
// dbController.connect();
// dbController.getDB();

 function getConnectionInstance()
{
    console.log("returned mongoDB instance");
    return db;
}


/////////////////////////////////////////////////////-Node-//////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////-Graph-//////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////-exports-//////////////////////////////////////////////////////////////
// console.log(getUserByID);
module.exports={

    getConnectionInstance

};