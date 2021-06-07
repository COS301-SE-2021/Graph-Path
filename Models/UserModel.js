const mongoose = require('mongoose');
const db =  require('../Controllers/DBController') ;

const UserSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    surname: String,
    email:String,
    password: String,
    username: String,
    type: String,
    Notification: String

});

const dbUserModel = db.model('UserModel',UserSchema,'Users') ;
module.exports = dbUserModel ;
// module.exports  = mongoose.model("UserModel",UserSchema);