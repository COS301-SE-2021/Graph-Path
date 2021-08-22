import React from 'react' ;
import '../css/Dashboard.css'
import {DatePicker, Dropdown, Icon, Nav, Sidenav} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css'
import NewProject from './NewProject';
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
            <Router>
                <div className="main-container">
                    <nav id="navbar"></nav>
                    <div id="content">
                        <div id="sidebar" >
                            <Sidenav>
                                <Sidenav.Body>
                                    <Nav>
                                        <Nav.Item icon={<Icon icon="dashboard"/>}>Dashboard</Nav.Item>
                                        <Link to="/createProject">  <Nav.Item icon={<Icon icon="project"/>}>New Project</Nav.Item></Link>
                                        <Dropdown title="Statistics" icon={<Icon icon="bar-chart"/>}>
                                            <Dropdown.Item>Overall</Dropdown.Item>
                                            <Dropdown.Item>Project</Dropdown.Item>
                                        </Dropdown>

                                    </Nav>

                                </Sidenav.Body>
                            </Sidenav>
                        </div>

                        <div id="main-content"></div>
                    </div>

                </div>
                <Switch>
                    <Route path="/createProject" render={()=>{
                        return(
                            <>
                            <NewProject />
                            </>
                        )
                    }}/>
                </Switch>
            </Router>
        )
    }
}

export default Dashboard ;