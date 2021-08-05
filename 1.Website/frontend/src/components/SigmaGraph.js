
import React from 'react';
import '../css/Graph.css' ;
import {Sigma, EdgeShapes,NodeShapes} from 'react-sigma' ; //,ForceAtlas2,LoadGEXF,Filter
// import Dagre from 'react-sigma/lib/Dagre' ;
import {DragNodes,} from 'react-sigma';


class GraphPathManager extends React.Component{
  // constructor(props){
  //   super(props) ;
    // props.sigma.graph.addNode
    // this.addNodeToGraph = this.addNodeToGraph.bind(this) ;
    // this.props.sigma.bind("click",this.addNodeToGraph)
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
      <button onClick={e =>this.addNodeToGraph(e)}>
      addNode
    </button>
    </div>
    
    )
  }
}

class GrapExample2 extends React.Component{  
  // constructor(props){
  //   super(props) ;
  //   this.state = {
  //     graphs : []
  //   }
  // }
  
  rightClickNode = (event) =>{
    // alert('cliked'+event.data.node.label);
    console.log(event) ;
    if (event.data.captor.ctrlKey){
      alert('control')
     }

  }
  
  
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
            onClickNode={e => this.rightClickNode(e)}
            onClickEdge={ e => this.rightClickNode(e)}
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
              <GraphPathManager label={"C1"} />
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