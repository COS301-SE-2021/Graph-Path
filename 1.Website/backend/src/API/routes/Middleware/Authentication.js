const jwt = require('jsonwebtoken');
const userManagementService = require("../../../Services/UserManagerService");
const ProjectManagerService = require("../../../Services/ProjectManagerService");
require('dotenv').config({path:'../../../.env'});

function authenticateToken(req,res,next)
{
   console.log("AuthenticatingToken")
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err){
            //log
            return res.status(403).send({message: "Token authentication failed"})
        }
        req.user = user
        console.log("Token authenticated")
        next();
    } )

}


async function generateToken(req,res,db){
    let responseObject= {};
    const newUserObject = req.body.userObject;
    await userManagementService.insertUser(db,newUserObject)
        .then(result =>{
            responseObject.message ="successfully update/inserted new user ";
        })
        .catch(err=>{
            responseObject.message ="successfully update/inserted new user ";
        })

    console.log("Preparing JW token");
    const email = req.body.email;
    return await new Promise((resolve, reject)=>{
        console.log("Preparing JW token: attempting to get user by email..");
        userManagementService.getUserByEmail(db,email)
            .then((result)=>{
                if(result !== "user not found" || (result !== "ServerDB")){
                    console.log("Preparing JW token: user successfully found by email");
                    const user = {
                        username : result.name,
                        lastName : result.given_name,
                        email    : result.email
                    }
                    console.log("Preparing JW token: Attempting to get all projects of user ...");
                    ProjectManagerService.getAllProjectsByUserEmail(db ,email)
                        .then((projects)=>{
                            console.log("Preparing JW token: successfully found  all projects of user ");
                        const ProjectsAndPerms = []
                        if(projects !=="No matched projects"){
                            for( let i = 0 ; i < projects.length ; i ++){

                                ProjectsAndPerms.push({
                                    projectID : projects[i]._id,
                                    permissions : projects[i].permissions,

                                })
                            }
                            user.projects = ProjectsAndPerms;
                            const  accessToken = jwt.sign(user,  process.env.ACCESS_TOKEN_SECRET);
                            resolve(accessToken)
                            req.body.token = accessToken;
                            console.log("JW token successfully generated");

                        }else{
                            ProjectsAndPerms.push({
                                projectID : "",
                                permissions : [],

                            })
                            user.projects = ProjectsAndPerms;
                            const  accessToken = jwt.sign(user,  process.env.ACCESS_TOKEN_SECRET);
                            resolve(accessToken)
                            req.body.token = accessToken;
                            console.log("JW token successfully generated");

                        }

                    })
                        .catch((err)=>{
                            console.log("Preparing JW token: failed to get all projects of user :",err);
                        })
                }
                console.log("Preparing JW token: failed to find user by email...");

            }).catch((err)=>{
            reject("token generation failed")
        })
    })
}


async function updateToken(req,res,next){

    console.log("AuthenticatingToken")
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log(jwt.decode(token))
    //res.send();


}

module.exports = {
    authenticateToken,
    generateToken,
    updateToken,

}