
import React from 'react';
import '../css/NewProject.css' ;

import {Sigma, RandomizeNodePositions, RelativeSize, EdgeShapes,NodeShapes} from 'react-sigma' ; //,ForceAtlas2,LoadGEXF,Filter

class GrapExample1 extends React.Component{
  
  render(){
    let graph = {
      nodes:[{id:"n1",label:"Task A"},{id:"n2",label:"Task B"},{id:"n3",label:"Task C"}],
      edges:[{id:"e1",source:"n1",target:"n2",label:"AB"},{id:"e2",source:"n2",target:"n3",label:"BC"}]
    }
    return (
      <div className="exampleProject">
        
        <div className="Graph1">
          <Sigma graph={graph} style={{position:"relative", 
          width:"200px" , height:"150px" }}
          onOverNode={e => console.log("Mouse over node: " + e.data.node.label)}
          settings={{drawEdges: true, clone: false}}>
            <RelativeSize  initialSize={550}/>
            <RandomizeNodePositions x1={200} y1={1000} x2={600} y2={900}/>        
          </Sigma>
        </div>

        <div className="Graph2">
        <Sigma graph={graph} style={{position:"relative", 
          width:"200px" , height:"150px" 
          }} renderer="canvas" settings={{ clone: false}}>
          <EdgeShapes default="arrow" style={{width:"200"}}/>
          <NodeShapes default="star"/>
          <RelativeSize initialSize={10}/>  
          <RandomizeNodePositions/>

        </Sigma>
        </div>
      </div>
    );
  }
}

export default GrapExample1 ;