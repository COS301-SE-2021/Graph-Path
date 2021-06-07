const mongoose = require('mongoose') ;
const DB_URI ='mongodb://127.0.0.1:27017/solodb' ;
const dbConnection = mongoose.createConnection(DB_URI,{useNewUrlParser: true,useUnifiedTopology: true}) ; //connect(DB_URI,{useNewUrlParser: true})


module.exports =  dbConnection;