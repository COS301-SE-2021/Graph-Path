import React from 'react' ; 
import SigmaGraph from './SigmaGraph';
import Task from './Task' ;
import axios from 'axios';
import ProjectInfo from './ProjectView';
import '../css/common.css' ;
import {BrowserRouter as Router, Switch,Route,Link} from 'react-router-dom' ;
import * as FaIcons from "react-icons/fa";
import Spinner from 'react-spinner-material';


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
            api: "http://localhost:9001",
            loading:false
        }
    }
    //GET ALL Projects for User
    //Display List of Projects
    //Display  Graph on Click
    emptyGraph = () =>{
        var empty =  {
            nodes : [],
            edges : []
        } ;
        return empty ;
    }

    updateGraphView = () =>{
        if (this.state.grapRep === {}){
            // if graph rep from project was not undefined but empty
            this.setState({
                grapRep: this.emptyGraph() 
            }) ;  //make it empty with representation for graph viewing
        // console.log('updated from task: {}',this.state.grapRep) ;

        }
        else if (this.state.linkNumber >= 0 && this.state.projList.length > 0 && this.state.projList[this.state.linkNumber].graph.nodes !== undefined  ){
        //if there was a graph existing
            this.setState({
                grapRep:this.state.projList[this.state.linkNumber].graph
            }) ;
        // console.log('updated from task: not empty',this.state.grapRep) ;

        }
        else{
            this.setState({
                grapRep: this.emptyGraph() 
            })
        }
        // console.log('updated from task',this.state.grapRep) ;
        //else keep the default one, from mount
    }
    componentDidMount = ()=>{
        if (this.state.projList.length<1){ // no projects to display? 1 - call from api
            this.viewProjectsFromAPI() ;
        }

    }

    saveCurrentGraph = ()=>{
        const projNode = this.state.projNodeList ; 
        console.log('Saving to porjec',projNode.projectName,this.state.grapRep) ;

        if (this.state.linkNumber>=0 && projNode.projectName !== undefined ){
            //send current graph to project
            var saveGraph =  window.confirm('Save Current Graph?') ;
            if (saveGraph === true){ // if its not the same graph
                console.log('Saving to porjec',projNode.projectName,this.state.grapRep) ;
                const data = {
                    graph : this.state.grapRep
                }
                axios.put(`${this.state.api}/project/updateProjectGraph/${projNode.projectName}`,data)
                .then((res)=>{
                    if (res.data === undefined) {// didn't save
                        alert(res.message) ; 
                    }
                    else{
                        alert('sucess:',res.data) // wow
                    }
                })
                .catch((err)=>{
                    alert('saving failed',err)
                    console.log(err)
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
        console.log(node.projectName) ;
        if (node.graph === {} || node.graph === undefined || node.graph.nodes === undefined ){
            this.setState({
                projNodeList:node,
                grapRep:this.emptyGraph(),
                linkNumber:num
            }) ;
        }
        else{
            if (num >= 0) //valid link number
            this.setState({
                projNodeList:node,
                grapRep:node.graph,
                linkNumber:num
            }) ;
        }
    }
    viewProjectsFromAPI =()=>{
        // console.log('call to api') ;
        // axios.get('http://graphpath.herokuapp.com/Project/Demo_project')
        // fetch(`${this.state.api}/project/list`)
        
        //Display Loading State
        this.setState({
            loading:true
        }) ; 

        fetch(`${this.state.api}/project/getAllProjectsByUserEmail/${this.props.userEmail}`)
        .then(res=>res.json())
        .then(data => {
            console.log('from api req',data) ;
            const proj = data ;
            if (proj.data !== undefined ){
                this.setState({
                    projList:proj.data,
                    loading:false
                }) ; 
            }
            else{
                //no projects found from api
                this.setState({
                    loading:false
                }) ; 
                //If there was an error in location
                data.message === undefined?
                alert('Error:'+proj.error) 
                :alert(data.message) ; 
            }
        })    
        .catch(err =>{
            this.setState({
                loading:false
            }) ; 
            alert('Error'+err)
            console.log('error getting from /project/*',err) ; 
        }) ; 
        
        
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
    addNode = (fromTask) =>{
        // add the node and give it an id
        var curr = this.state.grapRep ; 
        var obj = {};// fromTask ;
        obj["label"] = fromTask.taskName ; // give it lable
        if (curr === {} || curr.nodes === undefined){ // there was no graph rep, attach epmpty one
            curr = this.emptyGraph() ; 
        }
        // if there was already a node?
        if (curr.nodes.length>0){
            obj["id"]= `n${curr.nodes.length+1}` ;
            curr.nodes.push(obj) ;
           
        }
        else{
            // add node with edge depending on self
            obj["id"]= `n1` ;
            curr.nodes.push(obj) ;
        }
        this.setState({
            grapRep:curr
        },()=>{console.log('state after add fromm task',this.state.grapRep)}) ;
        
        console.log('Trying to save',obj)

    }

    addEdge=(src,tgt)=>{
        var edg ;
        var curr = this.state.grapRep ; 

        edg = {id:`e${curr.edges.length+1}`, // give edge an id
            source:src, 
            target:tgt,
            label:`${src} to ${tgt}` 
        }
        curr.edges.push(edg) ;
        this.setState({
            grapRep:curr
        }) ; 
    }

    render(){
        console.log('Graph rerendering') ;

        // const graph1 = {
        //     nodes:[{id:"n1",label:"Task A"},{id:"n2",label:"Task B"},{id:"n3",label:"Task C"}],
        //     edges:[{id:"e1",source:"n1",target:"n2",label:"AB"},{id:"e2",source:"n2",target:"n3",label:"BC"}]
        // }
        // let listArray =  []; // [graph1,graph2] ; 
        let keyNum = -1 ;
        console.log('sending graph obj ',this.state)
        return (
            <Router>
                <div className="projectView">
                <Spinner color={"#0000f2"} radius={400} visible={this.state.loading} />

                   <span className="dropbtn clickbtn" title={"Click to display projects"} onClick={this.openProjectList}>
                        Projects  
                    </span>

                    <FaIcons.FaRecycle onClick={this.viewProjectsFromAPI} title={'refresh'}
                    className="icon clickbtn"/>
                        
                    <ul className="projList" id="userProjects">
                        {   this.state.projList !== undefined && Array.isArray(this.state.projList) &&
                            this.state.projList.length>0 ? // validate if it is an array and not empty
                            this.state.projList.map( (node) => {       
                                keyNum = keyNum+1 ;
                                return <li key={keyNum} > 
                                    <Link data-projnum={keyNum} data-project={node} className="project-content" 
                                    onClick={(e) =>{
                                    this.changeNodeList(node, e.target.getAttribute("data-projnum"))}}
                                    to={`/project/${keyNum}`}>{node.projectName}</Link>
                                </li>
                            })
                            : <span>
                                <h1>Project List is empty,<br/>
                                <p>Please refresh</p> or create a new project.</h1>
                            
                            </span>
                            
                        }
                    </ul>
                </div>
                
                <Switch>
                    <Route path={`/project/:${this.state.linkNumber}`}> 
                        <SigmaGraph key={this.state.linkNumber}
                            graphToDisplay={this.state.projList === undefined || this.state.projList.length <= 0  || this.state.linkNumber < 0 || this.state.grapRep.nodes ===undefined ? 
                            this.emptyGraph()
                            :this.state.projList[this.state.linkNumber].graph}
                            projectName={ this.state.projList.length>0 && this.state.linkNumber >= 0 ?
                            this.state.projList[this.state.linkNumber].projectName: "No Data Found"}
                            sendGraphData={this.saveCurrentGraph}
                            addEdge={this.addEdge}
                        />
                        <ProjectInfo projectToDisplay={this.state.linkNumber<0 ?''
                        :this.state.projList[this.state.linkNumber]} />
                    </Route>
                    <Route path="/addTask">
                        {console.log('When a task is added, state has, ',this.state)}
                        <SigmaGraph key={this.state.grapRep.nodes === undefined || this.state.grapRep.edges === undefined? "0" : 
                        `${this.state.grapRep.nodes.length}${this.state.grapRep.edges.length}`}
                            graphToDisplay={this.state.grapRep.nodes === undefined?
                            this.emptyGraph()
                            :this.state.grapRep}
                            projectName={ this.state.projList.length>0 && this.state.linkNumber >= 0 ?
                                this.state.projList[this.state.linkNumber].projectName: "No Data Found"}
                            sendGraphData={this.saveCurrentGraph}
                            addEdge={this.addEdge}

                        />
                        <Task addTask={this.addNode} 
                        updateGraphView={this.updateGraphView}
                        closeProjectListView={this.closeProjectList}
                        />
                    </Route>
                </Switch>
            </Router>
            
        ) ; 
    }

}

export default Graph ; 