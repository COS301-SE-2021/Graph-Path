const mongoose = require('mongoose');
const Usermodel = require('../Models/UserModel');
const db = require('../Controllers/DBController') ;
const { stat } = require('fs/promises');

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

function manageUser(body) {
    //connect to DB
    //create user object for DB{model}
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
    //push/save user object in DB

    //if(push successfull return true){

    //}else return false
    return 0;


}

createUser = (data) =>{
    // Usermodel.watch().on('change',data =>console.log(new Date(),data)) ;
    console.log('Trying to create user',data)
    var status = -1 ; //untouched
    const id = new mongoose.mongo.ObjectID() ; 
    var newUSer = data ;
    newUSer["_id"] = id ;
    Usermodel.create(newUSer)
    .then(()=>{
        status = 1 //saved
        console.log('saved')
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
create : (data) => createUser(data) 
}
module.exports = userManagement;