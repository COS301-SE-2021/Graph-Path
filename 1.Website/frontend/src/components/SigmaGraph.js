
import React from 'react';
import '../css/Graph.css' ;
import {Sigma, EdgeShapes,NodeShapes} from 'react-sigma' ; //,ForceAtlas2,LoadGEXF,Filter
// import Dagre from 'react-sigma/lib/Dagre' ;
import {DragNodes,} from 'react-sigma';
import {Redirect,withRouter} from 'react-router-dom' ;


class GraphMessage extends React.Component{
  // constructor(props){
  //   super(props) ;
  // }

  componentDidMount(){
  }
  render(){
    return (
    <div>
      <div >
      {this.props.label}
    </div>
    </div>
    
    )
  }
}

class SigmaGraph extends React.Component{  
  constructor(props){
    super(props) ;
    this.state = {
      source:'Source Node',
      target:'Targert Node',
      nodeId:"",
      nodeLabel:"" 
    }
  }

  componentDidMount(){
    this.setState({
      redirect:false
    })
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
  
  
  /*
  When ctrl key is pressed and source node not set
  Then the selected node is source - 
  If source is set then the current node is target
  If resulting edge is a loop - alert the user and discard changes
  If resulting edge exists - alert the user and discard changes
  */
  handleControlClick = (event) =>{
    // alert('cliked'+event.data.node.label);
    if (event.data.captor.ctrlKey){
      if (this.state.source === 'Source Node'){
        this.setState({
          source:event.data.node.id
        }) ;
      }
      else{
        if (this.state.source === event.data.node.id){
          alert('Cannot make edge to self')
        }
        else{  
          this.setState({
            target:event.data.node.id
          }) ; 
          this.addNewEdge(this.state.source,this.state.target)
        }
        //save the information
        //send the information to make graph
        //update Graph
        //cleanup
        this.cleanUp() ;

      }
      console.log(this.state)
    }
    else{

      if (this.state.source !== "Source Node"){
        this.cleanUp() ;
      }
      else{
        this.setState({
          nodeId:event.data.node.id ,
          nodeLabel:event.data.node.label,
          redirect:true
        }) ;
      }
    }

  }
  
  render(){
    const {match} = this.props ;
    var mgr = this.props.graphManager;
    // console.log(' on mount', mgr) ;
    if (mgr !== undefined){
    

      const graph = mgr.getGraph() ; 
      if (graph !== undefined && graph.nodes !== undefined )
      var SigmaGraphkey =`${mgr.graph.nodes.length}${mgr.graph.edges.length}` ;

      const nodeId = this.state.nodeId ; 
      const nodeLabel = this.state.nodeLabel ;
      return (
        <div className="graphContainer">
          <div>
          <span className="projName">{this.props.projectName}</span>
          {
              typeof this.props.sendGraphData === 'function'? //if there's a save option
              <button className="clickbtn" title="Save Current Graph" onClick={this.props.sendGraphData?
              this.props.sendGraphData : ()=>{console.log('failed save validation')}}>
              Save</button>:""
            }
          </div>
          
          <div key={SigmaGraphkey} className="GraphBox">

            <Sigma renderer="canvas" graph={graph} className="SigmaParent" 
            style={{position:"relative", 
            width:"50vw" , height:"65vh" ,  border:"double 3px black" , backgroundColor:'#E0E0E0'  }}
            onOverNode={e => console.log("Mouse over node: " + e.data.node.label+" x:"+e.data.node.x+" y:"+e.data.node.y)}
            onClickNode={e => this.handleControlClick(e)}
            onClickEdge={ e => console.log(e)}
            onOverEdge={(e)=>console.log('hover')}
            settings={{
              clone: false, // do not clone the nodes
              immutable:true,// cannot updated id of node
              // labelSizeRatio:1,
              labelThreshold:0.5,
              scalingMode:"inside",
              sideMargin:100,
              minNodeSize:3,
              maxNodeSize:10,
              minEdgeSize:1,
              defaultEdgeHoverColor:'#000',
              maxEdgeSize:4,
              drawNodes:true, //draw node ?
              drawLabels:true, //node label
              drawEdges: true, //draw edge?
              drawEdgeLabels:false,
              minArrowSize:10,
              enableEdgeHovering:true,
              edgeHoverPrecision:100
            }}>
              <EdgeShapes default="arrow"/>
              <NodeShapes default="def"/>
              {/* <RelativeSize  initialSize={200}/> */}
              {/* <Dagre directed={true} multigraph={false} compound={false}/> */}
              {/* <RandomizeNodePositions seed={2} />         */}
              <DragNodes />
              <GraphMessage  ref={this.bridge} label={this.state.source === 'Source Node'
              ?"Press and hold Ctrl , select source node":
              "Keep Holding Ctrl and select target node"} />
            </Sigma>
            {
             this.state.redirect 
              ?<Redirect to={`${match.url}/task/?id=${nodeId}&label=${nodeLabel}`} />  
              :""            
            }
          </div>
         </div>
      );
    }
    return (
      <div className="exampleProject">
        
        <div className="GraphBox">
          No Graph To Display, Please add Nodes
        </div>
      </div>
      )
  }
}

export default withRouter(SigmaGraph) ;

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