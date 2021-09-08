const mongoose = require("mongoose");
let TaskObject = {
    _id: new mongoose.mongo.ObjectID(),
    description:req.body.description,
    title:req.body.title,
    status:req.body.status,
    projectID:req.body.projectID,
    taskMembers:req.body.taskMembers,
    assigner:req.body.assigner,
    due:req.body.due,
    issued:req.body.due,
    nodeID: req.body.nodeID,
}
module.exports = TaskObject ;