
import React from 'react';
// import '../css/NewProject.css' ;
import {Sigma, RandomizeNodePositions, RelativeSize, EdgeShapes,LoadGEXF,NodeShapes,ForceAtlas2,Filter} from 'react-sigma' ;
class GrapExample2 extends React.Component{
  constructor(props){
    super(props) ;
    this.state = {
      graphs : []
    }
  }
    
  render(){
    console.log( this.props) ;
    const graph = this.props.graphToDisplay ; 
    console.log(graph) ;
    return (
      <div className="exampleProject">
        
        <div className="Graph1">
          <Sigma graph={graph} style={{position:"relative", 
          width:"200px" , height:"150px" }}
          onOverNode={e => console.log("Mouse over node: " + e.data.node.label)}
          settings={{drawEdges: true, clone: false}}>
            <EdgeShapes default="arrow" style={{width:"200"}}/>
            <NodeShapes default="star"/>
            <RelativeSize  initialSize={550}/>
            <RandomizeNodePositions x1={200} y1={1000} x2={600} y2={900}/>        
          </Sigma>
        </div>

      </div>
    );
  }
}

export default GrapExample2 ;