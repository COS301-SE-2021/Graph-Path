import {React,Component} from "react";
import Graph from 'react-graph-vis' ; 
import  PropTypes  from "prop-types";
import { Link , withRouter} from "react-router-dom";
import '../css/Graph.css' ;
import GraphManager from "./Helpers/GraphManager";
import { Popover,Whisper, Button,Form,FormGroup,FormControl,ControlLabel, Modal, Checkbox, IconButton, Icon} from 'rsuite' ;
import ModalHeader from "rsuite/lib/Modal/ModalHeader";
class GraphPath extends Component{
  graphManager = null ;
  
  constructor(props){
    super(props) ;
    this.state ={
      currGrah:{} ,
      showTask:false,
      nodeName:'',
      critical:false,
      showNode:false
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
  showNodeForm = ()=>{
    this.setState({
      showNode:!this.state.showNode
    }) ;
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

  removeNode =(id)=>{
    let result = this.graphManager.removeNode(id) ;
    if (result){
      this.setState({
        currGrah: this.graphManager.getGraph() 
      })
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
            externalRemove (value){this.removeNode(value)},
            click:function(event){
              console.log('clicked',event,'ctrl',event.event.srcEvent.ctrlKey) ;
              const nodesAffected = event.nodes ;
              const edgesAffected = event.edges ;
              if (event.event.srcEvent.altKey){
                //delete node or edge
                if (nodesAffected.length>0){
                  let curr = nodesAffected.pop() ;
    console.log('rm node',this)

                  // this.externalRemove(curr) ;

                }
              }
              else if (event.event.srcEvent.ctrlKey){
                //add edge between node
              }
              else{
                //view task information
              }
              
            } , 
          };
          

          if (this.graphManager !== null){
            const graph = this.state.currGrah;
            const speaker = (
            <Popover visible={this.state.showNode} title="ADD NODE TO GRAPH">
        
          <Form onSubmit={this.addNewNode} data-testid="form">
            <FormGroup>
                <ControlLabel> Node Name</ControlLabel>
                <FormControl name="node" type="text" value={this.state.nodeName} onChange={this.handleChange} />
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
        </Popover>)
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
              <Whisper speaker={speaker} placement={'autoVertical'} trigger={'active'}>
                <Button >Add Node</Button>
              </Whisper>
              
              <Graph key={JSON.stringify(graph)}
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
        