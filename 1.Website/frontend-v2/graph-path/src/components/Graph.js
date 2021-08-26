import {React,Component} from "react";
import Graph from 'react-graph-vis' ; 
import  PropTypes  from "prop-types";
import { Link , withRouter} from "react-router-dom";
import '../css/Graph.css' ;
import GraphManager from "./Helpers/GraphManager";
import {Whisper, Popover, Button,Row,Col,Panel} from 'rsuite' ;
class GraphPath extends Component{
  
  constructor(props){
    super(props) ;
    this.state ={
      graphManager : null 
    }
  }
  componentDidMount(){
    const {graph} = this.props

    if (graph !== undefined ){
      this.setState({
        graphManager: new GraphManager(graph)
      })  ;
    }
    else{
        console.log('No Graph Object Mounted')
    }
  }
  componentWillUnmount(){
    if (this.state.graphManager !== null){
        
        this.setState({
          graphManager : delete this.state.graphManager  
        }) ;
    }
  }
  render(){

          const options = {
            layout: {
              hierarchical:false
            },
            edges: {
              color: "#ff0000"
            },
            height: "500px" ,
          };
        
          const events = {
            select: function(event) {
              var { nodes, edges } = event;
            } ,
            click:function(event){
              console.log('clicked',event,'alt',event.event.srcEvent.altKey)
              
            }
          };
          const speaker =  (
            <Popover title="Title">
              <p>This is a default Popover </p>
              <p>Content</p>
              <p>
                {/* <a>link</a> */}
                <Link to={`${this.props.match.url}/edit`}>TEST</Link>
              </p>
            </Popover>
          );
          

          if (this.state.graphManager !== null){
            const graph = this.state.graphManager.getGraph() ;
            console.log('rendering graph', graph) ;

            return (
              <div >
                <Link to="">Add Node</Link>
                <Whisper placement={'top'} trigger={'click'} speaker={speaker} >
                  <Button>Add Node</Button>
                </Whisper>
              
              <div id="graphbox">

                <Graph 
                  graph={graph}
                  options={options}
                  events={events}
                  getNetwork={network => {
                    //  if you want access to vis.js network api you can set the state in a parent component using this property
                    console.log('net',network)
                  }}
              />
              </div>
              <Row>
              <Col>
                <Panel bordered bodyFill header="Task"/>
                </Col>
                <Col>
                <Panel bordered bodyFill header="Task"/>
                </Col>
                <Col>
                <Panel bordered bodyFill header="Task"/>
                </Col>
                <Col>
                <Panel bordered bodyFill header="Task"/>
                </Col>

              </Row>
              </div>
  
            )
          }
          else{
            return (<div>
              Something Wrong
            </div>)
          }
        
    }
}

GraphPath.propTypes = {
  graph:PropTypes.object.isRequired , 
  task:PropTypes.array

}

export default withRouter(GraphPath) ;
// let graph2 = {
//             nodes: [
//               { id: 1, label: "Node 1", title: "node 1 tootip text" },
//               { id: 2, label: "Node 2", title: "node 2 tootip text" },
//               { id: 3, label: "Node 3", title: "node 3 tootip text" },
//               { id: 4, label: "Node 4", title: "node 4 tootip text" },
//               { id: 5, label: "Node 5", title: "node 5 tootip text" }
//             ],
//             edges: [
//               { from: 2, to: 4 },
//               { from: 2, to: 5 }
//             ]
//           };
        