const mongoose = require('mongoose') ;
const TaskModel = require('./TaskModel')

const NodeSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
   /* Task: {
        id: { type: Schema.Types.ObjectId, ref: 'TaskSchema'}

    }

    */


    Label: {
        type: String,
        required: true,
    },


    Parent_Node: {
        type: String,
        required: true,
    },

    Child_Node: {
        type: String,
        required: true,
    }

},{collection :'Node'});

module.exports  = mongoose.model("NodeModel",NodeSchema);