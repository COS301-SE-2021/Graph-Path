function AuthoriseDeleteTask(req,res,next)
{
    console.log("checking permission to delete tasks")
    const userProjects = req.user.projects;
    const userProject = userProjects.filter(project => project.projectID === req.body.projectID);
    if( userProject){
        console.log(userProject[0])
        const permissions = userProject[0].permissions;
        if(permissions.includes("delete task")){
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
module.exports = {
    AuthoriseDeleteTask,
    AuthoriseKanbanBoard,
}