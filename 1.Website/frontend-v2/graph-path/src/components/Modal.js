import  React from 'react' ;
import {Calendar} from "rsuite";
import {Sigma,EdgeShapes,NodeShapes,DragNodes,RelativeSize,RandomizeNodePositions} from 'react-sigma' ;

class Modal extends React.Component{
    render() {
        const graph = {
            edges: [],
            nodes: [{
                id:'n1' ,
                label:'mine',
                x:0,
                y:0,
                size:25,

            }]
        }
        return(
            <>
            {/* <Calendar bordered /> */}
            <Sigma renderer="webgl"  id="SigmaParent" key={JSON.stringify(graph)}
                  graph={graph}
                  style={{position:"relative", height:"92%", width:"100%" ,  border:"double 3px black"}}
                  settings={{
                    clone: false, // do not clone the nodes
                    immutable:false,// cannot updated id of node
                    // labelSizeRatio:0.8,
                    labelThreshold:0.1,
                    drawNodes:true,
                    drawEdges:true,
                  }}    
                onClick={(e)=>console.log('hover')}

                  // options={options}
                  // events={events}
              >
                <EdgeShapes default="arrow"/>
                <NodeShapes default="def"/>
                <DragNodes />
                <RandomizeNodePositions seed={20} />
                <RelativeSize size={30} />
                
              </Sigma>
            </>
        )
    }
}

export default Modal;