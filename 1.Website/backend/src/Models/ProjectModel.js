const mongoose = require('mongoose') ;
// const db = require('../Controllers/DBController') ;

const ProjectSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    projectName: String,
    startDate: Date,
    dueDate: Date,
    groupMembers:Array,//list of members
    owner: String,
    userId : mongoose.Schema.Types.ObjectId
});

// module.exports  = mongoose.model("ProjectModel",ProjectSchema);
// const ProjectModel = db.model('ProjectModel,', ProjectSchema,'Projects') ;  
// module.exports = ProjectModel ;
module.exports = ProjectSchema ;