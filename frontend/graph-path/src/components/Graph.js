import React from 'react' ; 
import SigmaGraph from './SigmaGraph';
import Task from './Task' ;
// import axios from 'axios';
import ProjectInfo from './ProjectView';
import '../css/common.css' ;
import {BrowserRouter as Router, Switch,Route,Link} from 'react-router-dom' ;

class Graph extends React.Component{

    constructor(props){
        super(props) ; 
        this.state=  {
            projNodeList: "",
            linkNumber : -1,
            projList: [] ,
            grapRep: {
                nodes : [],
                edges : []
            },
            api: "http://localhost:9001"
        }
    }
    //GET ALL Projects for User
    //Display List of Projects
    //Display  Graph on Click
    
    updateGraphView = () =>{
        //if there was a graph existing
        if (this.state.projList[this.state.linkNumber] !== undefined && this.state.projList.length <= 0 && this.state.linkNumber < 0 ){
            this.setState({
                grapRep:this.state.projList[this.state.linkNumber]
            }) ;
        }
        //else keep the default one
    }
    componentDidMount = ()=>{
        if (this.state.projList.length<1){ // no projects to display
            this.viewProjectsFromAPI() ;
        }
        else{

        }

    }

    saveCurrentGraph = ()=>{

    }

    changeNodeList = (node,num) =>{
        console.log(node.projectName) ;
        this.setState({
            projNodeList:node,
            linkNumber:num
        }) ;
    }
    viewProjectsFromAPI =()=>{
        // console.log('call to api') ;
        // axios.get('http://graphpath.herokuapp.com/Project/Demo_project')
        // fetch(`${this.state.api}/project/list`)
        fetch(`${this.state.api}/project/getAllProjectsByUserEmail/${this.props.userEmail}`)
        .then(res=>res.json())
        .then(data => {
            console.log('from api req',data) ;
            const proj = data ;
            if (proj.message !== undefined && typeof proj.message !== String){
                this.setState({
                    projList:proj.message
                }) ; 
            }
            else{
                //no projects found from api
            }
        })        
        .catch(err =>{
            console.log('error getting from /project/*',err) ; 
        }
        )
    }
    addNode = (fromTask) =>{
        var curr = this.state.grapRep ; 
        var obj = {};// fromTask ;
        var edg ;
        if (curr.nodes.length>0){
            obj["id"]= `n${curr.nodes.length+1}` ;
            curr.nodes.push(obj) ;
            edg = {id:`e${curr.edges.length+1}`,
                source:`n${curr.nodes.length-1}`, //because i pushed before here 
                target:`n${curr.nodes.length}`, 
            }
            curr.edges.push(edg) 
        }
        else{
            // add node with edge depending on self
            obj["id"]= `n1` ;
            curr.nodes.push(obj) ;
            edg = {id:"e1", source:"n1", target:"n1"} 
            curr.edges.push(edg) ;
            console.log('curr',curr) ;
            
        }
        this.setState({
            grapRep:curr
        },()=>{console.log(this.state.grapRep)}) ;
        
        obj["label"] = fromTask.taskName ;
        console.log('Trying to save',obj)

    }

    addEdge=()=>{

    }

    render(){
        console.log('Graph rerendering') ;

        // const graph1 = {
        //     nodes:[{id:"n1",label:"Task A"},{id:"n2",label:"Task B"},{id:"n3",label:"Task C"}],
        //     edges:[{id:"e1",source:"n1",target:"n2",label:"AB"},{id:"e2",source:"n2",target:"n3",label:"BC"}]
        // }
        // let listArray =  []; // [graph1,graph2] ; 
        let keyNum = -1 ;
        console.log('sending graph obj ',this.state.projNodeList)
        return (
            <Router>
                <div className="projectView">
                   <span className="dropbtn">
                        Projects
                    </span>
                    <ul className="projList" >
                        {   this.state.projList !== undefined && Array.isArray(this.state.projList) &&
                            this.state.projList.length>0 ? 
                            this.state.projList.map( i => {       
                                keyNum = keyNum+1 ;
                                return <li key={keyNum} > 
                                    <Link data-projnum={keyNum} className="project-content" 
                                    onClick={(e) =>{
                                    this.changeNodeList(i, e.target.getAttribute("data-projnum"))}}
                                    to={`/project/${keyNum}`}>{i.projectName}</Link>
                                </li>
                            })
                            : <h1>Project List is empty,<br/>
                            please create a new project.</h1>
                            
                        }
                    </ul>
                </div>
                
                <Switch>
                    <Route path={`/project/:${this.state.linkNumber}`}> 
                        <SigmaGraph key={this.state.linkNumber}
                            graphToDisplay={this.state.projList === undefined || this.state.projList.length <= 0  || this.state.linkNumber < 0 ? 
                            {}
                            :this.state.projList[this.state.linkNumber].graph}
                        />
                        <ProjectInfo projectToDisplay={this.state.linkNumber<0 ?''
                        :this.state.projList[this.state.linkNumber]} />
                    </Route>
                    <Route path="/addTask">
                        {console.log('When a task is added, state has, ',this.state)}
                        <SigmaGraph key={this.state.grapRep.nodes.length}
                            graphToDisplay={this.state.grapRep}
                            projectName={ this.state.projList.length>0 && this.state.linkNumber >= 0 ?
                                this.state.projList[this.state.linkNumber].projectName: ""}
                        />
                        <Task addTask={this.addNode} 
                        updateGraphView={this.updateGraphView}
                        />

                    </Route>
                </Switch>
            </Router>
            
        ) ; 
    }

}

export default Graph ; 