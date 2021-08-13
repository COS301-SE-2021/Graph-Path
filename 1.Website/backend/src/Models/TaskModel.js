const mongoose = require('mongoose') ;

const TaskSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    Assignee: String,
    Description:String,
    Issued: Date,
    Project:String,
    status:String,
    Tasknr:String,
    Assigner:String,
    Due:Date,
    NodeID: String,





});

const Task = mongoose.model('task',TaskSchema)
module.exports = Task ;