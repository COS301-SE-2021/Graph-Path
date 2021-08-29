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
    console.log("Preparing JW token")
    const email = req.body.email;
    return await new Promise((resolve, reject)=>{
        userManagementService.getUserByEmail(db,email)
            .then((result)=>{
                if(result !== "user not found" || (result !== "ServerDB")){
                    const user = {
                        username : result.firstName,
                        lastName : result.lastName,
                        username : result.username,
                        email    : result.email
                    }

                    ProjectManagerService.getAllProjectsByUserEmail(db ,email).then((projects)=>{
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

                        }

                    })


                }

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