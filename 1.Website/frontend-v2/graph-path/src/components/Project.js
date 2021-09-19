import {React,Component} from 'react' ;
import PropTypes from 'prop-types';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import GraphPath from './Graph';
import { Icon, Nav, Sidebar, Sidenav } from 'rsuite';
import '../css/Common.css'
import ProjectInformation from "./ProjectInformation";

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
            taskList : []
        }
    }
    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    render(){
        const {match} = this.props ;
        // console.log('PRoj',this.props)
        const {project} = this.props
        if (project === undefined || project.projectName === undefined){
            return (<div>
                Please Select Project
            </div>)
        }
        else{
            return (
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
                    </Nav>
                        </Sidenav.Body>
                    </Sidebar>
                    

                    <Switch>
                        <Route exact path={`${match.path}`} render={()=>{
                            return <GraphPath updateParent={this.props.selectProject} project={project} user={this.props.user}/>
    
                        }} />
                        <Route path={`${match.path}/edit`} render={()=>{
                           return <ProjectInformation project={project}  user={this.props.user}/>
                        }} 
                        />
                    </Switch>
                </div>
            )
        }
    }
}

Project.defaultProps = {
    api:'http://localhost:9001'
}

Project.propTypes = {
    project : PropTypes.object.isRequired,
    api:PropTypes.string, 
    selectProject:PropTypes.func.isRequired ,
    user:PropTypes.object.isRequired
}

export default withRouter(Project) ;