import React from 'react' ;
import '../css/Dashboard.css' ;
import {Button, Dropdown, Icon, Nav, Sidenav} from 'rsuite';
import ProjectManager from './ProjectManager';
import { Link,Switch,Route, withRouter, Redirect} from 'react-router-dom' ;
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/md'
import Profile from "./Profile";
import Logout from "./Logout";
import Logo from "../img/Logo4.png";
import Kanban from './Kanban';
import { connect} from 'react-redux' ;
import RadarChart from "./RadarChart";
import PieChart from "./PieChart";
import Calendar from "./Calendar";
import BarChart from "./BarChart";


class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show:true,
            showSideBar: true,
            redirect:true,
            createResponse:'',
            viewOnly:false
            
        }
    }

    handleSideBar=()=>{
        this.setState({
            showSideBar: !this.state.showSideBar
        })
    }

    profileModalRef=(obj)=>{
        // console.log('ref0',obj) ;

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

    reloadProjectsInManager=(obj)=>{
        console.log('ref',obj) ;
        
    }

    render(){
        const {match} =this.props ;
        const picture = this.props.authUser.picture;
        // console.log("match",match)
        return(
            //  <Router>            
                <div data-testid="main-container-id" className="main-container">
                    {/* {this.reloadProjectsInManager()} */}
                    <Profile user={this.props.authUser} ref={this.profileModalRef} />
                    <nav id="nav-bar"  >
                        <div style={{display:"table-row"}}>
                            <div id="side-bar-button">
                                {
                                    this.state.showSideBar === true ?
                                        <IoIcons.MdClose id="btn-side-bar" onClick={this.handleSideBar} />
                                        :
                                    <FaIcons.FaBars id="btn-side-bar" onClick={this.handleSideBar} />


                                }
                            </div>
                            <img alt="graph logo" id="logo-pic" src={Logo}/>

                            {/*<div id="two-btn">*/}
                            {/*    <img src={picture} />*/}
                                <Button id="profile-btn" onClick={this.showP}>Profile</Button>
                                <Logout/>
                            {/*</div>*/}
                        </div>



                    </nav>
                    <div id="content">
                        {
                            this.state.showSideBar === true ?

                                <div id="sidebar">
                                    <Sidenav collapsible={"true"} id="side-nav">
                                        <Sidenav.Body>
                                            <Nav>
                                                <Nav.Item onClick={()=>this.changeRedirect(`${match.url}/manager`)}
                                                         id="nav-option"
                                                          icon={<Icon icon="dashboard"/>}
                                                          componentClass={Link}
                                                           to="/dashboard" >Dashboard</Nav.Item>
                                                {
                                                    this.state.viewOnly ?
                                                    <Dropdown title="View Only">
                                                        <Dropdown.Item>Own Project</Dropdown.Item>
                                                        <Dropdown.Item>Shared Project</Dropdown.Item>
                                                    </Dropdown>
                                                        :
                                                        <></>
                                                }

                                                <Nav.Item id="nav-option"
                                                          icon={<Icon icon="calendar"/>}
                                                          componentClass={Link}
                                                          to={`${match.url}/modal`} >Calendar</Nav.Item>

                                                <Nav.Item id="nav-option"
                                                          icon={<Icon icon="tasks"/>}
                                                          componentClass={Link}
                                                          to={`${match.url}/kanban`} >Kanban</Nav.Item>

                                                <Dropdown id="nav-option" title="Statistics" icon={<Icon icon="bar-chart"/>}>
                                                    <Dropdown.Item id="nav-option" componentClass={Link}
                                                                   to={`${match.url}/radarChart`}>Project Tasks</Dropdown.Item>
                                                    <Dropdown.Item id="nav-option" componentClass={Link}
                                                    to={`${match.url}/pieChart`}>Project Subtask</Dropdown.Item>
                                                    <Dropdown.Item id="nav-option" componentClass={Link}
                                                                   to={`${match.url}/barChart`}>Assigned Task</Dropdown.Item>
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
                                    {/*<Modal user={this.props.authUser} />*/}
                                    <Calendar user={this.props.authUser} />

                                </Route>
                                <Route path={`${match.path}/manager`} render={()=>{
                                    return <ProjectManager />
                                }} />
                                <Route path={`${match.path}/kanban`} render={()=>{
                                    return <Kanban user={this.props.authUser}/> }}/>
                                <Route path={`${match.path}/radarChart`} exact>
                                    <RadarChart user={this.props.authUser} />
                                </Route>
                                <Route path={`${match.path}/pieChart`} exact>
                                    <PieChart user={this.props.authUser} />
                                </Route>
                                <Route path={`${match.path}/barChart`} exact>
                                    <BarChart user={this.props.authUser} />
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
function updateUserToken(token){
    return {
      type:'UPDATE_TOKEN' ,
      payload: {
        token:token
      }
    }
  }

function mapStateToProps(state){
    return {
        loggedUser:state.loggedUser
    } ;
  }
  

const mapDispatchToProps = {
    updateUserToken,
  }

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Dashboard)) ;