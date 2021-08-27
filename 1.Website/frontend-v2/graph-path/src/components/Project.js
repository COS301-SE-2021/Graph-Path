import {React,Component} from 'react' ;
import PropTypes from 'prop-types';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import GraphPath from './Graph';
import axios from 'axios';
import { Icon, Nav, Navbar, Sidebar, Sidenav } from 'rsuite';
import '../css/Common.css'

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
    componentDidMount(){
        this.viewAllTasksForProject() ;
    }
    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }
    viewAllTasksForProject = ()=>{
        if (this.props.project !== undefined){
            const projectId = this.props.project._id ;
            axios.get(`${this.props.api}/task/getAllTasksByProject/${projectId}`)
            .then((res)=>{
                console.log('Tasklist',res) ;
                if (res.data.data !== undefined){
                    this.setState({
                        taskList:res.data.data ,
                        loading:false 
                    }) ;
                }
                else{
                    this.setState({
                        loading:false 
                    }) ;
                }
            })
            .catch((err)=>{
                console.log('Error',err)
                this.setState({
                    loading:false 
                }) ;

            })
        }

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
                            icon={<Icon icon={'pencil'}/>}
                            componentClass={Link}
                            to={`${match.url}/edit`}>EDIT Project

                        </Nav.Item>
                        <Nav.Item
                            icon={<Icon icon={'views-authorize'}/>}
                            componentClass={Link}
                            to={`${match.url}`}>VIEW GRAPH
                        </Nav.Item>
                    </Nav>
                        </Sidenav.Body>
                    </Sidebar>
                    

                    <Switch>
                        <Route exact path={`${match.path}`} render={()=>{
                            return <GraphPath project={project} graph={project.graph}/>
    
                        }} />
                        <Route path={`${match.path}/edit`} render={()=>{
                            return <>
                          <h1>
                          PROJECT : {project.projectName}
                              </h1> 
                            </>
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
    api:PropTypes.string
}

export default withRouter(Project) ;