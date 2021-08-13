const {ObjectID: ObjectId} = require("mongodb");

async function getProjectGraph(DBcontroller ,id)
{


    let db =  DBcontroller.getConnectionInstance()
    return await new Promise((resolve, reject)=>{
        db.collection('Projects').findOne({
            "_id": ObjectId(id)
        })
            .then((ans)=>{
            console.log("Found");
            resolve(ans);
        })
            .catch(err=>{
                reject(err);
            })
    })



}


function updateNodesID(Project)
{
    let nodes = Project.graph.nodes;
    for( var i = 0 ; i < nodes.length ; i ++)
    {
        let node = nodes[i];
        node.uniqueID = Project['_id']+"_"+node.id;
        Project.graph.nodes[i] = node;

    }
    return Project;

}


function getNodes(Project)
{
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


function getTasks(Nodes)
{


}


module.exports = {
    getProjectGraph,
    getNodes,
    updateNodesID,
}