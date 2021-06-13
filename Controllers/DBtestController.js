const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.TEST_MONGO_URI,{dbName:"test"})
.then( () =>{

    console.log("Test DB connected")
})
.catch((err)=>{
    console.log("Test DB failed to connect: "+err)
})