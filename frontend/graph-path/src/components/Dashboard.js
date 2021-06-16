import React from 'react' ; 
import Graph from './Graph';
import NewProject from './NewProject' ;
import '../css/App.css' ;
import '../css/Dashboard.css'
// import axios from 'axios' ;
import {BrowserRouter as Router, Switch,Route,Link} from 'react-router-dom' ;
import ViewGraph from './reactSigmaGraph' ;

class Dashboard extends React.Component{
    constructor(props){
        super(props) ; 
        this.views =  ["default", "newProject", "project"] ; 
        this.state={
            projects: null ,
            view: this.views[0] 
        } ;
    }
    
    viewProjectsFromAPI =()=>{
        // console.log('call to api') ;
        // axios.get('http://graphpath.herokuapp.com/Project/Demo_project')
        fetch('http://localhost:3000/Project/Demo_project1')
        .then(res =>res.json()) 
        .then(data => {
            // console.log(data) ;
            const proj = data ;
                this.setState({
                projects:proj
            }) ; 
        })        
        .catch(err =>{
            console.log('error getting from /project/*',err) ; 
        }
        )
    }
    
    defaultView = () =>{
        return ( 
            <div className="GraphDashboard">
                Dashboard
                <div>
                    <button onClick={this.createProject}>Create Project</button>
                    <button onClick={this.viewProjectsFromAPI}>View Projects</button>
                </div>
            </div>
        ) 
    }

    changeToDefault = () =>{
        this.setState({
            projects:null,
            view:this.views[0]
        })
    }

    render(){
        return (
            <Router>
            <div className="GraphDashboard">
                <div className="App-link-routes" >
                   <div id="opt">
                       <Link  to="/newProject">Create Project</Link>
                   </div>
                    <div id="opt">
                        <Link to="/viewProjects">View Projects</Link>
                    </div>

                </div>
                <Switch>
                    <Route path="/newProject">
                        <NewProject  default={this.changeToDefault}/>
                    </Route>
                    
                    <Route path="/viewProjects">
                    <Graph />
                    {/* should call api for the projects and be able to display as per list  */}
                    <ViewGraph /> 

                    </Route>
                </Switch>
            </div>
            </Router>
        )
    }

    // render(){
    //     if (this.state.projects === null && this.state.view === this.views[0]){
    //         //Default View,  When no project available and View is explicitly default
    //         return <this.defaultView />
    //     }
    //     else if (this.state.projects !== null) {
    //         //
    //         console.log(this.state.projects) ;
    //         //retrieve the projects and start working from there
    //         return (
    //             <div>
    //                 <ProjectView default={this.changeToDefault} proj={this.state.projects.Name}/>
    //                 <Graph project={this.state.projects}/>
    //                 </div>
    //             ) 
    //     }
    //     else if (this.state.view === "newProject"){
    //         return (
    //             <div className="NewProject">
    //                 <ProjectView proj={this.views[1]} />
    //                 <NewProject default={this.changeToDefault} />
    //             </div>
    //         )
    //     }
    //     else{
    //         return ( 
    //             <div className="GraphDashboard">
    //                 Dashboard Default View
    //                 <div>
    //                     <button onClick={this.createProject}>Create Project</button>
    //                 </div>
    //             </div>
    //         ) ;
    //     }
    // }
} 



export default Dashboard ; 