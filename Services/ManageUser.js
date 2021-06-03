const mongoose = require('mongoose');
const Usermodel = require('../Models/UserModel');

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

var userManagement = {};
userManagement.getAllUsers = getAllUsers;
userManagement.insertNewUser = manageUser;
module.exports = userManagement;