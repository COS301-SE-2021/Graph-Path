import React from 'react' ; 
import SigmaGraph from './SigmaGraph';
import axios from 'axios';
import ProjectInfo from './ProjectView';
import '../css/common.css' ;
import '../css/Login.css'
import {BrowserRouter as Router, Switch,Route,Link} from 'react-router-dom' ;
import * as FaIcons from "react-icons/fa";
import * as ImIcons from "react-icons/im";
import Spinner from 'react-spinner-material';
import GraphManager from './GraphManager';
import { Card, ProgressBar} from "react-bootstrap";
import PopUpMessage from './PopUpMessage';
// Button
// import TaskPic from '../images/task.svg';


class Graph extends React.Component{

    constructor(props){
        super(props) ; 
        this.originalProjectList = [];
        this.state=  {
            projNodeList: "",
            linkNumber : -1,
            projList: [] ,
            ownList:[],
            sharedList:[],
            grapRep: {
                nodes : [],
                edges : []
            },
            api: "http://localhost:9001",
            loading:false,
            graphManager: undefined,
            popUp:false
        }
    }
    //GET ALL Projects for User
    //Display List of Projects
    //Display  Graph on Click
    emptyGraph = () =>{
        let empty =  {
            nodes : [],
            edges : []
        } ;
        return empty ;
    }

    updateGraphView = (manager) =>{
        // console.log('updating from child',manager) ;
        if (manager instanceof GraphManager){
            this.setState({
                graphManager:manager,
                grapRep:manager.getGraph()
            }) ;
        }
        else{
            alert('Could not update Graph');
        }
    }
    componentDidMount = ()=>{ // no projects to display? 1 - call from api
            this.viewProjectsFromAPI() ;
            //initialize the original project list
            this.updateOldGraph() ;
        this.setState({
            graphManager:new GraphManager({}) 
        })
    }
    componentWillUnmount(){
        delete this.state.graphManager ;
    }

