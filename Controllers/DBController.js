
const mongClient = require('mongodb').MongoClient ;

const DB_URI ='mongodb://127.0.0.1:27017' ;
var db ;

const dbController = {
    connect: (callback)=>{
        mongClient.connect(DB_URI,
            {useNewUrlParser:true,useUnifiedTopology:true},
            (err,clientDB)=>{
            db = clientDB.db('testDB') ;
            console.log('+++++++++++++++++++++++++++connect to db, to serve request++++++++++') ;
            return callback(err) ;
        }) ;
    },
    getDB : ()=>{
        console.log('returned DB')
        return db ;
    }
}


// const dbConnection = mongoose.createConnection(DB_URI,{useNewUrlParser: true,useUnifiedTopology: true}) ; //connect(DB_URI,{useNewUrlParser: true})

module.exports = dbController ;
// module.exports =  dbConnection;
