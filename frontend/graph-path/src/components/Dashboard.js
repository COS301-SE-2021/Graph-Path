import React from 'react' ; 
import GraphManager from './Graph';
import NewProject from './NewProject' ;
import '../css/App.css' ;
import '../css/Dashboard.css'
// import Sigma from './reactSigmaGraph' ; 
// import axios from 'axios' ;
import * as FaIcons from "react-icons/fa";
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
                        className="close" title="Close Menu">
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

                    {/* should call api for the projects and be able to display as per list  */}
                        <div className="ContentArea">
                            {/* Graph.js alias GraphManager */}
                            <GraphManager userEmail={this.props.loggedUser} /> 
                        </div>

                    </Route>
                </Switch>
            </div>
            {this.toogleDisplayOpen()}

            </Router>
        )
    }

} 



export default Dashboard ; 