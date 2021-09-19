import mongoose from "mongoose";

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

let ProjectObject ={
    _id:  new mongoose.mongo.ObjectID(),
    projectOwner: req.body.email,
    projectName: req.body.projectName,
    projectDescription: req.body.description,
    startDate :req.body.startDate,
    dueDate : req.body.dueDate,
    status: "not started",
    groupMembers :[ownerMemberObject],
    graph: {},
    lastAccessed: new Date().toString(),

};


let Notification_Ojbect = {
    type: "",
    payload: "",
    issueDate: "",
    isRead: false,

}
