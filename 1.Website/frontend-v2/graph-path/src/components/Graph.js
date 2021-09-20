import {React,Component} from "react";
// import {Sigma,NodeShapes,EdgeShapes,DragNodes} from 'react-sigma' ; 
import Graph from 'react-graph-vis' ;
// import Dagre from 'react-sigma/lib/Dagre' ;
import  PropTypes  from "prop-types";
import { withRouter} from "react-router-dom";
import '../css/Graph.css' ;
import GraphManager from "./Helpers/GraphManager";
import { Popover,Avatar,Whisper, Button,Form,FormGroup,FormControl,ControlLabel, Modal, Checkbox, IconButton, Icon, Loader, Dropdown} from 'rsuite' ;
import axios from "axios";
import PopUpMessage from "./Reusable/PopUpMessage";
import Task from "./Task";
import {connect} from 'react-redux' ;
import DropdownMenuItem from "rsuite/lib/Dropdown/DropdownMenuItem";

class GraphPath extends Component{
  graphManager = null ;
  initialGraph = {} ;
  
  constructor(props){
    super(props) ;
    this.state ={
      currGraph:{} ,
      showTask:false,
      nodeName:'',
      critical:false,
      showNode:false, 
      loading:false,
      showMsg:false,
      answer:'',
      source:'from',
      target:'to',
      taskList:[], 
      nodeTasks:[],
      currNodeID:'',
      currNodeName:''
    }
  }

  componentDidMount(){
    const {graph} = this.props.project
    var graphObj = JSON.parse(JSON.stringify(graph)) ;
    // const graphObj = {...graph}
    // console.log('created',graphObj)

    if (graph !== undefined ){
      this.initialGraph = graphObj ;
      this.graphManager = new GraphManager(graph)
      this.setState({
        currGraph: this.graphManager.getGraph() 
      })  ;
    }
    else{
        console.log('No Graph Object Mounted')
    }
    this.viewAllTasksForProject() ;
    

  }
  componentWillUnmount(){
    let semiUpdate = this.props.project ;
    if (this.graphManager !== null){
        semiUpdate.graph = this.graphManager.getGraph() ;
        // this.setState({
         delete this.graphManager  
        // }) ;
    }
    //update parent
    this.props.updateParent(semiUpdate) ;
    console.log('update parent',semiUpdate)
    
  }

  viewAllTasksForProject = (callback)=>{
    if (this.props.project !== undefined){
        
      this.setState({
        loading:true
      });
      const projectId = this.props.project._id ;
      
      axios.get(`${this.props.api}/task/getAllTasksByProject/${projectId}`)
      .then((res)=>{
          console.log('Tasklist',res) ;
          const allTasks = res.data.data ;
            if (allTasks !== undefined && Array.isArray(allTasks)){
                this.setState({
                    taskList:res.data.data ,
                    loading:false ,
                    showTask:false
                },()=>{
                  if (typeof callback === 'function'){
                    callback() ;
                  }
                }) ;
                
            }
            else{
                this.setState({
                    loading:false 
                }) ;
            }
      })
      .catch((err)=>{
            console.log('Error',err)
            this.setState({
                loading:false 
            }) ;

        })

        //update the task list if it was already showing
    }
    else{
      this.setState({
        loading:false , //if the project was loading before
      })
    }

}

  showNodeForm = ()=>{
    this.setState({
      showNode:!this.state.showNode
    }) ;
  }

  filterByID=(id,array)=>{
    return array.filter(value=>value.nodeID === id ) ;
  }

