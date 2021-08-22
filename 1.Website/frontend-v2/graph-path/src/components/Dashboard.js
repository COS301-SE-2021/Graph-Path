import React from 'react' ;
import '../css/Dashboard.css'
import {DatePicker, Dropdown, Icon, Nav, Sidenav} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css'
import NewProject from './NewProject';
import ProjectManager from './ProjectManager';
import { Route, Switch } from 'react-router-dom';

class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show:false
        }
    }

    // NewProjectRef=({handleShow})=>{
    //     this.showModal = handleShow;
    // }

    callCreateProj=()=>{


    }
    render(){
        return(
            <div className="main-container" data-testid="tidDashboard">
                <nav id="navbar"></nav>
                <div id="content">
                    <div id="sidebar" >

                        <NewProject />
                        <Sidenav>
                            <Sidenav.Body>
                                <Nav>
                                    <Nav.Item icon={<Icon icon="dashboard"/>}>Dashboard</Nav.Item>
                                    <Nav.Item icon={<Icon icon="project"/>} onSelect={this.callCreateProj}>New Project</Nav.Item>
                                    <Dropdown title="Statistics" icon={<Icon icon="bar-chart"/>}>
                                        <Dropdown.Item>Overall</Dropdown.Item>
                                        <Dropdown.Item>Project</Dropdown.Item>
                                    </Dropdown>

                                </Nav>

                            </Sidenav.Body>
                        </Sidenav>
                    </div>
                    <Switch>
                        <Route path="/dashboard" render={()=>{
                            return <>
                            <ProjectManager />
                        </>
                        }}/>
                    </Switch>

                    <div id="main-content"></div>
                </div>

            </div>
        )
    }
}

export default Dashboard ;