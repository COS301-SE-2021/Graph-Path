import React from 'react' ;
import '../css/Dashboard.css' ;
import {Button, DatePicker, Dropdown, Icon, Nav, Sidenav} from 'rsuite';
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

    newProjectModalRef=(obj)=>{
        this.showModal = obj && obj.handleShow;
    }

    showM=()=>{
        this.showModal();
    }
    render(){
        return(
            // <Router>
            
                <div className="main-container">
                    <NewProject ref={this.newProjectModalRef}></NewProject>
                    <nav id="navbar"></nav>
                    <div id="content">
                        <div id="sidebar" >
                            <Sidenav>
                                <Sidenav.Body>
                                    <Nav>
                                        <Nav.Item id="nav-option" icon={<Icon icon="dashboard"/>}>Dashboard</Nav.Item>
                                          <Nav.Item id="nav-option" icon={<Icon icon="project"/>} onSelect={this.showM} > New Project</Nav.Item>
                                        <Dropdown title="Statistics" icon={<Icon icon="bar-chart"/>}>
                                            <Dropdown.Item>Overall</Dropdown.Item>
                                            <Dropdown.Item>Project</Dropdown.Item>
                                        </Dropdown>

                                    </Nav>

                                </Sidenav.Body>
                            </Sidenav>
                        </div>

                        <div id="main-content"> <ProjectManager /></div>

                </div>
                </div>
            // </Router>
        )
    }
}

export default Dashboard ;