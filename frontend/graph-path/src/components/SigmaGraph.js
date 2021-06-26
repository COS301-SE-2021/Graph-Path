
import React from 'react';
import '../css/Graph.css' ;
import {Sigma, RandomizeNodePositions, RelativeSize, EdgeShapes,LoadGEXF,NodeShapes,ForceAtlas2,Filter} from 'react-sigma' ;
class GrapExample2 extends React.Component{
  constructor(props){
    super(props) ;
    this.state = {
      graphs : []
    }
  }

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

  componentDidMount(){
    this.setState({
      len:this.state.graphs.push(this.props.graphToDisplay)
    }, ()=>{
      console.log('Graph updated, ',this.state.graphs) ;
    }) ; 
  }
    
  render(){
    console.log( this.props) ;
    const graph = this.props.graphToDisplay ; 
    console.log(graph) ;
    if (graph !== undefined && graph.nodes !== undefined)
    return (
      <div className="exampleProject">
        <p>{this.props.projectName}</p>
        <div className="GraphBox">
          <Sigma graph={graph} className="SigmaParent" 
          style={{position:"relative", 
          width:"250px" , height:"250px" ,  border:"solid 3px black" }}
          onOverNode={e => console.log("Mouse over node: " + e.data.node.label)}
          settings={{drawEdges: true, clone: false}}>
            <EdgeShapes default="arrow" style={{width:"200px"}}/>
            <NodeShapes default="star"/>
            <RelativeSize  initialSize={20}/>
            <RandomizeNodePositions x1={200} y1={100} x2={300} y2={300}/>        
          </Sigma>
          <button title="Save Current Graph">Save</button>

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