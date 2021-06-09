let mongoose = require('mongoose');

// DB_URI = "mongodb+srv://NoCap2021:NoCap2021@cluster0.n67tx.mongodb.net/GraphPath?retryWrites=true&w=majority";

// class DB{
//     constructor(){
//         this.connect();
//     }

//     connect(){
//         mongoose.connect(DB_URI, {useNewUrlParser: true , useUnifiedTopology: true})
//             .then(() => {
//                 console.log('Database connection successful')
//             })
//             .catch(err => {
//                 console.error('Database connection error: '+ err)
//             })
//     }
// }

// //module.exports = new DB();
// module.exports = DB;
// const mongoose = require('mongoose') ;
const DB_URI ='mongodb://127.0.0.1:27017/solodb' ;
const dbConnection = mongoose.createConnection(DB_URI,{useNewUrlParser: true,useUnifiedTopology: true}) ; //connect(DB_URI,{useNewUrlParser: true})


module.exports =  dbConnection;
