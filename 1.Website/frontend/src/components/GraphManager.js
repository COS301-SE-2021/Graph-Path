import isAcyclic from "./DAG";

class GraphManager{
    constructor(graph){
      if (graph === undefined || graph.nodes === undefined || graph.edges === undefined){
        this.setGraph({}) ;
      }
      else{
        this.graph = graph ;
      }
      this.adjacencyList = {} ;
    }

    addVertex=(vertex)=>{
      if (!this.adjacencyList[vertex]){
        // if it does not exist
        this.adjacencyList[vertex] = [] ;
      }
    }
    addEdge(source,target){
      if (!this.adjacencyList[source]){
        this.addVertex(source) ;
      }

      this.adjacencyList[source].push(target) ;
    }

    pathFrom=(start)=>{
      //bfs -- queue ;FIFO
      var queue = [start] ;
      var result = [] ; 
      var visited = {} ;
      visited[start] = true ;
      let currVertex ;
      while (queue.length){
        currVertex = queue.shift() ;
        if (currVertex !== undefined){
          result.push(currVertex) ;
          this.adjacencyList[currVertex].forEach((neighbor)=>{
            if (!visited[neighbor]){
              visited[neighbor] = true ;
              queue.push(neighbor) ;
            }
          })

        }
        
      }
      return result ;

    }

    removeEdge=(source,target)=>{
      this.adjacencyList[source] = this.adjacencyList[source].filter((vertex)=>{
        vertex !== target 
      }) ;
    }

    removeVertex=(vertex)=>{
      while(this.adjacencyList[vertex]){
        const adjacentVertex = this.adjacencyList[vertex].pop() ;
        this.removeEdge(vertex,adjacentVertex) ;
      }
      delete this.adjacencyList[vertex] ;
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
      const oldGraph = {
        nodes:[...this.graph.nodes] ,
        edges:[...this.graph.edges]
      } 
      const copy = Object.assign({},this.graph) ;
      let edgeId = 1;
      let edgeAlreadyInGraph = false ;
      let allIds = this.graph.edges.map((value)=>{
        if (value.source === src && value.target ===tgt ){
          edgeAlreadyInGraph = true ;
        }
        return value.id ;
      });

      if (edgeAlreadyInGraph === true){
        //edge exists
        return 2 ;
      }
      else{
        while (allIds.indexOf(`e${edgeId}`)>=0){
          edgeId = edgeId+1 ;
        }
  
        var edg = {
              id:`e${edgeId}`, // give edge an id
              source:src, 
              target:tgt,
              label:`${ src} to ${tgt}` ,
              color:'#080',
              size:1,
          }
          edg["read_cam0:size"] = 4
          
          // this.graph.edges.push(edg) ; 
          copy.edges.push(edg) ;
  
        if (!isAcyclic(copy)){     
          this.graph = oldGraph ;
          //cyclic edge
          return 0 ;
        }
        else{
        //  this.graph = copy ; 
          //true - add 
          return 1 ;
        }
  
      }

      
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
        var newGraph = {nodes:[],edges:[]} ;
        newGraph.nodes = newNodes ;
        if (this.graph.edges.length>0){
          var newEdges = this.graph.edges.filter((edge)=>{
            if (edge.source === id ){
              return false
            }
            else if ( edge.target === id){
              return false ;
            }
            return true ;
          }) ;
          console.log('new edges',newEdges)
            newGraph.edges = newEdges ;
            this.graph = newGraph ;
          return true ;
          
        }
        else{

          this.graph = newGraph ;
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
      console.log('Manager:addNode',fromTask) ; 
        // add the node and give it an id
        var curr = this.graph ; 
        var obj = {
            label:fromTask , // give it lable fromTask
            size:300,
        }; 
        // if there was already a node?
        let len = curr.nodes.length ;
        if (len>0){
            let nodeId = 1;
            let allIds = this.graph.nodes.map((value)=>{
              return value.id ;
            })
            while (allIds.indexOf(`n${nodeId}`)>=0){
              nodeId = nodeId+1 ;
            }

            obj["id"]= `n${nodeId}` ;
            obj["color"] = '#0000ff' ; //following nodes are blue
            if (len % 2 === 0){
                obj["x"] = 15*len ; 
                obj["y"] = 15*len ;
            }
            else{
                obj["x"] = -15*len ; 
                obj["y"] = -15*len ;
            }
        }
        else{
            // add node with edge depending on self
            obj["id"]= `n1` ;
            obj["color"] = '#ff0000' ; //start is red
            obj["x"] = 0 ; 
            obj["y"] = 0 ;

        }
        
        this.graph.nodes.push(obj) ;
        // console.log('Manager:',this.graph) ; 
      
    }
}

export default GraphManager ;