//delete tasks
//add members
//delete project
//update graph
//remove members
//update all project
//update projectOwner

function AuthoriseDeleteTask(req,res,next) {
    console.log("checking permission to delete tasks")
    const userProjects = req.user.projects;
    const userProject = userProjects.filter(project => project.projectID === req.body.projectID);
    if( userProject){
        console.log(userProject[0])
        const permissions = userProject[0].permissions;
        if(permissions.includes("delete task") || permissions.includes("owner") ){
            console.log("permitted to delete tasks")
            next()

        } else{
            console.log("delete task authorization failed")
            res.status(403).send({
                message: "Unauthorised to delete tasks",
            })
        }
    } else {
        res.status(403).send({
            message: "Not authorised to access current project"
        })
    }
}

function AuthoriseKanbanBoard(req,res,next){
    console.log("checking permission to convert project as kanbad board")
    const userProjects = req.user.projects;
    const userProject = userProjects.filter(project => project.projectID === req.body.projectID);
    if( userProject){
            console.log("permitted to delete tasks")
            next()

    } else {
        res.status(403).send({
            message: "Not authorised to access current project"
        })
    }

}

function AuthoriseAddMembers(req,res,next){
    console.log("checking permission to add members")
    const userProjects = req.user.projects;
    const userProject = userProjects.filter(project => project.projectID === req.body.projectID);
    if( userProject.length !==0 ){
        //console.log(userProject)
        const permissions = userProject[0].permissions;
        if(permissions.includes("add members") || permissions.includes("owner") ){
            console.log("permitted to add members")
            next()

        } else{
            console.log("add members authorization failed")
            res.status(403).send({
                message: "Unauthorised to add members",
            })
        }
    } else {
        res.status(403).send({
            message: "Not authorised to access current project"
        })
    }

}

function AuthoriseDeleteProject(req,res,next){
    console.log("checking permission to delete project")
    const userProjects = req.user.projects;
    const userProject = userProjects.filter(project => project.projectID === req.body.projectID);
    if( userProject){
        console.log(userProject[0])
        const permissions = userProject[0].permissions;
        if(permissions.includes("delete project") || permissions.includes("owner")){
            console.log("permitted to delete project")
            next()

        } else{
            console.log("delete project authorization failed")
            res.status(403).send({
                message: "Unauthorised to delete project",
            })
        }
    } else {
        console.log("delete project authorization failed")

        res.status(403).send({
            message: "Not authorised to access current project"
        })
    }

}

function AuthoriseUpdateGraph(req,res,next){
    console.log("checking permission to update projectGraph")
    const userProjects = req.user.projects;
    const userProject = userProjects.filter(project => project.projectID === req.body.projectID);
    if( userProject){
        console.log(userProject[0])
        const permissions = userProject[0].permissions;
        if(permissions.includes("update graph") || permissions.includes("owner")){
            console.log("permitted to update projectGraph")
            next()

        } else{
            console.log("update project graph authorization failed")
            res.status(403).send({
                message: "Unauthorised to unauthorised to update graph",
            })
        }
    } else {
        res.status(403).send({
            message: "Not authorised to access current project"
        })
    }

}

function AuthoriseRemoveMembers(req,res,next){
    console.log("checking permission to remove Members...")
    const userProjects = req.user.projects;
    const userProject = userProjects.filter(project => project.projectID === req.body.projectID);
    if( userProject){
        console.log(req)
        const permissions = userProject[0].permissions;
        if(permissions.includes("remove members") || permissions.includes("owner")){
            console.log("successfully permitted to remove members")
            next()

        } else{
            console.log("remove  project members authorization failed")
            res.status(403).send({
                message: "Unauthorised to remove members",
            })
        }
    } else {
        res.status(403).send({
            message: "Not authorised to access current project"
        })
    }

}

function AuthoriseUpdateAllProject(req,res,next){
    console.log("checking permission to update everything in a project")
    const userProjects = req.user.projects;
    const userProject = userProjects.filter(project => project.projectID === req.body.projectID);
    if( userProject){
        console.log(userProject[0])
        const permissions = userProject[0].permissions;
        if(permissions.includes("update graph") || permissions.includes("owner")){
            console.log("permitted to update all project")
            next()

        } else{
            console.log(" project update ALl authorization failed")
            res.status(403).send({
                message: "Unauthorised to update All project",
            })
        }
    } else {
        res.status(403).send({
            message: "Not authorised to access current project"
        })
    }


}

function AuthoriseUpdateProjectOwner(res,req,next){
    console.log("checking permission to update project Owner")
    const userProjects = req.user.projects;
    const userProject = userProjects.filter(project => project.projectID === req.body.projectID);
    if( userProject){
        console.log(userProject[0])
        const permissions = userProject[0].permissions;
        if(permissions.includes("update project owner") || permissions.includes("owner")){
            console.log("permitted to update projectOwner")
            next()

        } else{
            console.log("update project owner  authorization failed")
            res.status(403).send({
                message: "Unauthorised to update project owner",
            })
        }
    } else {
        res.status(403).send({
            message: "Not authorised to access current project"
        })
    }



}

function AuthoriseAddTask(req,res,next){
    console.log("checking permission to add a task...")
    const userProjects = req.user.projects;

    const userProject = userProjects.filter(project => project.projectID === req.body.projectID);
    if( userProject){
        console.log(userProject[0])
        const permissions = userProject[0].permissions;
        if(permissions.includes("add task") || permissions.includes("owner")){
            console.log("permitted to add task")
            next()

        } else{
            console.log("add task authorization failed")
            res.status(403).send({
                message: "Unauthorised to add task",
            })
        }
    } else {
        console.log("Unauthorised to access this project")
        res.send({
            message: "Not authorised to access current project"
        })
    }



}
function AuthoriseUpdateProjectAccessData(res,req,next){
    console.log("checking permission to everything in a project")
    const userProjects = req.user.projects;
    const userProject = userProjects.filter(project => project.projectID === req.body.projectID);
    if( userProject){
        console.log(userProject[0])
        const permissions = userProject[0].permissions;
        if(permissions.includes("update project lastDateAccessed") || permissions.includes("owner")){
            console.log("permitted to update project lastDateAccessed")
            next()

        } else{
            console.log("update project lastDateAccessed authorization failed")
            res.status(403).send({
                message: "Unauthorised to update project lastDateAccessed",
            })
        }
    } else {
        res.status(403).send({
            message: "Not authorised to access current project"
        })
    }



}

module.exports = {
    AuthoriseDeleteTask,
    AuthoriseAddTask,
    AuthoriseKanbanBoard,
    AuthoriseAddMembers,
    AuthoriseDeleteProject,
    AuthoriseUpdateGraph,
    AuthoriseRemoveMembers,
    AuthoriseUpdateAllProject,
    AuthoriseUpdateProjectOwner,
    AuthoriseUpdateProjectAccessData,
}