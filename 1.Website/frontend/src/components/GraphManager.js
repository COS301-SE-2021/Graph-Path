
class GraphManager{
    constructor(graph){
      if (graph === undefined || graph.nodes === undefined || graph.edges === undefined){
        this.setGraph({}) ;
      }
      else{
        this.graph = graph ;
      }
    }
  
    setGraph = (graph)=>{
      if (Array.isArray(graph.nodes) && Array.isArray(graph.edges) ){
        this.graph = graph ;
      }
      else{
        this.graph = {
            nodes : [],
            edges : []
        }
      }
    }
    getGraph=()=>{
      return this.graph ;
    }
    showNodeList(){
      var nodes = this.graph.nodes ; 
      if(nodes.length <= 0){
        console.log('Nothing in the Array') ; 
      }
      else{
        console.log(`${nodes.length} Nodes`)
      }
    }
    addEdge=(src,tgt)=>{

        var edg ;
        var curr = this.graph ; 
        edg = {id:`e${curr.edges.length+1}`, // give edge an id
            source:src, 
            target:tgt,
            label:`${ src} to ${tgt}` ,
            color:'#080',
            size:1
        }
        curr.edges.push(edg) ;
    }

    removeNode = (id)=>{

      var newNodes = this.graph.nodes.filter((node)=>{
        if (node.id !== id){
          return true ;
        }
        return false ;
      }) ;
      if (this.graph.nodes.length === newNodes.length){
        return false ;
      }
      else{
        //delete edges where node with id is source || target
        if (this.graph.edges.length>0){
          var newEdges = this.graph.edges.filter((edge)=>{
            console.log('edge ')
            if (edge.source !== id || edge.target !== id){
              return true ;
            }
            return false ;
          }) ;
          this.graph.edges = newEdges ;
          this.graph.nodes = newNodes ;

          return true ;
          
        }
        else{
          this.graph.nodes = newNodes ;
          return true ;

        }

      };

    }

    removeEdgeWithEdgeId = (edgeId)=>{
      var edgesAfter = this.graph.edges.filter((edge)=>{
        if (edge.id !== edgeId){
          return true ;
        }
        return false ;
      }) ; 
      if (this.graph.edges.length === edgesAfter.length){
        return false ;
      }
      else{
        this.graph.edges = edgesAfter ;
        return true ;
      }
    }
    
    addNode = (fromTask) =>{
      // console.log('Manager:addNode') ; 
        // add the node and give it an id
        var curr = this.graph ; 
        var obj = {
            label:fromTask.taskName , // give it lable fromTask
            size:300,
        }; 
        // if there was already a node?
        let len = curr.nodes.length ;
        if (len>0){
            obj["id"]= `n${curr.nodes.length+1}` ;
            obj["color"] = '#0000ff' ; //following nodes are blue
            if (len % 2 === 0){
                obj["x"] = 15*len ; 
                obj["y"] = 15*len ;
            }
            else{
                obj["x"] = -15*len ; 
                obj["y"] = -15*len ;
            }
            curr.nodes.push(obj) ;
        }
        else{
            // add node with edge depending on self
            obj["id"]= `n1` ;
            obj["color"] = '#ff0000' ; //start is red
            obj["x"] = 0 ; 
            obj["y"] = 0 ;
            curr.nodes.push(obj) ;
        }
        console.log('Manager:',this.graph) ; 
      
    }
}

export default GraphManager ;