import React,{ Component, } from 'react' ;
import PropTypes from 'prop-types';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import GraphPath from './Graph';
import { Divider, Drawer, Icon, Nav, Popover, Sidebar, Sidenav, Whisper} from 'rsuite';
import '../css/Common.css'
import ProjectInformation from "./ProjectInformation";
import ChatRoom from "./Reusable/ChatRoom";

/*
*   Project provides a view to the graph of the project
*   Project is also able to 
*       1. Edit the name of the project. 
*       2. Attach Members to the project. 
*       3. Show Graph for each project
*   The Project is received as a prop. It is the able to share the information with other components 
*
*
*
*
*
*


*/



class Project extends Component {
    constructor(props){
        super(props) ; 
        this.state = {
            taskList : [],
            showChat:false
        }
    }
    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    handleChatRoom=()=>{
        this.setState({
            showChat:false
        })
    }

    showChatRoom=()=>{
        this.setState({
            showChat:true
        })
    }

    render(){
        const {match} = this.props ;
        console.log('PRoj',this.props)
        const {project} = this.props
        const helpers = (<Popover>
            <div id="help-bar">
                <p>To delete text, double click on the text</p>
            </div>


        </Popover>)
        if (project === undefined || project.projectName === undefined){
            return (<div>
                Please Select Project
            </div>)
        }
        else{
            return (
                <>

                    <Drawer
                        size={"sm"}
                        placement={"right"}
                        show={this.state.showChat}
                        onHide={this.handleChatRoom}
                    >
                        <Drawer.Header>
                            <Drawer.Title>{project.projectName} Collaborative Space</Drawer.Title>
                            {/*<Button id="btn-delete" onClick={() => chat.current.deleteAllChats(project._id)}>Delete All Chats</Button>*/}
                            <div id="chat-info" >
                                <Whisper placement={'auto'} trigger={'active'} speaker={helpers}>
                                    <Icon title="To delete text, double click on the text" icon={'help-o'} size={'1x'}/>
                                </Whisper>

                            </div>
                            <Divider />
                        </Drawer.Header>
                        <Drawer.Body>
                            <section>
                                <ChatRoom project={this.props.project} user={this.props.user} />
                            </section>
                        </Drawer.Body>
                    </Drawer>

                <div data-testid="tidProjectView" id="projectView">
                    {/* EDIT|VIEW GRAPH|ADD MEMBERS */}
                    <Sidebar  id="projectNav" collapsible={true}>
                        <Sidenav.Body>
                        <Nav pullRight vertical>
                        <Nav.Item 
                            title="Edit Project"
                            icon={<Icon icon={'pencil'}/>}
                            componentClass={Link}
                            to={`${match.url}/edit`}>Edit Project

                        </Nav.Item>
                        <Nav.Item
                            title="View Graph"
                            icon={<Icon icon={'views-authorize'}/>}
                            componentClass={Link}
                            to={`${match.url}`}>View Graph
                        </Nav.Item>
                            <Nav.Item
                                title="Open Chat"
                                icon={<Icon icon={'wechat'}/>}
                                onSelect={this.showChatRoom}
                                >Open Chat
                            </Nav.Item>
                    </Nav>
                        </Sidenav.Body>
                    </Sidebar>
                    

                    <Switch>
                        <Route exact path={`${match.path}`} render={()=>{
                            return <GraphPath api={this.props.api} updateParent={this.props.selectProject} project={project} user={this.props.user}/>
    
                        }} />
                        <Route path={`${match.path}/edit`} render={()=>{
                           return <ProjectInformation api={this.props.api} project={project}  user={this.props.user}/>
                        }} 
                        />
                    </Switch>
                </div>

                </>
            )
        }
    }
}


Project.propTypes = {
    project : PropTypes.object.isRequired,
    api:PropTypes.string, 
    selectProject:PropTypes.func.isRequired ,
    user:PropTypes.object.isRequired
}

export default withRouter(Project) ;