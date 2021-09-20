import isAcyclic from "./DAG";

var jsgraph = require('js-graph-algorithms') ;// {TopologicalSortShortestPaths,WeightedDiGraph,Edge} from 'js-graph-algorithms' ;

class GraphManager{
  /**
   * @member {Object} graph - the graph representation of project. 
   * */ 
    graph = {
      nodes:[] ,
      edges: []
    } ; 

    /**
     * @member {Object} adjacencyList - adjacency representation of the graph 
     * 
    */
    adjacencyList = {} ; 

    // criticalGraph = {} ;// jsgraph.WeightedDiGraph(0) ;

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
    addAdjacencyEdge(source,target){
      if (!this.adjacencyList[source]){
        this.addVertex(source) ;
      }

      if (this.adjacencyList[source].indexOf(target)<0){
        this.adjacencyList[source].push(target) ;
      }
      // this.adjacencyList[source].sort((a,b)=>a-b) ;

    }

    editNodeCriticality=(nodeId,critical)=>{
      var nodeFound = this.graph.nodes.filter(node => node.id === nodeId) ;
      if (nodeFound.length){
        nodeFound[0][`critical`]=critical ;
        return true ;
      }
      else{
        return false ;
      }
    }

    createTraversableGraph =()=>{
      this.adjacencyList = {} ;
      const nodes = this.graph.nodes ;
      const edges = this.graph.edges ;

      if (nodes !== undefined && edges !== undefined){
        for (let x of nodes.map(node => node.id)){
          this.addVertex(x) ;
          const edgesFiltered = this.graph.edges.filter((edge,index) =>{
            let y = {...edge} ;
            y['color'] ='#080' ;
            this.graph.edges[index] = y ;
          
            if ( edge.from=== x){
              return y ;
            }
            else{
              return false ;
            }
          }) ;

          edgesFiltered.forEach((y)=>{
            this.addAdjacencyEdge(x,y.to) ;
          }) 
          
          
        }
      }
    }

    pathFromBFS= (start)=>{
      this.createTraversableGraph() ;
      //bfs -- queue ;FIFO
      var queue = [start] ;
      var paths = [] ;
      var result = [] ; 
      var visited = {} ;
      visited[start] = true ;
      let currVertex ;
      while (queue.length){
        currVertex = queue.shift() ;
        if (currVertex !== undefined){
         console.log('curr',currVertex) ;

        let currNode = this.graph.nodes.find(n=>n.id === currVertex ) ;
        //  console.log('currNode',currNode) ;

          if ( currNode !== undefined){
            if ( currNode.critical){
              currNode.color = '#880' ;
              // console.log('path',path,currVertex) ;
              paths.push(currNode.id) ;
            }
          }
        //  console.log('prev',result[result.length-1],'curr',currVertex) ;
          result.push(currVertex) ;
          this.adjacencyList[currVertex].forEach((neighbor)=>{
            if (!visited[neighbor]){
              visited[neighbor] = true ;
              queue.push(neighbor) ;
            }
          })
        }
      }
      // console.log('adja',this.adjacencyList) ;

      return {
        paths: paths,
        result:result };

    }

    findShortestPath=(end)=>{
      const numVertex = this.graph.nodes.length ;

      var criticalGraph = new jsgraph.WeightedDiGraph(numVertex) ;

      if (criticalGraph !== undefined){
        // delete this.criticalGraph ;
      
        for (let edge of this.graph.edges){
          const from = parseInt(edge.from.substr(1,edge.from.length-1)) ;
          const to = parseInt(edge.to.substr(1,edge.to.length-1)) ;
          // let newE = new jsgraph.Edge(from,to,10) ;
          // console.log('add',from,'to',to) ;
          criticalGraph.addEdge(new jsgraph.Edge(from,to,10)) ;
        }
        const endNumber = parseInt(end.substr(end.length-1)) ;
        var critical = new jsgraph.Dijkstra(criticalGraph,0) ;
        // console.log('endo',endNumber,critical) ;

        if (critical.hasPathTo(endNumber)){
          var path = critical.pathTo(endNumber) ;
          // console.log('path to',path,endNumber) ;
          return path ;
        }
        else{
          return [] ;
        }
    }
    }

