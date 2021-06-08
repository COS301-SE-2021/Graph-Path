const mongoose = require('mongoose');
mongoose.set('debug', true)
const UserSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    Surname: String,
    email:String,
    password: String,
    username: String,
    type: String,
    Notification: String

},{collection :'User'});

const User = mongoose.model("User",UserSchema);
module.exports  = User;