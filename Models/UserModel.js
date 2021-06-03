const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    Surname: String,
    email:String,
    password: String,
    username: String,
    type: String,
    Notification: String

});

module.exports  = mongoose.model("UserModel",UserSchema);