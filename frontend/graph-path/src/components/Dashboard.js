import React from 'react' ; 
import GraphManager from './Graph';
import NewProject from './NewProject' ;
import '../css/App.css' ;
import '../css/Dashboard.css'
import Sigma from './reactSigmaGraph' ; 
// import axios from 'axios' ;
import {BrowserRouter as Router, Switch,Route,Link} from 'react-router-dom' ;

class Dashboard extends React.Component{
    constructor(props){
        super(props) ; 
        this.views =  ["default", "newProject", "project"] ; 
        this.state={
            projects: null ,
            view: this.views[0] 
        } ;
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

    toogleDisplayOpen = () =>{
        var elem = document.getElementById('modal1') ;
        if (elem !== null){
        // console.log('clicked', elem.style.display)
            elem.style.display='block' ;
            this.props.menuToogleClose() ; 
        }
    }

    toogleDisplayClose = () =>{
        var elem = document.getElementById('modal1') ;
        if (elem !== null){
            elem.style.display='none' ;
            this.props.menuToogleOpen()
        }
    }        
    

    render(){
        return (
            <Router>
            <div className="GraphDashboard">
                <div className="DashboardMenu" id="modal1" >
                    <div className="App-link-routes" >
                        <div className="opt">
                        <span onClick={this.toogleDisplayClose} 
                        className="close" title="Close Modal">
                        &times;</span>
                    </div>
                    <div className="opt">
                        <Link  to="/newProject">Create Project</Link>
                    </div>
                        <div className="opt">
                            <Link to="/viewProjects">View Projects</Link>
                        </div>

                    </div>
                </div>
                <Switch>
                    <Route path="/newProject">
                        <div className="ContentArea">
                            <NewProject  default={this.changeToDefault}
                            userEmail={this.props.loggedUser}/>
                        </div>
                    </Route>
                    
                    <Route path="/viewProjects">
                    {/* <Graph /> */}

                    {/* should call api for the projects and be able to display as per list  */}
                        <div className="ContentArea">
                            <GraphManager userEmail={this.props.loggedUser} /> 
                        </div>

                    </Route>
                </Switch>
            </div>
            {this.toogleDisplayOpen()}

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