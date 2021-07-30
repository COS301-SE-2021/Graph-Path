import React from 'react' ; 
import Task from './Task' ;
import EdgeManager from './Edge';
import {Link,withRouter, Route, Switch} from 'react-router-dom' ;
// import '../css/Dashboard.css' ;

class GraphManager{
    constructor(graph){
      if (graph === undefined || graph.nodes === undefined || graph.edges === undefined){
        this.setGraph("") ;
      }
      else{
        this.graph = graph ;
      }
    }
  
    setGraph(graph){
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
    getGraph(){
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
            label:`${src} to ${tgt}` ,
            color:'#00ff00'
        }
        curr.edges.push(edg) ;
       
    }
    
    addNode = (fromTask) =>{
        // add the node and give it an id
        var curr = this.graph ; 
        var obj = {
            label:fromTask.taskName , // give it lable fromTask
            size:300,
        }; 
        // if there was already a node?
        if (curr.nodes.length>0){
            obj["id"]= `n${curr.nodes.length+1}` ;
            obj["color"] = '#0000ff' ;
            curr.nodes.push(obj) ;
        }
        else{
            // add node with edge depending on self
            obj["id"]= `n1` ;
            obj["color"] = '#ff0000' ; //start is red
            curr.nodes.push(obj) ;
        }
    }
}

class Node extends React.Component{
    constructor(props){
        super(props) ; 
        this.state ={
        }
        this.graphManager = null  ; 
    }

    componentDidMount(){
        this.graphManager = new GraphManager(this.props.graph)
        if (this.props.graph !== undefined){
            this.graphManager.setGraph(this.props.graph)
        }
    }
    addNewNode = (name)=>{
        this.graphManager.addNode(name) ; 
        this.updateParent(this.graphManager.getGraph()) ;
    }
    addNewEdge =(param1,param2)=>{
        this.graphManager.addEdge(param1,param2) ;
        this.updateParent(this.graphManager.getGraph()) ;
    }
    updateParent=(graph)=>{
        if (typeof this.props.updateGraph === 'function'){
            this.props.updateGraph(graph) ;
        }else{
            alert('Could not update graph') ;
        }
    }

    render(){
        const {match} = this.props ;
    
        return (
            <div>
                <div>
                    <Link to={`${match.url}/addNode`}>Add Nodes</Link><span> </span>
                    <Link to={`${match.url}/edges`}>Add Edges</Link>
                    <br/>
                </div>
                <Switch>
                    <Route path={`${match.url}/addNode`} >
                        
                        <Task addTask={this.addNewNode} 
                        />
                    </Route>
                    <Route path={`${match.url}/edges`}>
                        <EdgeManager graphToDisplay={this.props.graph}
                            addEdge={this.addNewEdge}
                        />
                    </Route>
                </Switch>
            
        </div>
        
        )
    }

    displayTask =()=>{
        alert(this.props.task) ;
    }
}

export default withRouter(Node) ;