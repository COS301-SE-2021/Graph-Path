const {ObjectID: ObjectId} = require("mongodb");

async function getProjectGraph(DBcontroller ,id) {

    let db =  DBcontroller.getConnectionInstance();
    return await new Promise((resolve, reject)=>{
        db.collection('Projects').findOne({
            "_id": ObjectId(id)
        })
            .then((ans)=>{
            resolve(ans);
        })
            .catch(err=>{
                reject(err);
            })
    })



}

async function updateNodesID( DBcontroller,Project) {
    if(Project !== {})
    {
        let db =  DBcontroller.getConnectionInstance();

        let nodes = Project.graph.nodes;
        for( var i = 0 ; i < nodes.length ; i ++)
        {
            let node = nodes[i];
            node.uniqueID = Project['_id']+"_"+node.id;
            Project.graph.nodes[i] = node;


        }
       db.collection('Projects').updateOne({
           "_id": ObjectId(Project['_id'])
       },{
           $set:{graph:Project.graph}
       })
           .then((ans)=>{
               console.log("updated: ",Project['_id']);
               return true;
           })
           .catch((err)=>{
               console.log(err);
               return false;
           })


    }

    return Project;

}

function mapTaskToNode(DBcontroller,Task,Node) {
    let db =  DBcontroller.getConnectionInstance();
    db.collection('Tasks').updateOne({
        "_id": ObjectId(Task['_id'])
    },{
            $set:{nodeID:Node.uniqueID}
        })
        .then((result)=>{
            console.log("mapped Task to Node ")
            return "mapped Task to Node";
        })
        .catch((err)=>{
            console.log("failed to map task to Node");
            return "failed to mapTask to Node";
        })
}

function getNodes(Project) {
    let nodes = Project.graph.nodes;
    let returnedObj = [];
    if(nodes.length == 0)
    {
        return returnedObj;
    }
    else{

        for( var i = 0 ; i < nodes.length ; i ++) {
            let node = nodes[i];
            returnedObj.push({
                label: node.label,
                id: node.id,
                uniqueID : node.uniqueID,
            })

        }
        return returnedObj;

    }

}

async function getTasks(controller , Nodes) {
    //------get All Nodes uniqueIDs--------------------
    let db = controller.getConnectionInstance();
    let uniqueIDs = [];
    for (let i = 0; i < Nodes.length; i++) {
        uniqueIDs.push(Nodes[i].uniqueID);
    }

    console.log(uniqueIDs);
    //------get All Tasks with uniqueIDs--------------------
    return await new Promise((resolve, reject) => {
        db.collection('Tasks').find({}).toArray()
            .then((tasks) => {

                if (tasks.length == 0) {
                    resolve("Tasks collection empty");
                } else {

                    let AllTasks = [];
                    for (var i = 0; i < tasks.length; i++) {

                        //console.log("ln 109: ",tasks[i].nodeID);
                        if (uniqueIDs.includes(tasks[i].nodeID)) {

                            AllTasks.push(tasks[i]);
                        }

                    }

                    resolve(AllTasks);

                }

            })
            .catch((err) => {
                console.log("error has occurs:", err)
                reject("error getting tasks");
            })


        //return "get Task failed";

    })
}

function splitTasksByStatus(Tasks) {
    let InProgress = [];
    let Complete = [];
    let NotStarted =[];

    for(let i = 0 ; i < Tasks.length ; i++)
    {
        if(Tasks[i].status ==="complete")
        {
            const customTaskCard = {
                status: Tasks[i].Status,
                description: Tasks[i].description,
                issueDate: Tasks[i].issued,
                DueDate: Tasks[i].due,
                TaskUniqiueID:Tasks[i]["_id"] ,
                NodeID: Tasks[i].nodeID,
                Assignee: Tasks[i].assignee,
            }
            Complete.push(customTaskCard);
        }

        else if(Tasks[i].status ==="in-progress")
        {
            const customTaskCard = {
                status: Tasks[i].Status,
                description: Tasks[i].description,
                issueDate: Tasks[i].issued,
                DueDate: Tasks[i].due,
                TaskUniqiueID:Tasks[i]["_id"] ,
                NodeID: Tasks[i].nodeID,
                Assignee: Tasks[i].assignee,
            }
            InProgress.push(customTaskCard);
        }

        else if(Tasks[i].status ==="not started")
        {
            const customTaskCard = {
                status: Tasks[i].Status,
                description: Tasks[i].description,
                issueDate: Tasks[i].issued,
                DueDate: Tasks[i].due,
                TaskUniqiueID:Tasks[i]["_id"] ,
                NodeID: Tasks[i].nodeID,
                Assignee: Tasks[i].assignee,
            }
            NotStarted.push(customTaskCard);
        }

    }
    let total = Complete.length + InProgress.length + NotStarted.length;
    let completePercentage,inProgressPercentage,notStartedPercentage;
    if(total == 0)
    {
        completePercentage = 0.0;
        inProgressPercentage = 0.0;
        notStartedPercentage= 0.0;
    }
    else
    {
        completePercentage = (Complete.length/total);
        inProgressPercentage = ( InProgress.length/total);
        notStartedPercentage = (NotStarted.length/total);


    }


    return {
        stats:{
            completePercent : completePercentage,
            inProgressPercent: inProgressPercentage,
            notStartedPercent: notStartedPercentage

        },
        completeTasks : Complete,
        inProgressTasks: InProgress,
        notStartedTasks : NotStarted,
    }

}




module.exports = {
    getProjectGraph,
    getNodes,
    updateNodesID,
    getTasks,
    mapTaskToNode,
    splitTasksByStatus,

}

/* notes: Now we need to include the uniqueNode ID for every task*/