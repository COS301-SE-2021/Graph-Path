const mongoose = require('mongoose');
const db = require('../Controllers/DBController') ;

const ProjectSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    id: String,
    startDate: String,
    dueDate: String,
    Members: String,
    Owner: String,
    Graph: String

});

module.exports  = mongoose.model("ProjectModel",ProjectSchema);