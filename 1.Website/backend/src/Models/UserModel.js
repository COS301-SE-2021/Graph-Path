const mongoose = require('mongoose');

const UserObjectScheme ={

    //_id: mongoose.mongo.ObjectId,
    email: String,
    email_verified: Boolean,
    family_name:String,
    given_name: String,
    locale: String,//language?
    name: String,//full names
    nickname: String,
    picture: Image,//link to an image
    sub: String,//something to do with google auth
    updated_at: String,//might be of type date
    Notification: Array,

}

const UserObjectBlank ={

    //_id: mongoose.mongo.ObjectId,
    email: "",
    email_verified: "",
    family_name:"",
    given_name: "",
    locale: "",//language?
    name: "",//full names
    nickname: "",
    picture: "",//link to an image
    sub: "",//something to do with google auth
    updated_at: "",//might be of type date
    Notification: [],

}

module.exports={
    UserObjectScheme,
    UserObjectBlank
}
