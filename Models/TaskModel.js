const mongoose = require('mongoose') ;

const TaskSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    CreationDate:{
        type: Date,
        required: true,
    },
    DueDate:{
        type: Date,
        required: true,
    } ,

    TaskName: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    Label: {
        type: String,
        required: true,
    },
    Status: {
        type: String,
        required: true,
    },
    Assignee:  {
        type: Array,
        required: true,
    },

    Assigner: {
        type: String,
        required: true,
    },

    Parent_Node: {
        type: String,
        required: true,
    },


});

const Task = mongoose.model('task',TaskSchema)
module.exports = Task ;