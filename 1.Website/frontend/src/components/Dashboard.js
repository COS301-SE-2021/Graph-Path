import React from 'react' ; 
import Graph from './Graph';
import NewProject from './NewProject' ;
import TaskList from './TaskList';
import '../css/App.css' ;
import '../css/Dashboard.css'
// import Sigma from './reactSigmaGraph' ; 
// import axios from 'axios' ;
import { BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom' ;

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
           <div className="GraphDashboard">
            <Router>
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

                        <div className="opt">
                            <Link to="/taskList">View Tasks</Link>
                        </div>
                        <div className="opt">
                            <Link to="">Reports</Link>
                        </div>
                    </div>
                </div>
                {/* Default route for logging in */}
                
                <Switch>
                <Route path="/dashboard">
                    <div className="imgContainer">
                       <p> Images of what can be done with the graph path are displayed </p>
                        <img alt={"Graph Project Example"} src={`${this.props.api}/Dashboard1.png`}/>
                    </div>
                </Route>
                    <Route path="/newProject" exact>
                        <div className="ContentArea">
                            <NewProject  default={this.changeToDefault}
                            userEmail={this.props.loggedUser}/>
                        </div>
                    </Route>
                    
                    <Route path="/viewProjects" >

                    {/* should call api for the projects and be able to display as per list  */}
                        <div className="ContentArea">
                            <Graph userEmail={this.props.loggedUser} /> 
                        </div>

                    </Route>

                    <Route path="/taskList" >
                        <div className="ContentArea">
                            <TaskList/>
                        </div>
                    </Route>
                </Switch>
            
            {this.toogleDisplayOpen()}
            </Router>
            </div>
        )
    }

} 



export default Dashboard ; 