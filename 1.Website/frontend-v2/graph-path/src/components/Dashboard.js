import React from 'react' ;
import '../css/Dashboard.css' ;
import {Button, Dropdown, Icon, Nav, Sidenav} from 'rsuite';
import NewProject from './NewProject';
import ProjectManager from './ProjectManager';
import { Link,Switch,Route, withRouter, Redirect} from 'react-router-dom' ;
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/md'
import Modal from "./Modal";
import Profile from "./Profile";
import Logout from "./Logout";


class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show:true,
            showSideBar: true,
            redirect:true
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

    profileModalRef=(obj)=>{
        this.showProfile = obj && obj.handleShow;
    }
    changeRedirect = (link)=>{
        this.setState({
            redirect:!this.state.redirect 
        }) ; 
        return <Redirect to={link} />
    }

    showP=()=>{
        this.showProfile();
    }

    render(){
        const {match} =this.props ; 
        return(
            //  <Router>
            
                <div className="main-container">
                    <NewProject ref={this.newProjectModalRef} />
                    <Profile ref={this.profileModalRef} />
                    <nav id="nav bar"  >
                        <div id="side-bar-button">
                            {
                                this.state.showSideBar === true ?
                                    <IoIcons.MdClose id="btn-side-bar" onClick={this.handleSideBar} />
                                    :
                                <FaIcons.FaBars id="btn-side-bar" onClick={this.handleSideBar} />

                                
                            }
                        </div>
                        <Button onClick={this.showP}>Profile</Button>

                        <Logout/>


                    </nav>
                    <div id="content">
                        {
                            this.state.showSideBar === true ?

                                <div id="sidebar">
                                    <Sidenav collapsible={true} id="side-nav">
                                        <Sidenav.Body>
                                            <Nav>
                                                <Nav.Item onClick={()=>this.changeRedirect(`${match.url}/manager`)}
                                                         id="nav-option"
                                                          icon={<Icon icon="dashboard"/>}
                                                          componentClass={Link}
                                                           to="/dashboard" >Dashboard</Nav.Item>


                                                <Nav.Item id="nav-option" icon={<Icon icon="project"/>}
                                                          onSelect={this.showM}> New Project</Nav.Item>

                                                <Nav.Item id="nav-option"
                                                          icon={<Icon icon="calendar"/>}
                                                          componentClass={Link}
                                                          to={`${match.url}/modal`} >Calendar</Nav.Item>

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
                                <Route path={`${match.path}/manager`}>
                                    <ProjectManager user={this.props.authUser}/>
                                </Route>
                            {
                                this.state.redirect?this.changeRedirect(`${match.url}/manager`):""
                            }
                                
                            </Switch>

                        </div>

                </div>
            </div>
            //  </Router>
        )
    }
}

export default withRouter(Dashboard) ;