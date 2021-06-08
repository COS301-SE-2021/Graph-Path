const mongoose = require('mongoose');
const ProjectModel = require('../Models/ProjectModel') ;
const createNewProject = require('./CreateNewProject');

createNewProject = (data) =>{
    const id = new mongoose.mongo.ObjectID() ;
    var status = -1 ; //untoched
    var newProject = data ;
    newProject["_id"] = id ;
    //save to the database
    ProjectModel.create(newProject) 
    .then((result) =>{
            status = 1 // success
            console.log(result) ;
        },
        (result)=>{
            status = 0 ;
        }
    )
    .catch(err =>{
        console.log(err) 
        status = 0 ; //tried saving but err
    })

    return status ;
}

const projectManager = {
    create: (data) =>createNewProject(data) ,
}

module.exports = projectManager ;