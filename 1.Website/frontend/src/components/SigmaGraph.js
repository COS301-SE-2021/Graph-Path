
import React from 'react';
import '../css/Graph.css' ;
import {Sigma, EdgeShapes,NodeShapes} from 'react-sigma' ; //,ForceAtlas2,LoadGEXF,Filter
// import Dagre from 'react-sigma/lib/Dagre' ;
import {DragNodes,} from 'react-sigma';


class GraphMessage extends React.Component{
  // constructor(props){
  //   super(props) ;
  // }

  addNodeToGraph=(event)=>{
    console.log('clikcked',event)
    var sig = this.props.sigma ;
    if (sig !== undefined){
      console.log('add')
      sig.graph.addNode({id:`n${sig.graph.nodes.length+23}`, label:this.props.label})
    }
  }

  componentDidMount(){
    
  }
  render(){
    console.log(this.props.sigma.graph.nodes())
    return (
    <div>
      <div >
      {this.props.label}
    </div>
    </div>
    
    )
  }
}

class GrapExample2 extends React.Component{  
  constructor(props){
    super(props) ;
    this.state = {
      source:'Source Node',
      target:'Targert Node' 
    }
  }

  cleanUp = ()=>{
    this.setState({
      source:'Source Node',
      target:'Targert Node' 
    }) ;
  }

  addNewEdge =(param1,param2)=>{
    this.props.graphManager.addEdge(param1,param2) ;
    this.updateParent() ;
  }
  updateParent=()=>{
    if (typeof this.props.updateGraph === 'function'){
        this.props.updateGraph(this.props.graphManager) ;
    }else{
        alert('Could not Parent graph') ;
    }
}
  
  handleControlClick = (event) =>{
    // alert('cliked'+event.data.node.label);
    console.log(event) ;
    if (event.data.captor.ctrlKey){
      if (this.state.source === 'Source Node'){
        this.setState({
          source:event.data.node.id
        }) ;
      }
      else{
        this.setState({
          target:event.data.node.id
        }) ; 
        //save the information
        //send the information to make graph
        //update Graph
        //cleanup
        this.addNewEdge(this.state.source,this.state.target)
      }
      console.log(this.state)

    }
    else{
      this.cleanUp() ;
    }

  }
  /*When ctrl key is pressed and source node not set
  Then the selected node is source - 
  If source is set then the current node is target*/
  
  
  render(){
    var mgr = this.props.graphManager;
    console.log(' on mount', mgr) ;
    if (mgr !== undefined){
    

      const graph = mgr.getGraph() ; 
      if (graph !== undefined && graph.nodes !== undefined )
      var SigmaGraphkey =`${mgr.graph.nodes.length}${mgr.graph.edges.length}` ;

      return (
        <div className="exampleProject">
          <h6>{this.props.projectName}</h6>
          <div key={SigmaGraphkey} className="GraphBox">
            <Sigma renderer="canvas" graph={graph} className="SigmaParent" 
            style={{position:"relative", 
            width:"250px" , height:"250px" ,  border:"double 3px black" }}
            onOverNode={e => console.log("Mouse over node: " + e.data.node.label+" x:"+e.data.node.x+" y:"+e.data.node.y)}
            onClickNode={e => this.handleControlClick(e)}
            onClickEdge={ e => this.handleControlClick(e)}
            settings={{
              clone: false, // do not clone the nodes
              immutable:true,// cannot updated id of node
              // labelSizeRatio:1,
              labelThreshold:0.5,
              scalingMode:"inside",
              sideMargin:100,
              minNodeSize:3,
              maxNodeSize:10,
              minEdgeSize:20,
              maxEdgeSize:30,
              drawNodes:true, //draw node ?
              drawLabels:true, //node label
              drawEdges: true, //draw edge?
              drawEdgeLabels:true,
            }}>
              <EdgeShapes default="arrow"/>
              <NodeShapes default="def"/>
              {/* <RelativeSize  initialSize={200}/> */}
              {/* <Dagre directed={true} multigraph={false} compound={false}/> */}
              {/* <RandomizeNodePositions seed={2} />         */}
              <DragNodes />
              <GraphMessage label={this.state.source === 'Source Node'
              ?"Press and hold Ctrl , select source node":
              "Keep Holding Ctrl and select target node"} />
            </Sigma>
            {
              typeof this.props.sendGraphData === 'function'? //if there's a save option
              <button className="clickbtn" title="Save Current Graph" onClick={this.props.sendGraphData?
              this.props.sendGraphData : ()=>{console.log('failed save validation')}}>
              Save</button>:""
            }

          </div>
        </div>
      );
    }
    return (
      <div className="exampleProject">
        
        <div className="GraphBox">
          No Graph To Display, Please add Tasks
        </div>
      </div>
      )
  }
}

export default GrapExample2 ;

// var graph2 = {nodes:[
//   {label: "Number 1", size: 400, id: "n1"},
//   {label: "Number 2", size: 400, id: "n2"}
// ],
//   edges:[
//     {id: "e1", source: "n2", target: "n1", label: "n5 to n1"}
//   ]} ;


// changeSize=()=>{
//   var canv = document.querySelectorAll('canvas') ; 
//   var parent = document.querySelector('.sigma-scene') ;

//   if (canv.length > 0 && parent !== undefined && parent!== null){
//     canv.forEach((item,key,parentList)=>{
//       console.log(item.className, item) ;

//       item.style.width='100%' ;
//       item.style.height='100%' ;
//       // item.width = parent[0].clientWidth ; 
//       item.width = parent.clientHeight ;
//       item.height = parent.clientWidth ; 
      
//       console.log(item.className, item, 'parent',parent[1]) ;
//     })
//   }
// }