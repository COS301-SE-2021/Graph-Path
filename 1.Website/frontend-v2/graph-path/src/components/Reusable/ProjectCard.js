import React, { Component } from 'react';
import PropTypes from 'prop-types' ;
import { Panel,Icon, Popover, Button, Whisper, Divider } from 'rsuite';
import { Link } from 'react-router-dom';
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
        <p>Description: {project.projectDescription}</p>
        <br/>

        <div>
          {/*Members: {*/}
          {/*  project.groupMembers !== undefined && project.groupMembers.length > 0 */}
          {/*  ? project.groupMembers.map((member,index)=>{*/}
          {/*    return <div key={index}>*/}
          {/*      <><Icon icon={'user-info'}/> { `${member.email}`} </>*/}
          {/*    </div>*/}
          {/*  })*/}
          {/*  :<h5>No Members Yet</h5>*/}
          {/*}*/}

         <p>Project Owner: {project.projectOwner}</p>
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

    return (
    <div>
        <Panel  shaded bordered bodyFill={false} style={{ display: 'inline-block', width: 240 }}
        >
        <Panel id="projHeader" header={`${project.projectName}`}>
          <div>
            {/*<small>Due Date: <h6>{project.dueDate}</h6> </small>*/}
              <h6>Due Date: {project.dueDate}</h6>
          </div>
          <h6>
              Last Edited: {project.lastAccessed}
          </h6>
          <Whisper trigger={'click'} placement={'autoVertical'} speaker={projectInfo}>
          <Icon icon='info' onClick={()=>console.log('clicked')}/>
          </Whisper>
          <br/>
          <Link id="open-card" onClick={()=>selectProject(project)} to={`${link}`}>Open</Link>
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


