import React from 'react' ;
import '../css/Dashboard.css' ;
import {DatePicker, Dropdown, Icon, Nav, Sidenav} from 'rsuite';
import NewProject from './NewProject';
import ProjectManager from './ProjectManager';
import {HashRouter as Router,Link,Switch,Route} from 'react-router-dom' ;

class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show:true
        }
    }

    // NewProjectRef=({handleShow})=>{
    //     this.showModal = handleShow;
    // }

    callCreateProj=()=>{


    }
    render(){
        return(
            // <Router>
            
                <div className="main-container">
                    <nav id="navbar"></nav>
                    <div id="content">
                        <div id="sidebar" >
                            <Sidenav>
                                <Sidenav.Body>
                                    <Nav>
                                        <Nav.Item icon={<Icon icon="dashboard"/>}>Dashboard</Nav.Item>
                                          <Nav.Item href="/createProject" icon={<Icon icon="project"/>}>New Project</Nav.Item>
                                        <Dropdown title="Statistics" icon={<Icon icon="bar-chart"/>}>
                                            <Dropdown.Item><Link to="/createProject">New</Link></Dropdown.Item>
                                            <Dropdown.Item>Project</Dropdown.Item>
                                        </Dropdown>

                                    </Nav>

                                </Sidenav.Body>
                            </Sidenav>
                        </div>

                        <div id="main-content"></div>
                    
                    <Switch>
                        <Route path="/dashboard" render={()=>{
                            return <>
                            <ProjectManager />
                        </>
                        }}/>
                        
                    <Route path="/createProject" render={()=>{
                        return(
                            <>
                            <NewProject />
                            </>
                        )
                    }}/>
                    </Switch>

                </div>
                </div>
            // </Router>
        )
    }
}

export default Dashboard ;