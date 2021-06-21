import React from 'react' ; 
import SigmaGraph from './SigmaGraph';
import Task from './Task' ;

import '../css/common.css' ;
import {BrowserRouter as Router, Switch,Route,Link} from 'react-router-dom' ;

class Graph extends React.Component{

    constructor(props){
        super(props) ; 
        this.state=  {
            NodeList: "",//{
            //     nodes:[{id:"n1",label:"Task A"},{id:"n2",label:"Task B"}],
            //     edges:[{id:"e1",source:"n1",target:"n2",label:"AB"},]
            // },
            linkNumber : -1,
            projList: [] ,
            grapRep: {
                nodes:[{id:"n1",label:"Task A"},{id:"n2",label:"Task B"},{id:"n3",label:"Task C"}],
                edges:[{id:"e1",source:"n1",target:"n2",label:"AB"},{id:"e2",source:"n2",target:"n3",label:"BC"}]
            
            },
            api: "http://localhost:9001"
        }
    }
    //GET ALL Projects for User
    //Display List of Projects
    //Display  Graph on Click
    render(){
        console.log('Graph rerendering') ;

        const graph1 = {
            nodes:[{id:"n1",label:"Task A"},{id:"n2",label:"Task B"},{id:"n3",label:"Task C"}],
            edges:[{id:"e1",source:"n1",target:"n2",label:"AB"},{id:"e2",source:"n2",target:"n3",label:"BC"}]
        }
        let listArray =  []; // [graph1,graph2] ; 
        let keyNum = -1 ;
        console.log('sending graph obj ',this.state.NodeList)
        return (
            <Router>
                <div className="drop">
                   <span className="dropbtn">
                        Projects
                    </span>
                    <ul className="projList" >
                        {
                            this.state.projList.map( i => {       
                                keyNum = keyNum+1 ;
                                return <li key={keyNum} > 
                                    <Link data-projnum={keyNum} className="dropdown-content" 
                                    onClick={(e) =>{
                                    this.changeNodeList(i, e.target.getAttribute("data-projnum"))}}
                                    to={`/project/${keyNum}`}>{i.projectName}</Link>
                                </li>
                            })
                            
                        }
                    </ul>
                </div>
                <div className="drop">
                   <span className="dropbtn">
                   <Link to="/addTask">Add Task
                   </Link>
                    </span>
                </div>
                
                <Switch>
                    <Route path={`/project/:${this.state.linkNumber}`}> 
                        <SigmaGraph key={this.state.linkNumber}
                            graphToDisplay={this.state.NodeList}
                        />
                    </Route>
                    <Route path="/addTask">
                        <Task addTask={this.addNode} />

                        <SigmaGraph key={this.state.grapRep}
                            graphToDisplay={this.state.grapRep}
                        />
                    </Route>
                </Switch>
            </Router>
            
        ) ; 
    }
    componentDidMount = ()=>{
        if (this.state.projList.length<1){
            this.viewProjectsFromAPI() ;
        }

    }

    changeNodeList = (node,num) =>{
        this.setState({
            NodeList:node,
            linkNumber:num
        }) ;
    }
    viewProjectsFromAPI =()=>{
        // console.log('call to api') ;
        // axios.get('http://graphpath.herokuapp.com/Project/Demo_project')
        fetch(`${this.state.api}/project/list`)
        .then(res=>res.json())
        .then(data => {
            // console.log(data) ;
            const proj = data ;
                this.setState({
                projList:proj.data
            }) ; 
        })        
        .catch(err =>{
            console.log('error getting from /project/*',err) ; 
        }
        )
    }
    addNode = (fromTask) =>{
        var curr = this.state.grapRep ; 
        var obj = {};// fromTask ;
        if (curr.nodes.length>0){
            obj["id"]= `n${curr.nodes.length+1}` ;
            curr.nodes.push(obj) ;
            var edg = {id:`e${curr.edges.length+1}`,
                source:`n${curr.nodes.length-1}`, //because i pushed before here 
                target:`n${curr.nodes.length}`, 
            }
            curr.edges.push(edg) 
        }
        else{
            // add node with edge depending on self
            obj["id"]= `n1` ;
            curr.nodes.push(obj) ;
            var edg = {id:"e1", source:"n1", target:"n1"} 
            curr.edges.push(edg) ;
            console.log('curr',curr) ;
            
        }
        this.setState({
            grapRep:curr
        }) ;
        
        obj["label"] = fromTask.taskName ;
        console.log('Trying to save',obj)

    }

}

export default Graph ; 