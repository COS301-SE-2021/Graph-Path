const mongoose = require('mongoose');
const UserModel = require('../Models/UserModel');
const db = require('../Controllers/DBController') ;
const {ObjectID: ObjectId} = require("mongodb");

function getAllUsers(body){

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
            const usr = new UserModel({
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

getUserByUserNameOrEmail = (data) =>{
    if (data.email !== null){
        var ans = UserModel.find({email:data.email}) ;
        return ans
    }
    else if (data.username){
        var ans = UserModel.find({usernam:data.username})
        return ans ;
    }
}

createUser = (data) =>{
    // Usermodel.watch().on('change',data =>console.log(new Date(),data)) ;
    console.log('Trying to create user',data)
    var status = -1 ; //untouched
    const id = new mongoose.mongo.ObjectID() ; 
    var newUSer = data ;
    newUSer["_id"] = id ;
    UserModel.create(newUSer)
    .then((value)=>{
        status = 1 //saved
        console.log(value,'saved')
        },
        (value) =>{
            status = 0 ;
            console.log('rejected: ',value) ;
        }
    )
    .catch(err =>{
        console.log(data,err)
        status = 0 ;  //not saved
    }) ; 

    return status ;

    // db.Users.insert(data) 

}

// var userManagement = {};
// userManagement.getAllUsers = getAllUsers;
// userManagement.insertNewUser = manageUser;
// module.exports = userManagement;

const userManagement = {
getAllUsers: (data) => getAllUsers(data),
userManagement: (data) => manageUser(data), 
create : (data) => createUser(data) ,

    getUserByUserNameOrEmail : (data)=> getUserByUserNameOrEmail(data)
}
module.exports = userManagement;
