
import React from 'react';
import '../css/Graph.css' ;
import {Sigma, RelativeSize, EdgeShapes,NodeShapes} from 'react-sigma' ; //,ForceAtlas2,LoadGEXF,Filter
import Dagre from 'react-sigma/lib/Dagre' ;
import ReactSigmaLayoutPlugin from 'react-sigma/lib/ReactSigmaLayoutPlugin';
class GrapExample2 extends React.Component{  
  // constructor(props){
  //   super(props) ;
  //   this.state = {
  //     graphs : []
  //   }
  // }

  changeSize=()=>{
    var canv = document.querySelectorAll('canvas') ; 
    var parent = document.querySelector('.sigma-scene') ;

    if (canv.length > 0 && parent !== undefined && parent!== null){
      canv.forEach((item,key,parentList)=>{
        console.log(item.className, item) ;

        item.style.width='100%' ;
        item.style.height='100%' ;
        // item.width = parent[0].clientWidth ; 
        item.width = parent.clientHeight ;
        item.height = parent.clientWidth ; 
        
        console.log(item.className, item, 'parent',parent[1]) ;
      })
    }
  }
    
  render(){
    // console.log('props on mount', this.props) ;
    
    const graph = this.props.graphToDisplay ; 
    if (graph !== undefined && graph.nodes !== undefined )
    return (
      <div className="exampleProject">
        <h6>{this.props.projectName}</h6>
        <div className="GraphBox">
          <Sigma renderer="canvas" graph={graph} className="SigmaParent" 
          style={{position:"relative", 
          width:"250px" , height:"250px" ,  border:"double 3px black" }}
          onOverNode={e => console.log("Mouse over node: " + e.data.node.label)}
          settings={{drawEdges: true,
          drawLabels:true,
          // labelSizeRatio:1,
          labelThreshold:1,
          scalingMode:"inside",
          sideMargin:100,
          minNodeSize:3,
          minEdgeSize:2,
          maxNodeSize:10,
          drawNodes:true,sideMargin:2 ,
          clone: false}}>
            <EdgeShapes default="arrow" style={{width:"200px"}}/>
            <NodeShapes default="def"/>
            <RelativeSize  initialSize={200}/>
            <Dagre directed={true}/>
            {/* <RandomizeNodePositions seed={2} />         */}
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