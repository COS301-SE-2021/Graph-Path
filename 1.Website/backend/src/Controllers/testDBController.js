const mongClient = require('mongodb').MongoClient ;
require('dotenv').config() ;
;

//console.log(DB_URI)
var db ;

const dbController = {
    connect: (callback)=>{
        mongClient.connect(global.__MONGO_URI__,
            {useNewUrlParser:true,useUnifiedTopology:true},
            (err,clientDB)=>{
                db = clientDB.db(global.__MONGO_DB_NAME__) ;
                console.log('+++++++++++++++++++++++++++connect to db, to serve request++++++++++') ;
                return callback(err) ;
            }) ;
    },
    getConnectionInstance : ()=>{
        console.log('returned Mongo DB instance ');
        console.log(db);
        return db ;
    }
}


module.exports = {
    dbController
}