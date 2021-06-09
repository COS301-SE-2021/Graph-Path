const mongoose = require('mongoose');
const User= require('../Models/UserModel');
const DB = require('../Controllers/DBController');

//DB_URI = "mongodb+srv://NoCap2021:NoCap2021@cluster0.n67tx.mongodb.net/GraphPath?retryWrites=true&w=majority";
const db = new DB();

async function getAllUsers(body){
       // .then((result) =>{
    //const Users = new UserModel({});
           await User.find(

             )
                .then((doc)=>{

                        console.log("This is doc: "+doc);
                        res.send(doc);


                })
                .catch((err)=>{
                    console.error("There was an error in retrieving the users: "+err);
                })

       // })
}

async function getUserByEmail(body){
    await User.findOne({
        email: body
    },(err,data)=>{
        if(err){
            console.log("There was an error in retrieving the user by email: "+err);
        }else{
            return data;
           // res.send(data);
        }
    })

}

function insertUser(body) {
    //connect to DB
   // mongoose.connect(DB_URI, {useNewUrlParser: true , useUnifiedTopology: true})


       // .then((result) =>{
            const usr = new User({
                _id: mongoose.Types.ObjectId(),
                name: body.name,
                Surname: body.Surname,
                email:body.email,
                password: body.password,
                username: body.username,
                type: body.type,
                Notification: body.Notification
            });
            usr.save().then(result=>{
                return 0;
            })
            .catch((err) => {
                console.log("Could not save the user: "+err);
                return 1;
            })

       // })

    //create user object for DB (create model for DB)

    //push/save user object in DB

    //if(push successful return true){

    //}else return false
    .catch((err) => {

    })
    return 0;


}

const ManageUser = {};
ManageUser.getAllUsers = getAllUsers;
ManageUser.insertNewUser = insertUser;
ManageUser.getUserByEmail = getUserByEmail;
module.exports = ManageUser;