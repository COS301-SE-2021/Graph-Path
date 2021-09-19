const mongoose = require('mongoose') ;


const NotificationObjectScheme = {

    //_id: mongoose.Schema.Types.ObjectId(),
    type: String,//project creation, task assignment
    issued: Date,
    sender: String,
    receiver: String,
    project: Object,//all the necessary project information
    //payload: Object,


}

const NotificationObjectBlank = {
    //_id: mongoose.Schema.Types.ObjectId(),
    type: "",//project creation, task assignment
    issued: "",
    sender: "",
    receiver: "",
    project: {},//all the necessary project information
    //payload: {},
}
module.exports = {
    NotificationObjectScheme,
    NotificationObjectBlank
}