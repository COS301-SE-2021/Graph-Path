
import React from 'react';
import '../css/NewProject.css' ;
import {Sigma, RandomizeNodePositions, RelativeSize, EdgeShapes,LoadGEXF,NodeShapes,ForceAtlas2,Filter} from 'react-sigma' ;
class GrapExample1 extends React.Component{
    
  render(){
    let graph = {
      nodes:[{id:"n1",label:"A"},{id:"n2",label:"B"}],
      edges:[{id:"e1",source:"n1",target:"n2",label:"AB"}]
    }
    return (
      <div className="exampleProject">
        
        <div className="Graph1">
          <Sigma graph={graph} style={{position:"relative", 
          width:"200px" , height:"150px" }}
          onOverNode={e => console.log("Mouse over node: " + e.data.node.label)}
          settings={{drawEdges: true, clone: false}}>
            <RelativeSize  initialSize={15}/>
            <RandomizeNodePositions/>        
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