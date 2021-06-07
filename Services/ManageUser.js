const mongoose = require('mongoose');
const UserModel = require('../Models/UserModel');

DB_URI = "mongodb+srv://NoCap2021:NoCap2021@cluster0.n67tx.mongodb.net/GraphPath?retryWrites=true&w=majority";


function getAllUsers(body){//getAllUsers(body)
    var arr =[];
    mongoose.connect(DB_URI, {useNewUrlParser: true , useUnifiedTopology: true})
        .then((result) =>{
            console.log("Successful connection to DB");
            //const filter = {};
           var User;
           UserModel.find({},(err, users)=>{
               if(err){
                   res.send("Couldn't retrieve users");
               }
               res.json(users);
           }); //= UserModel.find(filter);

        })



      /*  const user = new UserModel({
            _id: mongoose.Types.ObjectId(),
            name: body.name,
            Surname: body.Surname,
            email:body.email,
            password: body.password,
            username: body.username,
            type: body.type,
            Notification: body.Notification
        });

       */

        return 0;

    const user = new UserModel({
        _id: mongoose.Types.ObjectId(),
        name: body.name,
        Surname: body.Surname,
        email:body.email,
        password: body.password,
        username: body.username,
        type: body.type,
        Notification: body.Notification
    });
    return 0;
}

function insertUser(body) {
    //connect to DB
    mongoose.connect(DB_URI, {useNewUrlParser: true , useUnifiedTopology: true})
        .then((result) =>{
            const user = new UserModel({
                _id: mongoose.Types.ObjectId(),
                name: body.name,
                Surname: body.Surname,
                email:body.email,
                password: body.password,
                username: body.username,
                type: body.type,
                Notification: body.Notification
            });
            user.save().then(result=>{
                return 0;
            })
            .catch((err) => {
                console.log("Could not save the user: "+err);
                return 1;
            })

        })

    //create user object for DB (create model for DB)

    //push/save user object in DB

    //if(push successful return true){

    //}else return false
    .catch((err) => {

    })
    return 0;


}

var ManageUser = {};
ManageUser.getAllUsers = getAllUsers;
ManageUser.insertNewUser = insertUser;
module.exports = ManageUser;