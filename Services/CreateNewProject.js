const fs = require('fs');
const addNewProject = require('../Controllers/DBcontroller');
const mongoose = require('mongoose');
const ProjectModel = require('../Models/ProjectModel');


DB_URI = "mongodb+srv://NoCap2021:NoCap2021@cluster0.n67tx.mongodb.net/GraphPath?retryWrites=true&w=majority";
function createNewProject(MetaData)
{

    mongoose.connect(DB_URI, {useNewUrlParser: true , useUnifiedTopology: true})
        .then((result) =>{

            const project = new ProjectModel ({
                _id: mongoose.Types.ObjectId(),
                name: MetaData['Name'],
                id: MetaData['id'],
                startDate: MetaData['startDate'],
                dueDate: MetaData['dueDate'],
                Members: MetaData['Members'],
                Owner: MetaData['Owner'],
                Graph: MetaData['Graph']
            });

            project.save().then(result =>{


                return 1;

            })
                .catch(err=>{
                    console.log("error saving document: "+ err);

                    return 0;
                })
        })


        .catch((err) => {

        })

}

module.exports = createNewProject;
