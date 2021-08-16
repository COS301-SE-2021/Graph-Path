
function isAcyclic(graph)
{

    if (JSON.stringify(graph) === '{}')
    {

        return true
    }



    else if (graph.nodes.length == 0)
    {
        return true;
    }


    else
    {

        let stack = [];
        let Nodes = SetNodes(graph);


        for( let i = 0 ; i < Nodes.length ; i ++)
        {

            if(isAcyclicRec(Nodes[i],stack,Nodes))
            {

                //console.log("Graph is not DAG");
                return false;
            }
        }

        //console.log("Graph is  DAG");
        return true;


    }


}

function isAcyclicRec(node,stack,Nodes)
{

    if(isNodeInStack(node,stack))
        return true;

    if(node.isVisit === true)
        return false;

    VisitNode(node.id,Nodes);
    stack.push(node);

    let children = node.adjacent;
    for( let i =0 ; i  < children.length ; i++)
    {

        if(isAcyclicRec(getNodeByID(children[i],Nodes),stack,Nodes))
            return true;
    }
    removeNodeFromStack(node,stack);
    return false;


}

function SetNodes(graph)
{
    let Nodes = [];
    let Edges = graph.edges;

    // setting the Nodes data Structure
    for( let i = 0 ; i < graph.nodes.length; i++ )
    {
        let NodeObj = {
            id: graph.nodes[i].id,
            adjacent : [],
            weight: 0,
            isVisit: false,
        }
        Nodes.push(NodeObj);

    }

    // setting Adjacent Nodes neighbours
    for( let i =0 ; i < Edges.length ; i ++)
    {

        let sourceID = Edges[i].source;
        let targetID = Edges[i].target;
        let TargetNode = getNodeByID(targetID,Nodes);
        for( let k = 0 ; k < Nodes.length ; k ++)
        {
            if( Nodes[k].id == sourceID)
            {
                Nodes[k].adjacent.push(TargetNode.id);
            }
        }

    }

    return Nodes;

}

function getNodeByID(id,Nodes)
{
    for( let i =0 ; i < Nodes.length; i ++)
    {

        if(Nodes[i].id == id)
        {

            return Nodes[i];
        }
    }


}

function isNodeInStack(node, stack)
{

    return stack.includes(node);
}

function removeNodeFromStack(node,stack)
{

    for( let i =0 ; i < stack.length ; i ++)
    {

        if(stack[i] == node)
        {
            stack[i] =null;
        }
    }

}

function VisitNode(id, Nodes)
{

    for( let i =0 ; i < Nodes.length; i ++)
    {

        if(Nodes[i].id === id)
        {

            Nodes[i].isVisit = true;
            return;
        }
    }

}


module.exports = {
    isAcyclic
}