    findFromTraversable= async (endNode)=>{
      // console.log('finding from traversable')

      let result = [] ;
      let found = false;
      let queue = ['n0'] ; 
      let visited = [] ;
      while(found === false && queue.length){
        let curr = queue.shift() ;
        visited.push(curr) ;
        if (this.adjacencyList[curr].indexOf(endNode)>=0){
          found = true ;
            // console.log('push',endNode,visited)

          result.push(endNode)
        }
        else{
          for (let v of this.adjacencyList[curr]){
            if (visited.indexOf(v)<0){
              queue.push(v) ;
            }
          }
          console.log('push',curr)

          result.push(curr)
        }
      }
      // console.log('found?',found)

      if (found){
        return result ;
      }
      else{
        return ['n0'] ;//was't found
      }
    }

    pathFromDFS =(start)=>{
      this.createTraversableGraph() ;
      var visited = {} ;
      for ( let node of Object.keys(this.adjacencyList)){
        // console.log('Node:',node)
        visited[node] = false ;
      }

      var paths =[] ; //Array of array , will return path to all critical nodes. 

      let stack = [] ;
      stack.push(start) ;
      var result = [] ;
      while(stack.length !== 0){
        let s = stack.pop() ;
        if (s !== undefined){
          if (visited[s] === false){
            result.push(s) ;
            visited[s] = true ;
            var currNode = this.graph.nodes.find(node => node.id === s ) ; 
            if (currNode !== undefined && !currNode.critical){
              // console.log('not critical')
            }
            else{
              // console.log(' critical',result)
              //create path
              let c = result.pop() ; 
              let temp = [] ; 
              while (c !== start){
                temp.unshift(c) ; 
                c = result.pop() ;
              } 
              temp.unshift(start) ;
              paths.push(temp) ;
              result.push(start) ; 

            }
          }
          for (let neighbor of this.adjacencyList[s]){
            if (!visited[neighbor]){
              stack.push(neighbor) ; 

            }
          }

        }
      }
      // console.log('Result' ,paths)
      return paths ; 
    }
 

    highlightGraphCritical=()=>{
        var internalBFS = this.pathFromBFS('n0') ;
        var paths = internalBFS.paths ;
        // console.log('color to node',paths)
        let ans = paths.length ; 
        let color = [] ;
        if (ans){
          for (let node of paths){
            let path = this.findShortestPath(node) ;
            color.push(path) ;
          }
        // console.log('color the nodes',color) ;
        this.changeEdgeColor(color,'#880')

          return color.length ;
          //edit the color to red
          // const colorEdges = this.graph.edges.map((value)=>{
          //   var del = path.indexOf(value.to) ;
          //   if (value.from === 'n0'){
          //     if (del>=0){
          //       path = path.splice(del,1) ;
          //       let newE = {...value} ; 
          //       newE['color'] = '#200' ;
          //       // console.log('colored edge', newE)
          //       return newE ;
          //     }
          //     else{
          //       return value
          //     }
          //   }
          //   else{
          //     if (del>=0){
          //       let newE = {...value} ; 
          //       newE['color'] = '#200' ;
          //       // console.log('colored edge', newE)
          //       return newE ; 
          //     }
          //     else{
          //       return value

          //     }
          //   }
          // }) ;

          


          // this.graph.edges = colorEdges ;
          // return true ;

        }
        
        /**
         * @returns ans - number of critical nodes paths , if start node not connected it reurns -1
         */
        if (internalBFS.result.length > 1){
          return color.length ;
        }
        else{
          return -1;
        }
        

    }

    removeEdge=(source,target)=>{
      this.adjacencyList[source] = this.adjacencyList[source].filter(vertex =>
        vertex !== target 
      ) ;
    }

    removeVertex=(vertex)=>{
      while(this.adjacencyList[vertex]){
        const adjacentVertex = this.adjacencyList[vertex].pop() ;
        this.removeEdge(vertex,adjacentVertex) ;
      }
      delete this.adjacencyList[vertex] ;
    }

