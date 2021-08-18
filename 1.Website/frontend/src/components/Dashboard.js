import React from 'react' ; 
import Graph from './Graph';
import NewProject from './NewProject' ;
// import TaskList from './TaskList';
import Kanban from './Kanban';
import Reports from "./Reports";
import '../css/App.css' ;
import '../css/Dashboard.css'
import scrumBoard from '../images/scrum_board_l.svg'
import * as AiIcons from "react-icons/ai";
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

    toggleDisplayOpen = () =>{
        let elem = document.getElementById('modal1') ;
        if (elem !== null){
        // console.log('clicked', elem.style.display)
            elem.style.display='block' ;
            this.props.menuToogleClose() ; 
        }
    }

    toggleDisplayClose = () =>{
        let elem = document.getElementById('modal1') ;
        let navB = document.getElementById('modal2');
        if (elem !== null && navB !== null){
            elem.style.display='none' ;
            navB.style.display='none';
            this.props.menuToogleOpen()
        }
    }

    showProject = () =>{
       /* let elem = document.getElementById('proj');
        if(elem !== null){
            elem.style.display = 'block'
        }*/
    }

    render(){
        return (
           <div className="GraphDashboard">
            <Router>
                <span className="closeBtn" id="modal1">
                        <AiIcons.AiOutlineClose onClick={this.toggleDisplayClose} />
                </span>
                <div className="DashboardMenu" id="modal2">
                    <div className="App-link-routes">
                        <div className="opt" onClick={this.showProject}>
                            <Link  to="/newProject">Create Project</Link>
                        </div>
                        <div className="opt">
                            <Link to="/viewProjects">View Projects</Link>
                        </div>

                        <div className="opt">
                            <Link to="/Kanban">View Tasks</Link>
                        </div>
                        <div className="opt">
                            <Link to="/reports">Reports</Link>
                        </div>
                    </div>


                </div>

                {/* Default route for logging in */}
                
                <Switch>
                <Route path="/dashboard">

                        <img alt={"Scrum Board"} src={scrumBoard} className="scrumBoard" />
                        {/* Show projects*/}
                        {/*<img alt={"Graph Project Example"} src={`${this.props.api}/Dashboard1.png`}/>*/}

                    <div id="proj">

                    </div>
                </Route>
                    <Route path="/newProject" exact>
                        <NewProject  default={this.changeToDefault}
                                     userEmail={this.props.loggedUser}/>
                    </Route>
                    
                    <Route path="/viewProjects" >

                    {/* should call api for the projects and be able to display as per list  */}
                        <div className="ContentAreaView">
                            <Graph userEmail={this.props.loggedUser} />

                        </div>

                    </Route>

                    <Route path="/Kanban" >
                        <div className="ContentArea">
                            <Kanban userEmail={this.props.loggedUser} />
                        </div>
                    </Route>

                    <Route path="/reports">
                        <div className="ContentArea">
                            <Reports/>
                        </div>
                    </Route>
                </Switch>
            
            {this.toggleDisplayOpen()}
            </Router>
            </div>
        )
    }

} 



export default Dashboard ; 