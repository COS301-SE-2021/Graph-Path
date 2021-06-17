const mongoose = require('mongoose') ;

const NodeSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    label: Array

},{collection :'Node'});

module.exports  = mongoose.model("NodeModel",NodeSchema);