    updateOldGraph = ()=>{
        fetch(`${this.state.api}/project/getAllProjectsByUserEmail/${this.props.userEmail}`)
        .then(res=>res.json())
        .then((res)=>{
            if (res.data !== undefined )
            this.originalProjectList =  res.data ; 
        })
        .catch((err)=>{
            console.log('error in initialization',err)
        })

    }
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
            let oldGSum = oldG.edges.length + oldG.nodes.length ;
            let newGSSum = newG.edges.length + newG.nodes.length ;
            if (oldGSum !== newGSSum){
                diff = true ;
                return diff ;
            }
            return diff ;
        }
    }

    //save the current representation of graph
    saveCurrentGraph = ()=>{
        const projNode = this.state.projNodeList ; 
        console.log('Saving to porjec',projNode.projectName,this.state.grapRep) ;
        let linkNumber = this.state.linkNumber ;
        let pName =  projNode.projectName ;
        if (linkNumber>=0 && pName !== undefined ){
            const oldGraph = this.originalProjectList[linkNumber].graph
            
            //send current graph to project
            // var saveGraph =  window.confirm('Save Current Graph?') ;
            var saveGraph = this.validateGraphDifference(oldGraph,this.state.grapRep)
            if ( saveGraph){ // if its not the same graph
                // console.log('valid?:',saveGraph,'Saving to porjec',projNode.projectName,this.state.grapRep) ;
                //set the loader while communicating with the server
                this.setState({
                    loading:true
                }) ;
                // const minimalGraph = 
                const minimalNodes = this.state.grapRep.nodes.map((node)=>{
                    return {
                        id:node.id,
                        label:node.label,
                        x:node.x,
                        y:node.y,
                        size:node.size,
                        color:node.color
                    }
                }) ;
                const minimalEdges = this.state.grapRep.edges.map((edge)=>{
                    return {
                        id: edge.id,
                        source: edge.source,
                        target: edge.target,
                        label: edge.label,
                        color: edge.color,
                        size: edge.size,
                    }
                })
                const minimalGraph = {
                    nodes:minimalNodes,
                    edges:minimalEdges
                }
                const data = { ...projNode}  ;
                data.graph = minimalGraph
                    
                axios.put(`${this.state.api}/project/updateEverythingProject/${data._id}`,data)
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
                    this.viewProjectsFromAPI() ;
                    this.showPopUP() ;
                })
                .catch((err)=>{
                    alert('saving failed',err)
                    console.log(err) ;
                    this.setState({
                        loading:false
                    }) ;
                })
            }
            else{//no difference
                console.log('Node Project',projNode.graph, this.state.grapRep) ;
                alert('no change in graph',projNode.graph, this.state.grapRep)
            }
        }
        else{
            alert('Please select a project to save graph') ;
        }
    }

    changeNodeList = (node,num) =>{
        // console.log(node.projectName) ;
        if (node.graph === {} || node.graph === undefined || node.graph.nodes === undefined ){
            this.setState({
                projNodeList:node,
                grapRep:this.emptyGraph(),
                linkNumber:num
            }) ;
            this.state.graphManager.setGraph(this.emptyGraph()) ; 
        }
        else{
            if (num >= 0){ //valid link number
                this.setState({
                    projNodeList:node,
                    grapRep:node.graph,
                    linkNumber:num,
                })
                this.state.graphManager.setGraph(node.graph) ; 
            }
        }
    }

    viewProjectsFromAPI =()=>{
        
        //Display Loading State
        this.setState({
            loading:true
        }) ; 

        fetch(`${this.state.api}/project/getAllProjectsByUserEmail/${this.props.userEmail}`)
        .then(res=>res.json())
        .then(data => {
            // console.log('from api req',data) ;
            const proj = data ;
            if (proj.data !== undefined && proj.data !== null ){
                this.setState({
                    projList:proj.data,
                    loading:false
                }) ; 
            }
            else{
                //no projects found from api
                this.setState({
                    loading:false,
                    projList:[]
                }) ; 
                //If there was an error in location
                data.message === undefined?
                alert('Error:'+proj.error) 
                :alert(data.message) ; console.log('Server Reason',data.name,'More:',data.reason) ; 
            }
        },(rejected)=>{
            console.log('from backend :rejected ',rejected)
            alert('Server Error, please try again later.'+rejected) ;
        })    
        .catch(err =>{
            this.setState({
                loading:false
            }) ; 
            alert('Error:'+err)
            console.log('error getting from /project/*',err) ; 
        }) ; 
        
        
    }

    deleteProject=(project)=>{
        if(project === undefined){
            alert('Can\'t delete Project. Project Invalid') ;
        }
        else{
            if (this.props.userEmail === undefined){
                alert('Can\'t delete when not signed in')
            }
            else{
                this.setState({
                    loading:true,
                    linkNumber:-1
                }) ;
                console.log('B4 del',project)
                axios.delete(`${this.state.api}/project/deleteProject/${project._id}`)
                .then((res)=>{
                    if (res.status >=400){
                        throw res ;
                    }
                    if(res.data.message === undefined){
                        alert('Network Error') ;
                        this.setState({
                            loading:false
                        }) ;
                    }
                    else{
                        this.setState({
                            answer:res.data.message
                        },()=>this.showPopUP()) ;
                        ;
                        this.viewProjectsFromAPI() ;
                    }
                })
                .catch(err=>{
                    console.log("error",err)
                    this.setState({
                        loading:false
                    }) ;
                }) ;
                
            }
        }
    }

    closeProjectList = () =>{
        var elem = document.getElementById('userProjects') ; 
        if (elem !== null){
            elem.style.display = 'none' ; 
        }
    }

    openProjectList = () =>{
        var elem = document.getElementById('userProjects') ; 
        if (elem !== null){
            elem.style.display = 'block' ; 
        }
    }

    refreshAll = ()=>{
        this.viewProjectsFromAPI() ;
        this.updateOldGraph() ;
    }

    showPopUP = () =>{
        this.setState({
            popUp: true
        })
        setTimeout(
            () =>
                this.setState({
                    popUp: false
                }),5000
        );
    }

    render(){
        // console.log('Graph rerendering') ;
        /* sigmaKey is used for refreshing common Sigma graph representaion
         if nodes || edges are undefined, put 0 , else make key 
         the combination of node ^ egdes length */
        // var SigmaGraphkey = ( this.state.grapRep.nodes === undefined || this.state.grapRep.edges === undefined ) ? "0"  
        // :`${this.state.grapRep.nodes.length}${this.state.grapRep.edges.length}`

       
        let keyNum = -1 ;
        const placer = 100;
        //project Name to display on the graph 
        var selectedProjectName =  this.state.projList.length>0 && this.state.linkNumber >= 0 ?
         this.state.projList[this.state.linkNumber]: "No Data Found" ;

        return (
            <Router basename='viewProjects/graph'>
                <div className="projectView" >
                <Spinner color={"#0000f2"} radius={350} visible={this.state.loading} />

                   <Link to={"/viewProjects"} className="dropbtn clickbtn" title={"Click to display projects"} onClick={this.openProjectList}>
                        Projects  
                    </Link>

                    <FaIcons.FaRecycle onClick={this.refreshAll} title={'refresh'}
                    className="icon clickbtn"/>
                </div>
                <Switch>
                    <Route path={"/viewProjects"} >    
                    <div>
                    <div className="projList" id="userProjects">
                        {   this.state.projList !== undefined && Array.isArray(this.state.projList) &&
                            this.state.projList.length>0 ? // validate if it is an array and not empty
                            this.state.projList.map( (node) => {       
                                keyNum = keyNum+1 ;




                                return(

                                    <>

                                    <Card key={keyNum}  data-project={node} id="project-card">
                                        <Card.Body>
                                            <Card.Title id="pTitle">{node.projectName}</Card.Title>
                                            <Card.Text id={"pText"}>Owner: {node.owner}</Card.Text>
                                            <ProgressBar now={placer} label={`${placer}%`}/>
                                            <Card.Footer id="Footer">
                                                <Link id="btn2"
                                                      data-projnum={keyNum}
                                                      onClick={(e) =>{
                                                          this.changeNodeList(node, e.target.getAttribute("data-projnum"))}}
                                                      to={`/project/${keyNum}`}
                                                      variant="primary">Open</Link>
                                                {node.owner === this.props.userEmail ?
                                                    <ImIcons.ImBin id="del-proj" onClick={(e)=>this.deleteProject(node)} /> : ""
                                                }
                                            </Card.Footer>
                                        </Card.Body>

                                    </Card>



                                    </>

                                )
                            })
                            : <div>
                                <h1>Project List is empty,<br/>
                                <p>Please refresh</p> or create a new project.</h1>

                            </div>
                            
                        }
                    </div>
                </div>
                </Route>
                    <Route path={`/project/:${this.state.linkNumber}`}> 
                        <ProjectInfo userEmail={this.props.userEmail} projectToDisplay={this.state.linkNumber<0 ?''
                        :this.state.projList[this.state.linkNumber]} />
                    </Route>
                    <Route path="/addTask">
                        {console.log('When a task is added, state has, ',this.state.graphManager)}
                        <SigmaGraph updateGraph={this.updateGraphView}
                            project={selectedProjectName}
                            sendGraphData={this.saveCurrentGraph}
                            graphManager={this.state.graphManager}
                            userEmail={this.props.userEmail}
                        />
                    {this.state.answer && this.state.popUp&&<PopUpMessage text={this.state.answer}/>}
                                            
                    </Route>
                </Switch>
            </Router>
            
        ) ; 
    }

}

export default Graph ; 