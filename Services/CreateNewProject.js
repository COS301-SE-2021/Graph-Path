const fs = require('fs');
const addNewProject = require('../Controllers/DBcontroller');
const mongoose = require('mongoose');
const ProjectModel = require('../Models/ProjectModel');



function createNewProject(MetaData)
{

    mongoose.connect(DB_URI, {useNewUrlParser: true , useUnifiedTopology: true})
        .then((result) =>{

            console.log("connected");
        })
        .catch((err) => {

        })

     console.log(MetaData);

    const project = new ProjectModel ({

        _id: mongoose.Types.ObjectId,
        name: MetaData['Name'],
        id: MetaData['id'],
        startDate: MetaData['startDate'],
        dueDate: MetaData['dueDate'],
        Members: MetaData['Members'],
        Owner: MetaData['Owner'],
        Graph: MetaData['Graph']
    });

    project.save().then(result =>{

        console.log(result);
        status = 1;
        return status;

    })
        .catch(err=>{
            console.log("error saving document: "+ err);
            status = 0;
            return 0;
        })




}

module.exports = createNewProject;
