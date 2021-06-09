const mongoose = require('mongoose');
const ProjectModel = require('../Models/ProjectModel') ;
// const createNewProject = require('./CreateNewProject');

/**
 * Saves data to database and retuns status 1 for success , 0 for failur ,-1 for internal server erro
 * @async
 * @function createNewProject
 * @param {Objet} data 
 * @returns {Promise<number>} status
 */

function createNewProject(data){
    console.log('trying to save to database')
    const id = new mongoose.mongo.ObjectID() ;
    var status = -1 ; //untoched
    var newProject = data ;
    newProject["_id"] = id ;
    newProject["userID"] = id //should get user id from fronted or use schemasless mongdb;
    //save to the database
    ProjectModel.create(newProject) 
    .then((result) =>{
            console.log('save to dab was sucess, result:',result) ;

            status = 1 // success
            return status ;
        },
        (result)=>{
            status = 0 ; //F
            console.log('save to dab was failure',status,' result:',result)
            return status ;
            
        }
    )
    .catch(err =>{
        console.log('received error',err) 
        status = 0 ; //tried saving but err
        return err ;
    })
    // return status ; // -1

}

const projectManager = {
    createProject: async (data)=> {return createNewProject(data)} //(data) =>createNewProject(data) ,
}

module.exports = projectManager ;