  showTaskModal=(nodeId)=>{
    let filter = this.state.nodeTasks ;
    
    if (typeof nodeId === 'string' && nodeId.length>1 &&this.props.project !== undefined){
      filter= this.filterByID(`${this.props.project._id}_${nodeId}`,this.state.taskList) ;
      let selected = this.state.currGraph.nodes.find(node=>node.id === nodeId) ; 
      let nodeLabel = 'No Provided Name' ; 
      if (selected){
        nodeLabel = selected.label ;
      }
      this.setState({
        showTask:!this.state.showTask ,
        nodeTasks:filter,
        currNodeID:nodeId,
        currNodeName:nodeLabel,
      }) ;      
    }
    else{
      
      this.setState({
        showTask:!this.state.showTask ,
        currNodeId:'',
        currNodeName:'',
        nodeTask:[]
      }) ;
    }

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
  
  updateGraph=(withsave)=>{
    
    this.setState({
      currGraph: this.graphManager.getGraph() 
    },()=>{
      if (withsave){
        this.saveProjectGraph(this.props.project._id) ;
      }
    }) ;
  }

  addNewNode = ()=>{
    const name = {
      label:this.state.nodeName ,
      critical:this.state.critical 
    }
      
    if (!name.label.toString().trim().length) {
        // alert('Cannot Submit Empty Name')
        PopUpMessage('Cannot Submit Empty Name','error')
    }
    else{
        this.graphManager.setGraph(this.state.currGraph) ;
        this.graphManager.addNode(name) ;
        this.updateGraph();
        this.cleanUpAfterNodeAddition()   ;
      
    }
  }

  createEdgeBetweenNode=(id) =>{
    if (this.state.source === 'from'){
      this.setState({
        source:id
      }) ;
    }
    else{
      if (this.state.source === id){
        // alert('Cannot make edge to self')
        PopUpMessage('Cannot make edge to self','error')
      }
      else{  
        // this.setState({
        //   target:id
        // }) ; 
        // this.graphManager.setGraph(this.state.currGraph) ;
        let addedEdge = this.graphManager.addEdge(this.state.source,id) ;
        // console.log('adding edge',addedEdge) ;

        if (addedEdge === 1){
          this.updateGraph() ;
          // console.log('adding edge',this.graphManager.getGraph()) ;

        }
        else if (addedEdge === 0 ){
          // alert('Edge Makes graph Cyclic')
          PopUpMessage('Edge Makes graph Cyclic','Error')

        }
        else{
          // alert('Edge Exists')
          PopUpMessage('Edge Exists','warning')
        }
      }
        //save the information
        //send the information to make graph
        //update Graph
        //cleanup
        this.cleanUpAfterEdgeAddition() ;
    }

  }

  removeNode =(id)=>{
    let result = this.graphManager.removeNode(id) ;
    if (result){
      this.updateGraph() ;
      this.deleteAllNodeTask(`${this.props.project._id}_${id}`) ; 

    }
    else{
      //could not delete
    }
    return result ;
  }

  removeEdge = (id)=>{
    let result = this.graphManager.removeEdgeWithEdgeId(id) ;
    if (result){
     this.updateGraph()
    }
    else{
      console.log('Error when deleting edge')
    }
  }

  cleanUpAfterEdgeAddition = ()=>{
    this.setState({
    source:'from',
    target:'to'})
  }

  cleanUpAfterNodeAddition = ()=>{
    this.setState({
      nodeName:'',
      critical:false
    }) ;
  }

  /*
  * Takes two graphs and compares them. 
  * the 1st param is old graph ~ current graph
  * the 2nd param is new graph ~ one to be saved
  * If they differ in size of nodes and edges return true
  * If new graph is in wrong format return false
  * If graphs are equal return false
  */
  validateGraphDifference=(oldG,newG)=>{
    let diff = false ; 
    console.log('finding diff b/w',oldG,'and:',newG) ; 

    if ( newG === undefined ||newG.nodes === undefined || newG.edges === undefined){
        // new Graph should not be undefined .. dont save 
        return diff ;
    }
    if (oldG === undefined){
        //no olg graph? save 
        diff = true
        return diff ;
    }

    if (oldG.nodes === undefined || oldG.edges === undefined || oldG === undefined){
        //old graph was null, then we save the new one
        diff =  true ; 
        return true ; 
    }
    else{
        // the lengths must be different
        // let oldGSum = oldG.edges.length + oldG.nodes.length ;
        // let newGSSum = newG.edges.length + newG.nodes.length ;
        let oldGSum = JSON.stringify(oldG) ;
        let newGSum = JSON.stringify(newG)
        if (oldGSum !== newGSum){
            diff = true ;
            return diff ;
        }
        return diff ;
    }
  }

  checkSavePermissions =()=>{
    if (this.props.project !== undefined){
      this.saveProjectGraph(this.props.project._id) ;
    }
  }

  saveProjectGraph=(projectId)=>{

      var saveGraph =this.validateGraphDifference(this.initialGraph,this.state.currGraph)
      if ( saveGraph){ // if its not the same graph
          // console.log('valid?:',saveGraph,'Saving to porjec',projNode.projectName,this.state.grapRep) ;
          //set the loader while communicating with the server
          this.setState({
              loading:true
          }) ;
          // const minimalGraph = 
          const minimalNodes = this.state.currGraph.nodes.map((node)=>{
              return {
                  id:node.id,
                  label:node.label,
                  x:node.x,
                  y:node.y,
                  size:node.size,
                  color:node.color,
                  critical:node.critical 
              }
          }) ;
          const minimalEdges = this.state.currGraph.edges.map((edge)=>{
              return {
                  id: edge.id,
                  from: edge.source === undefined ? edge.from: edge.source,
                  to: edge.target === undefined ?edge.to: edge.target,
                  label: edge.label,
                  color: '#000'||edge.color,
                  width: edge.width,
              }
          })
          const minimalGraph = {
              nodes:minimalNodes,
              edges:minimalEdges
          }
          const data = {} ; //{ ...this.props.project}  ;
          data.graph = minimalGraph
          data.projectID = projectId ;
          data.email = this.props.loggedUser.email ; 
          console.log('b4',data)

          axios.patch(`${this.props.api}/project/updateProjectGraph`,data,{
            headers:{
              authorization:this.props.loggedUser.token
            }
          })
          .then((res)=>{
              console.log('update graph response',res.data)
              // if (res.data.data === undefined) {
              //     // didn't save
              //     alert(res.data.message) ; 
              // }
              //communication happened successfully
              this.setState({
                  loading:false,
                  answer:res.data.message,
                  
              }) ;
              // this.viewProjectsFromAPI() ;
              PopUpMessage(res.data.message,'info') ;
              this.initialGraph = minimalGraph ;
          })
          .catch((err)=>{ 
            if (err.response){
              console.log(err.response) ;
              PopUpMessage(err.response.data.message,'error')
            }
            else{
              console.log('Some error',err)
            }
              this.setState({
                  loading:false
              }) ;
              
          })
      }
      else{//no difference
          // console.log('Node Project',this.props, this.graphManager) ;
          PopUpMessage('No change to graph','warning')
      }

  }

  saveNodeTask=(nodePreInfo)=>{
    let nodeTask ={...nodePreInfo} ;
    const {project} =this.props ;
    nodeTask.projectID = project._id ;
    nodeTask.nodeID = `${project._id}_${this.state.currNodeID}` ;
    nodeTask.assigner = [{
      email:`${this.props.loggedUser.email}`,
      permissions:['owner']
    }] ;
    nodeTask.email = this.props.loggedUser.email ;
    nodeTask.taskMembers = []

    let label = this.state.currNodeName ;
    if (label.length<1){
      let nodeFound =  this.state.currGraph.nodes.find(node=>node.id === this.state.currNodeID) ;
      nodeTask.title = nodeFound.label ;
    }
    else{
      nodeTask.title = label ;
    }

    console.log('saving',nodeTask)
    this.setState({
      loading:true
    }) ; 

    axios.post(`${this.props.api}/task/insertTask`,nodeTask,{
      headers:{
        authorization:this.props.loggedUser.token,
        
      }
    })
    .then((res)=>{
      let taskRes = res.data ;
      console.log('saved task',taskRes) ;

      if (taskRes.data){
        let nodeId = '' ;
        if (taskRes.data.errors){
          PopUpMessage(taskRes.message,'error')
        }
        else{
         nodeId= nodeTask.nodeID.split('_')[1] ;
          console.log('updated id',nodeId,taskRes.nodeCompletionStatus)
          PopUpMessage(taskRes.message,'success') ;
          this.changeNodeByStats(nodeId,taskRes.nodeCompletionStatus) ;
        }
        this.viewAllTasksForProject() ;
      }
      else{
        PopUpMessage(taskRes.message,'info')
        this.setState({
          loading:false
        }) ;
      }
    })
    .catch((err)=>{
      if (err.response){
        console.log(err.response) ;
        PopUpMessage(err.response.data.message,'warning')
      }
      else{
        PopUpMessage('Something went wrong,please try again','info')
        console.log('Some error',err)
      }
      this.setState({
        loading:false
      })
    }) ;
  }

  clickNodeHandler = (event)=>{
    // console.log(event) ; 
    const nodeAffected = event.data.node.id ;
    // const nameOfNode = event.data.node.label ;

    if (event.data.captor.altKey){
      //delete node or edge
      if (typeof nodeAffected === 'string'){
        this.removeNode(nodeAffected) ;
      }
      // else if()
    }
    else if(event.data.captor.ctrlKey || event.data.captor.shiftKey){
       //add edge between node
      if (typeof nodeAffected === 'string'){
        this.createEdgeBetweenNode(nodeAffected)
      }
      
    }
    else{
      if (typeof nodeAffected === 'string'){
        this.showTaskModal(nodeAffected)
      }
      this.cleanUpAfterEdgeAddition() ;
    }
  }

  deleteOneTask=(taskId)=>{
    let deleteAns = window.confirm('Are you sure you want to delete all tasks?') ;
    if (deleteAns){
    
      axios.delete(`${this.props.api}/task/deleteTaskByID/${taskId}`,{
        data: { 
          projectID:this.props.project._id ,
          email:this.props.loggedUser.email
        },
        headers:{
          authorization:this.props.loggedUser.token
        }
      })
      .then((res)=>{
        PopUpMessage(res.data.message,'info') ; 
        this.viewAllTasksForProject() ;

      })
      .catch((err)=>{
        if (err.response){
          console.log('Detailed err:',err.response)
          PopUpMessage(err.response.data.message,'info')
        }
        console.log('some error',err) ;
      })
    }
    else{
      PopUpMessage('Task not deleted','info')
    }
  }

  deleteAllNodeTask=(nodeID)=>{
    let deleteAns = window.confirm('Are you sure you want to delete all tasks?') ;
    if (deleteAns){
    

      axios.delete(`${this.props.api}/task/deleteTaskByNodeID/${nodeID}`,{
        data: { 
          projectID:this.props.project._id ,
          email:this.props.loggedUser.email
        },
        headers:{
          authorization:this.props.loggedUser.token
        }
      })
      .then((res)=>{
        PopUpMessage(res.data.message,'info')
        this.viewAllTasksForProject() ;
      })
      .catch((err)=>{
        if (err.response){
          console.log('Detailed err:',err.response)
        }
        console.log('some error',err) ;
      })
      
    }
    else{
      PopUpMessage('All tasks not deleted','info')
    }
  }

  updateNode=(node)=>{
    node.taskID = node._id ;
    console.log('updated ',node) ; 

    axios.patch(`${this.props.api}/task/updateEverythingTask`,node,{
      headers:{
        authorization:this.props.loggedUser.token
      }
    })
    .then((res)=>{
      console.log('update res',res); 
      let nodeId = node.nodeID.split('_')[1] ;
      console.log('updated id',nodeId)
      PopUpMessage(res.data.message,'info')

      this.changeNodeByStats(nodeId,res.data.nodeCompletionStatus)
    })
    .catch((err)=>{
      if(err.response ){
        console.log('err msg',err.response) ;
      }
    })
  }

  newTaskModal=()=>{
    return <Modal show={this.state.showTask} 
    keyboard={true}
    onHide={this.showTaskModal}
    overflow={true} backdrop={true} >
      
      <Modal.Header>
        <Modal.Title>
          Provided tasks - {"Node: "+this.state.currNodeName}

        </Modal.Title>
      </Modal.Header>
    <Modal.Body>
      
      <Task nodeTasks={this.state.nodeTasks} 
      members={this.props.project.groupMembers}
      deleteNodeTasks={this.deleteAllNodeTask} 
      deleteTask={this.deleteOneTask} 
      updateNode={this.updateNode}
      sendTaskInfo={this.saveNodeTask}/>
    </Modal.Body>
    </Modal>

  }

  changeNodeByStats(nodeId,stats){
    let color = '#000' ; 
    if (stats === 'complete'){
        //green
        color = '#0d0'
    }
    else if (stats === 'in progress'){
      color = '#dd0' ;
    }
    else{
      color = '#d00'
    }

    let res = this.graphManager.changeColor(nodeId,color) ; 
    console.log('change color',res) ;
    if (res){
      this.updateGraph(true) ;
    }
    else{
      PopUpMessage('Could not change node color','info') ;
    }

  }

  selectCriticalPath=(key,event)=>{
    console.log('critical',key,event) ;
    
    if (key === 'graph'){
      let highlight =  this.graphManager.highlightGraphCritical() ; 
      if (highlight < 0 ){
        PopUpMessage('Please connect the start node to another node','warning') ;
      }
      else if (highlight >= 0){
        this.updateGraph() ;
        PopUpMessage(`${highlight} critical paths found`,'info') ; 
      }
    }
    
  }

  render(){
    console.log(' graph',this.state.currGraph) 
          
          //start rendering
          if (this.graphManager !== null){
            const graph = this.state.currGraph;
            console.log('curr',this.graphManager)
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
        </Popover>) ; 
         const options = {
          layout: {
            randomSeed: undefined,
            improvedLayout:true,
            clusterThreshold: 150,
            // hierarchical: {
            //   enabled:false,
            //   levelSeparation: 150,
            //   nodeSpacing: 100,
            //   treeSpacing: 200,
            //   blockShifting: true,
            //   edgeMinimization: true,
            //   parentCentralization: true,
            //   direction: 'UD',        // UD, DU, LR, RL
            //   sortMethod: 'hubsize',  // hubsize, directed
            //   shakeTowards: 'leaves'  // roots, leaves
            // }
          },
          nodes:{
            physics:false,
            // size:25,
            shape:'box',
            font:{
              color: '#343434',
              size: 30, // px
              face: 'arial',
              background: 'none',
              strokeWidth: 0, // px
              strokeColor: '#ffffff',
              align: 'center'
            }
          },
          edges: {
            color: "#ff0000" , 
            physics:false ,
            font:'false',
            // {
            //   size:20,
            //   face:'calibri',
            //   align:'middle',
            // },
            arrowStrikethrough:false,
            arrows:{
              to:{
                enabled:true,
                imageHeight: 30,
                type:'arrow'
              }
            },
          },
          // physics:{
            // enabled:true ,
            // forceAtlas2Based: {
            //   theta: 1,
            //   gravitationalConstant: -50,
            //   centralGravity: 0.01,
            //   springConstant: 0.08,
            //   springLength: 100,
            //   damping: 0.4,
            //   avoidOverlap: 0
            // }
          // }
        };
        
        const events = {} ;
        events.select =  function(event) {
            var { nodes, edges } = event;
            console.log('sel',event)
          }  ;
        events.externalDragUpdate = this.graphManager.updatePosition ;
        events.dragEnd = function (event){
          console.log('drag',event)

          const nodesAffected = event.nodes ;
          if (nodesAffected.length > 0 ){
            let curr = nodesAffected.shift() ;
            let {x,y} = event.pointer.canvas ;

            let update = events.externalDragUpdate(curr,x,y) ;
            console.log('update',update) ;
          }
        }

        events.externalRemoveNode = this.removeNode ;
        events.externalRemoveEdge = this.removeEdge ;
        events.externalCreateEdge = this.createEdgeBetweenNode
        events.viewTaskInfo = this.showTaskModal ;
        events.click = function(event){
            console.log('clicked',event,'ctrl',event.event.srcEvent.ctrlKey) ;
            const nodesAffected = event.nodes ;
            const edgesAffected = event.edges ;
            if (event.event.srcEvent.altKey){
              //delete node or edge
              if (nodesAffected.length>0){
                let curr = nodesAffected.shift() ;

                events.externalRemoveNode(curr) ;

              }
              else if (edgesAffected.length> 0) {
                let currE = edgesAffected.shift()
                events.externalRemoveEdge(currE)
              }
            }
            else if (event.event.srcEvent.ctrlKey || event.event.srcEvent.shiftKey){
              //add edge between node
              if (nodesAffected.length>0){
                let curr = nodesAffected.shift() ;
                events.externalCreateEdge(curr) ; 
              }

            }
            else{
              //view task information
              if (nodesAffected.length>0){
                let node = nodesAffected[0];
                events.viewTaskInfo(node) ;

              }
            }
            
        } 
      
            return (
              <div >
                {
                  this.state.loading && (<Loader backdrop speed={'fast'} size={'lg'}/>)
                }
                
              <div id="graph-info" >
                <h3>{this.props.project.projectName}</h3>

                <div id="graph-nav">
                <Whisper speaker={speaker} placement={'leftStart'} trigger={'active'}>
                <Button >Add Node</Button>
                </Whisper> &nbsp;
                <IconButton onClick={()=>this.checkSavePermissions()} title={"Save Graph"} icon={<Icon icon={'save'}/>}/>                
                  <Dropdown title={"Critical Path"} 
                  icon={<Icon icon={'charts-line'}/>}>
                    <Dropdown.Item onSelect={(event)=>this.selectCriticalPath('graph')}>
                      Project Graph Critical Path
                    </Dropdown.Item>
                  </Dropdown>
                  </div>
              </div>

                <div id="graphbox">
                    {/* <div>
                 {this.state.currNodeID.length > 1 ?
                 
                        
                        <Avatar onClick={this.showTaskModal} className={'nodeView'} circle size={'lg'}>{
                        this.state.currNodeName===''?'click a node':this.state.currNodeName}</Avatar>
                 : <small>Click a node to add a task. To add node press, Add Node on top</small>}
                      

                     </div> */}

                      {// return the modal
                      this.newTaskModal()}

                     <Graph key={JSON.stringify(graph)}
                  graph={this.state.currGraph}
                  options={options}
                  events={events}
                  getNetwork={network => {
                    //  if you want access to vis.js network api you can set the state in a parent component using this property
                    // console.log('net',network)
                    network.stabilize(2000);
                  }}
              />

               {/* <Sigma renderer="canvas"  id="SigmaParent" key={JSON.stringify(graph)}
                  graph={graph}
                  style={{
                    // position:"relative", 
                    height:"92%", width:"100%" ,  
                  }}
                  settings={{
                    clone: false, // do not clone the nodes
                    immutable:false,// cannot updated id of node
                    // labelSizeRatio:1,
                    labelThreshold:0.5,
                    scalingMode:"inside",
                    sideMargin:100,
                    minNodeSize:3,
                    maxNodeSize:10,
                    minEdgeSize:0.1,
                    font:"calibri",
                    defaultLabelSize:30,
                    defaultLabelColor:"#000",
                    labelSizeRatio:4,
                    defaultEdgeHoverColor:'#000',
                    maxEdgeSize:4,
                    drawNodes:true, //draw node ?
                    drawLabels:true, //node label
                    drawEdges: true, //draw edge?
                    drawEdgeLabels:true,
                    minArrowSize:10,
                    enableEdgeHovering:true,
                    edgeHoverPrecision:100,
                    // doubleClickEnabled:false,
                    // zoomMax:1,
                    autoResize:true ,
                    autoRescale:false
                  }}    
                onClickNode={this.clickNodeHandler}
                clickStage={()=>console.log('stage')}
                  // options={options}
                  // events={events}
              >
                <EdgeShapes default="arrow"/>
                <NodeShapes default="def"/>
                <DragNodes />
                {/* <Dagre directed={false}/> 
                {/* <RandomizeNodePositions seed={20} /> 
                {/* <RelativeSize size={30} /> 
                
              </Sigma>
            */}

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

GraphPath.defaultProps = {
  api:'http://localhost:9001'
}

GraphPath.propTypes = {
  // task:PropTypes.array,
  project:PropTypes.object.isRequired,
  api:PropTypes.string , 
  updateParent: PropTypes.func.isRequired
}

function mapStateToProps(state){
  return {
      loggedUser:state.loggedUser
  } ;
}


export default connect(mapStateToProps)(withRouter(GraphPath)) ;

  /* 
          */
        