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
                <p>Project Name : {project.projectName} </p>

                <p>Project Start Date: {project.startDate===null?
                <h6 className="project-alert-text">Start date not set </h6>:project.startDate}</p>
                
                <p>Project Due Date:{project.dueDate===null?
                <h6 className="project-alert-text">Due date not set </h6>:project.dueDate}</p>

                <div className="drop">
                   <span className="dropbtn">
                   <Link to="/addTask">Add Task
                   </Link>
                    </span>
                </div>
            </div>
        )
        return (
            <div>
                Create a Project
            </div>
        )
    }
}

export default ProjectView ; 