import React from 'react' ;
import { Link } from 'react-router-dom';
import '../css/common.css' ;
//Receives as a prop the poject to display
class ProjectView extends React.Component{
    constructor(props){
        super(props);
        this.state={
            editView:false
        }
    }
    viewProject = (project)=>{
     
        return(
            <>
            <p>Project Name : {project.projectName} </p>

            <p>Project Start Date: </p>{project.startDate===null?
            <h6 className="project-alert-text">Start date not set </h6>:project.startDate}
            
            <p>Project Due Date:</p>{project.dueDate===null?
            <h6 className="project-alert-text">Due date not set </h6>:project.dueDate}

            <>
            <br/>
            Members In Project

            <div>
                {project.groupMembers.map((value,index)=>{
                    return <div key={index}>{value.email}</div>
                })}
            </div>
            </>

            </>

        )
    }
    
    editView = (project)=>{
        return(
            <div className="edit">
                <div className="box">
                    
                    <button onClick={this.toggleView}>Close</button>
                    <button>Save</button>
                </div>
            </div>
        )
    }
    toggleView = ()=>{
        this.setState({
            editView:!this.state.editView
        })
    }
    render(){
        const EditPermissionRoles = ['owner','project manager']
        const EditGraphPermissionRoles = ['owner','project manager','developer']

        const project = this.props.projectToDisplay ; 
        
        const email = this.props.userEmail ;
        if (project !== undefined)
        return (
            <div>
                { //The role you have must allow you to have your permissions
                EditPermissionRoles.indexOf(project.role.toLowerCase())>=0 ?
                    <div >
                        <span>
                        <span onClick={this.toggleView}>{this.state.editView?'Project Details':'Edit Project'}
                        </span>
                    &nbsp;
                    &nbsp;
                    <Link to="/addTask">Edit Graph
                    </Link>
                    </span>
                </div>:<></>
             
                }
                {
                    this.state.editView ===false ? this.viewProject(project) :this.editView()
                }
               
            </div>
        )
        return (
            <div>
                Create a Project using the Create Project option on the Dashboard Menu 
            </div>
        )
    }
}

export default ProjectView ; 