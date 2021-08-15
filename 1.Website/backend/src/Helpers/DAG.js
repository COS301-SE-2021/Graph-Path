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
