const mongoose = require('mongoose') ;


const ProjectObjectScheme = {

    //_id: mongoose.Schema.Types.ObjectId(),
    projectName: String,
    startDate: Date,
    dueDate: Date,
    groupMembers:Array,//list of members
    projectOwner: String,
    graph: Object,
    lastAccessed: Date,
    projectDescription: String,
    status: String


}

const ProjectObjectBlank = {
    //_id: mongoose.Schema.Types.ObjectId(),
    projectName: "",
    startDate: "",
    dueDate: "",
    groupMembers:[],//list of members
    projectOwner: "",
    graph: {},
    lastAccessed: "",
    projectDescription: "",
    status: ""
}
module.exports ={
    ProjectObjectScheme,
    ProjectObjectBlank
}