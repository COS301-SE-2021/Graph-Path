const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.TEST_DB_URI,{
    dbName:"test" ,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify: false,
    useCreateIndex:true,
})
.then( () =>{

    console.log("Test DB connected")
})
.catch((err)=>{
    console.log("Test DB failed to connect: "+err)
})

mongoose.connection.on('connected',() =>{
    console.log('Mongoose connected to db')
})

mongoose.connection.on('error', (err)=>{
    console.log(err)
})

mongoose.connection.on('disconnected',() =>{
    console.log('Mongoose disconnected to db')
})

process.on('SIGINT', async () => {

    await mongoose.connection.close()
    process.exit(0)
})
