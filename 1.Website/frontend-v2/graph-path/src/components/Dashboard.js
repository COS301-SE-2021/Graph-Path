import React from 'react' ;
import '../css/Dashboard.css' ;
import {Button, DatePicker, Dropdown, Icon, Nav, Sidenav} from 'rsuite';
import NewProject from './NewProject';
import ProjectManager from './ProjectManager';
import {HashRouter as Router,Link,Switch,Route, withRouter} from 'react-router-dom' ;
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/md'
import NotFound from "./NotFound";
import Modal from "./Modal";

class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show:true,
            showSideBar: true
        }
    }

    handleSideBar=()=>{
        this.setState({
            showSideBar: !this.state.showSideBar
        })
    }

    newProjectModalRef=(obj)=>{
        this.showModal = obj && obj.handleShow;
    }

    showM=()=>{
        this.showModal();
    }
    render(){
        console.log(this.props) ; 
        const {match} =this.props ;
        return(
            //  <Router>
            
                <div className="main-container">
                    <NewProject ref={this.newProjectModalRef} />
                    <nav id="navbar"  >
                        <div id="side-bar-button">
                            {
                                this.state.showSideBar === true ?
                                    <IoIcons.MdClose id="btn-side-bar" onClick={this.handleSideBar} />
                                    :
                                <FaIcons.FaBars id="btn-side-bar" onClick={this.handleSideBar} />
                            }
                        </div>

                        <div id="power-off-div">
                            <FaIcons.FaPowerOff id="power-off-icon" />
                        </div>


                    </nav>
                    <div id="content">
                        {
                            this.state.showSideBar === true ?

                                <div id="sidebar">
                                    <Sidenav collapsible id="side-nav">
                                        <Sidenav.Body>
                                            <Nav>
                                                <Nav.Item id="nav-option"
                                                          icon={<Icon icon="dashboard"/>}
                                                          componentClass={Link}
                                                           to="/dashboard" >Dashboard</Nav.Item>
                                                           
                                                <Nav.Item id="nav-option"
                                                          icon={<Icon icon="info"/>}
                                                          componentClass={Link}
                                                           to={`${match.url}/modal`} >Modal</Nav.Item>

                                                <Nav.Item id="nav-option" icon={<Icon icon="project"/>}
                                                          onSelect={this.showM}> New Project</Nav.Item>
                                                <Dropdown title="Statistics" icon={<Icon icon="bar-chart"/>}>
                                                    <Dropdown.Item>Overall</Dropdown.Item>
                                                    <Dropdown.Item>Project</Dropdown.Item>
                                                </Dropdown>

                                            </Nav>

                                        </Sidenav.Body>
                                    </Sidenav>
                                </div>
                                :
                                <></>
                        }
                        {/*main content div contains all other pages*/}
                        <div id="main-content">
                            <Switch>
                                <Route path={`${match.path}/modal`} exact>
                                    <Modal />
                                </Route>
                                <Route path={`${match.path}/`}>
                                    <ProjectManager />
                                </Route>
                                
                            </Switch>

                        </div>

                </div>
            </div>
            //  </Router>
        )
    }
}

export default withRouter(Dashboard) ;