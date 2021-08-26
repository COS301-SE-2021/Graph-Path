import {React,Component} from "react";
import Graph from 'react-graph-vis' ; 
import  PropTypes  from "prop-types";
import { Link , withRouter} from "react-router-dom";
import '../css/Graph.css' ;
import GraphManager from "./Helpers/GraphManager";
import {Whisper, Popover, Button,Form,FormGroup,FormControl,ControlLabel, Modal, Checkbox} from 'rsuite' ;
import ModalHeader from "rsuite/lib/Modal/ModalHeader";
class GraphPath extends Component{
  graphManager = null ;
  
  constructor(props){
    super(props) ;
    this.state ={
      currGrah:{} ,
      showTask:false,
      nodeName:'',
      critical:false
    }
  }
  componentDidMount(){
    const {graph} = this.props

    if (graph !== undefined ){
      this.graphManager = new GraphManager(graph)
      this.setState({
        currGrah: this.graphManager.getGraph() 
      })  ;
    }
    else{
        console.log('No Graph Object Mounted')
    }
  }
  componentWillUnmount(){
    if (this.graphManager !== null){
        
        // this.setState({
         delete this.graphManager  
        // }) ;
    }
  }

  showTaskModal=()=>{
    this.setState({
      showTask:!this.state.showTask
    }) ;
  }

  handleChange =(value)=>{
    this.setState({
      nodeName:value
    }) ;
  }
  handleCritical = (value)=>{
    this.setState({
      critical:!this.state.critical
    }) ;
  }

  addNewNode = ()=>{
    const name = {
      label:this.state.nodeName ,
      critical:this.state.critical 
    }
      
    if (!name.label.toString().trim().length) {
        alert('Cannot Submit Empty Name')
    }
    else{
        this.graphManager.addNode(name) ;
        this.setState({
          currGrah: this.graphManager.getGraph() 
        },()=>  this.cleanUpAfterNodeAddition() )  ;
      
    }
  }

  cleanUpAfterNodeAddition = ()=>{
    this.setState({
      nodeName:'',
      critical:false
    }) ;
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
              <p>ADD NODE TO GRAPH</p>
              <Form onSubmit={this.addNewNode} data-testid="form">
                <FormGroup>
                    <ControlLabel> Node Name</ControlLabel>
                    <FormControl name="node" type="text" onChange={this.handleChange} />
                </FormGroup>

                <FormGroup>
                  <Checkbox checked={this.state.critical} onChange={this.handleCritical}>
                    Critical Node ?
                  </Checkbox>
                </FormGroup>
                <FormGroup>
                    <FormControl type="submit"/>
                    </FormGroup>
            </Form>
            </Popover>
          );
          

          if (this.graphManager !== null){
            const graph = this.state.currGrah;
            console.log('rendering graph', graph) ;

            return (
              <div >
                {/* <Link to="">Add Node</Link> */}
               <Modal show={this.state.showTask} backdrop={true}>
                 <ModalHeader>
                   <Modal.Title>
                     Provided tasks
                   </Modal.Title>
                   <Modal.Body>
                      Task 7
                   </Modal.Body>
                 </ModalHeader>
               </Modal>
              <h3>{this.props.projectName}</h3>
              <div id="graphbox">
              <Whisper placement={'autoVertical'} trigger={'click'} speaker={speaker} >
                  <Button >Add Node</Button>
                </Whisper>
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
  task:PropTypes.array,
  projectName:PropTypes.string

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
  /* <Row>
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

              </Row> */
        