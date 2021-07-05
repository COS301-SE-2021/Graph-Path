
const { error } = require('console');
const { response } = require('express');
const fs = require('fs');
const  mongoose  = require('mongoose');
const addNewProject = require('../Controllers/DBController');
const ProjectModel = require('../Models/ProjectModel');
let retriveProject = {};

DB_URI = "mongodb+srv://NoCap2021:NoCap2021@cluster0.n67tx.mongodb.net/GraphPath?retryWrites=true&w=majority";
mongoose.connect(DB_URI, {useNewUrlParser: true , useUnifiedTopology: true})
    .then((result) =>{

        console.log("Successful connection get Project by Name");



    })

    .catch((err) => {

        console.log("failed connection  get ProjectbyName ");


        console.log(err);

    });

function getProjectById(projectId)
{

    // query the DB
    //return and prepare the payload into JSON
    return " a JSON_object"
};



function getProjectByName(projectName)
{

    ProjectModel.find({Members: projectName},(error,data) =>{

        if(error) {

            console.log(error)
            return data;
        }

        else{

            console.log(data)
            return data;
        }
    })




};

retriveProject.getProjectById = getProjectById;
retriveProject.getProjectByName = getProjectByName;

module.exports = retriveProject;