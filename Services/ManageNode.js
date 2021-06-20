const mongoose = require('mongoose');
const NodeModel = require('../Models/NodeModel');
const db = require('../Controllers/DBController') ;
const { stat } = require('fs/promises');

function createNode(data){
    console.log(data);
    const nde = new NodeModel({
        _id: mongoose.Types.ObjectId(),
        task: data.task,
        status: data.status
    });
    nde.save().then(result=>{
        return 0;
    })
        .catch((err) => {
            console.log("Could not save the node: "+err);
            return 1;
        })
        .catch((err) => {

        })
    //return 0;
}

const nodeManagement = {
    getAllNodes: (data) => getAllNodes(data),
    nodeManagement: (data) => manageNode(data),
    create : (data) => createNode(data)
}
module.exports = nodeManagement;