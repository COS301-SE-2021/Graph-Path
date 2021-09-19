const mongClient = require('mongodb').MongoClient ;
require('dotenv').config() ;
const DB_URI =process.env.TEST_DB_URI ;
//const DB_URI = "mongodb+srv://NoCap2021:NoCap2021@cluster0.n67tx.mongodb.net/test?retryWrites=true&w=majority";
var ObjectId = require('mongodb').ObjectID;
const mongoose = require('mongoose') ;

let db ;

//console.log(DB_URI);
 mongClient.connect(global.__MONGO_URI__, {useNewUrlParser:true,useUnifiedTopology:true},(err,clientDB)=>{
    if(err){
        return console.log("Could not connect to the DB: ",err)
    }
    db = clientDB.db(global.__MONGO_DB_NAME__);

    console.log('+++++++++++++++++++++++++++connect to  MOCK db, to serve request++++++++++') ;
})


function getConnectionInstance()
{

    return db;
}


module.exports={

    getConnectionInstance

};