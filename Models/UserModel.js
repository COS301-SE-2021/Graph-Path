const mongoose = require('mongoose');
<<<<<<< HEAD
=======
const db =  require('../Controllers/DBController') ;
>>>>>>> feature-backend-userIntergrated

const UserSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    surname: String,
    email:String,
    password: String,
    username: String,
    type: String,
    Notification: String,

},{collection :'User'});

<<<<<<< HEAD
module.exports  = mongoose.model("User",UserSchema);
=======
const dbUserModel = db.model('UserModel',UserSchema,'Users') ;
module.exports = dbUserModel ;
// module.exports  = mongoose.model("UserModel",UserSchema);
>>>>>>> feature-backend-userIntergrated
