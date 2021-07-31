import React from 'react' ;
import { Link } from 'react-router-dom';
import '../css/common.css'
//Receives as a prop the poject to display
class ProjectView extends React.Component{
    render(){
        const project = this.props.projectToDisplay ; 
        if (project !== undefined)
        return (
            <div>
                 <div >
                   <span className="dropbtn">
                   <Link to="/addTask">Edit Project
                   </Link>
                    </span>
                </div>
                <p>Project Name : {project.projectName} </p>

                <p>Project Start Date: </p>{project.startDate===null?
                <h6 className="project-alert-text">Start date not set </h6>:project.startDate}
                
                <p>Project Due Date:</p>{project.dueDate===null?
                <h6 className="project-alert-text">Due date not set </h6>:project.dueDate}

               
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