    changeColor=(id,color)=>{
      var nodes = this.graph.nodes ;
      if (nodes && Array.isArray(nodes)){
        let ind = -1 ;
        let found = nodes.find((value,i)=>{if (value.id === id){
          ind = i ;
          return value ; 
        }}) ;
        if (found && ind >= 0 ){
          found.color = color ;
          nodes.splice(ind,1,found) ;
          this.graph.nodes = nodes ;
          return 1 ;
        }
      }
      return 0 ; 
    }
    /**
     * @param colorArray - an array of egdes to color
    */
    changeEdgeColor = (colorArray,color) =>{
      var edges = this.graph.edges ;
      if (Array.isArray(edges)){
        // let criticalEdge = edges.map((value)=>{
        //   if (value)
        //   return value ; 
        // })
      
        for (let path of colorArray){
          for (let edg of path){
            let ind = edges.find(value=>value.from === `n${edg.from()}` &&
            value.to === `n${edg.to()}`) ;
            ind.color = color ;
          // console.log('color e',ind)

          }
        }
      }
    }
  
    setGraph = (graph)=>{
      console.log('MGR set old:',this.graph,'new:',graph) ;

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
      // console.log('MGR get',this.graph)
      return this.graph ;
    }

    showNodeList(){
      var nodes = this.graph.nodes ; 
      if(nodes.length <= 0){
        // console.log('Nothing in the Array') ; 
      }
      else{
        console.log(`${nodes.length} Nodes`)
      }
    }

    addEdge=(src,tgt)=>{
     
      let edgeId = 1;
      let edgeAlreadyInGraph = false ;
      let allIds = this.graph.edges.map((value)=>{
        if (value.from === src && value.to ===tgt ){
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
              from:src, 
              to:tgt,
              label:`${ src} to ${tgt}` ,
              color:'#000',
              width:7
          }
        let nameSrc = this.graph.nodes.find(v=>v.id === src) ;
        let nameTgt = this.graph.nodes.find(v=>v.id === tgt) ;
        if(nameSrc !== undefined && nameTgt !== undefined){
              edg["label"] = `${ nameSrc.label} to -> ${nameTgt.label}` ;
        }
          this.graph.edges.push(edg) ; 
  
        if (!isAcyclic(this.graph)){   
          this.graph.edges.pop() ; 
          
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
            if (edge.from === id ){
              return false
            }
            else if ( edge.to === id){
              return false ;
            }
            else{
              return true ;

            }
          }) ;
          // console.log('new edges',newEdges)
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
        // add the node and give it an id
        var curr = this.graph ; 
        var obj = {
            label:fromTask.label , // give it lable fromTask
            size:20,
            critical:fromTask.critical
        }; 
      // console.log('Manager:addNode',fromTask,obj) ; 

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
            obj["color"] = '#f00000' ; //following nodes are blue
            if (len % 2 === 0){
                obj["x"] = 2*len ; 
                obj["y"] = -2*len ;
            }
            else{
                obj["x"] = 2*len ; 
                obj["y"] = 15*len ;
            }
        }
        else{
            // add node with edge depending on self
            let startNode = {...obj}

            obj["id"]= `n1` ;
            obj["color"] = '#ea0000' ; //start is red
            obj["x"] = 0 ; 
            obj["y"] = 0 ;

            startNode["id"]= `n0` ;
            startNode["color"] = '#900' ; //start is red
            startNode["x"] = 0 ; 
            startNode["y"] = -160 ;
            startNode["critical"] = false ;
            startNode["label"] = 'Start' ;
            this.graph.nodes.push(startNode) ;
        }
        
        this.graph.nodes.push(obj) ;
        // console.log('Manager:',this.graph) ; 
      
    }

    updatePosition=(nodeID,x,y)=>{
      let ind = -1 ;
      let node = this.graph.nodes.find((value,i)=>{if (value.id === nodeID){
        ind = i ;
        return value ; }}) ; 
      if (node && ind >=0 ){
        node.x =  x ; 
        node.y = y ;
        this.graph.nodes[ind] = node ;
        return 1 ;
      }
      return 0 ; 
    }
    
}

export default GraphManager ;

// for (let i = 0 ; i < path.length-1 ; i++){
          //   let source = path[i] ;
          //   let tar = path[i+1] ;
          //   let ind = -1 ;
          //   let colorEdge = this.graph.edges.find( (edge,index)=>{
          //     ind = index ;
          //     if (edge.from === source && edge.to === tar){
          //       return edge ;
          //     }
          //     else{
          //       return undefined
          //     }
          //   } ) ; 
          //   if (colorEdge !== undefined && ind>=0){
          //     colorEdge.color = '#200' ;
          //     this.graph.edges[ind] = colorEdge ;
          //     // console.log('Auth',this.graph.edges[ind],'after update')
          //   }
          //   // console.log('Auth',this.graph.edges[ind],'after update')

          // }