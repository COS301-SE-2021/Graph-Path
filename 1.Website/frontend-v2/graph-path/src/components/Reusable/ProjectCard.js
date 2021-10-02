import React, { Component } from 'react';
import PropTypes from 'prop-types' ;
import {IconButton, Panel,Icon, Popover, Button, Whisper } from 'rsuite';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import "../../css/Common.css"

/*
* ProjectCard is used to display the minimal description about the project
* It Provides the following
*   1. A display of the projectName on the header.
*   2. A link to open the project - the path is provided in the props as well as the function to tell the parent the chosen project
*   3. An information box that allows for 
*     3.1 Deletion of project - it receives the function to do so in the props 
*     3.2 Shows the description of project - the project object is received through props
*     3.3 Editing the project - to save it receives the prop function to make the request.
*
*
*
*
*/

class ProjectCard extends Component { 
  render(){
    let {selectProject,deleteProject,project,link}= this.props ;
    const projectInfo = (
      <Popover title={`Project: ${project.projectName}`}>
        <div>            
        
        <p> Description: <br/>
        <Icon icon={'info-circle'}/> {project.projectDescription}</p>
        <br/>
        <p>Start Date: <br/>
        
        <Icon icon={'clock-o'}/>  {project.startDate}</p>

         <p>Project Owner: <br/>
          <Icon icon={'user-info'}/> {project.projectOwner}</p>
        </div>

        <br/>
        <div style={{textAlign:"right"}}>
            <Link id="pop-btn" className="rs-btn rs-btn-default" to={`${link}/edit`}  onClick={()=>selectProject(project)}>
                Edit Project
            </Link>
            <br/>
            <Button id="pop-btn" onClick={()=>deleteProject(project)}>
                Delete Project
            </Button>

        </div>

      </Popover>
    )

    const today = new Date() ;
    const date = format(today,'yyyy-MM-dd').toLowerCase() ;

    var colorClass = '';
    if (project.dueDate.toLowerCase()>date){
      colorClass = 'onlineProject'
    }
    else{
      colorClass = 'offlineProject';
    }

    return (
    <div>
        <Panel  shaded bordered bodyFill={true} style={{ display: 'inline-block', width: 240 }}
          className={`${colorClass}`}
        >
        <Panel shaded id="projHeader" header={`${project.projectName}`}>
          <div>
              <h6><span className={"card-title"}>Due Date: </span> {project.dueDate}</h6>
          <h6>
          <span className={"card-title"}>Last Edited:</span> {project.lastAccessed}
          </h6>
          </div>

          <Whisper trigger={'click'} placement={'autoVertical'} speaker={projectInfo}>
              <IconButton icon={ <Icon icon='info' />} >Information</IconButton>
          </Whisper>
          <br/>
          <br/>
          <IconButton icon={<Icon icon={'folder-open-o'}/>}
          componentClass={Link}
          id="open-card" 
          onClick={()=>selectProject(project)} 
          to={`${link}`}
          >Open</IconButton>
          {/* <Link id="open-card" onClick={()=>selectProject(project)} to={`${link}`}>Open</Link> */}
          <br/>
        </Panel>
      </Panel>
      </div>
    )}
}


ProjectCard.propTypes ={
  project:PropTypes.object.isRequired ,
  link:PropTypes.string ,
  selectProject:PropTypes.func ,
  deleteProject:PropTypes.func
}

export default ProjectCard ;


