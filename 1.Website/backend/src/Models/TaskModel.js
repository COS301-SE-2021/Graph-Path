const mongoose = require("mongoose");

let TaskObjectBlank = {
    //_id: mongoose.mongo.ObjectID,
    description:"",
    title: "",
    status: "",
    projectID: "",
    assigner: "", // are we using assigner or Assigner?
    assignee: "",
    due: "",
    issued: "",
    nodeID: "",
    taskMembers: [] //is this field in use?
}
let TaskObjectScheme = {
    _id: mongoose.mongo.ObjectID,
    description: String,
    title: String,
    status: String,
    projectID: mongoose.mongo.ObjectID,
    assigner: String, // are we using assigner or Assigner?
    assignee: String,
    due: Date,
    issued: Date,
    nodeID: mongoose.mongo.ObjectID,
    taskMembers: [] //is this field in use?
}

module.exports ={
    TaskObjectBlank,
    TaskObjectScheme

}