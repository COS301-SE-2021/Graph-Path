import React from 'react' ;
import { Link } from 'react-router-dom';
import '../css/common.css' ;
import '../css/ProjectView.css'
import {Button, Offcanvas} from "react-bootstrap";

//Receives as a prop the project to display
class ProjectView extends React.Component{
    constructor(props){
        super(props);
        this.state={
            edit:false,
            show: false,

        }
    }

    handleClose = () =>{
        this.setState({
            show:false
        })
    }

    handleShow = () =>{
        this.setState({
            show: !this.state.show
        })
    }


    viewProject = (project,permissions)=>{
        console.log('project view',project,permissions)
        return(
            <div id="view-div">
                 <div id="project-form-div">
                    <form id="project-form">
                        <h3 style={{fontWeight:"bold"}}>Project Information</h3>
                        <label>Project Name</label>
                        <input
                            type='text'
                            defaultValue={project.projectName} disabled />

                        <label>Project Owner</label>
                        <input
                            type='text'
                            value={project.owner} disabled/>

                        <label>Start Date</label>
                        <input
                            type='text'
                            defaultValue={project.startDate} disabled />

                        <label>Due Date</label>
                        <input
                            type='text'
                            defaultValue={project.dueDate} disabled />

                        <input disabled={this.state.edit} type="button" id="editBtn" value="Edit" 
                        onClick={this.toggleView}/>
                    </form>
                     <br/>

                    {  permissions.indexOf(project.role.toLowerCase())>=0 ? 
                        <>
                        <Button id="div3" onClick={this.handleShow}>
                             View Members
                        </Button>
                        </>
                    :""}
                    
                     <Offcanvas show={this.state.show} onHide={this.handleClose}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Project Members</Offcanvas.Title>
                        </Offcanvas.Header>
                         <Offcanvas.Body>
                             {project.groupMembers.map((value,index)=>{
                                 console.log('from members',value)
                                 return <div key={index}>{value.email} {value.label}</div>
                             })}
                         </Offcanvas.Body>
                     </Offcanvas>



                </div>

            </div>

        )
    }


    toggleView = ()=>{
        console.log('change view',this.state.edit)
        this.setState({
            edit:!this.state.edit
        })
    }

    render(){
        const EditPermissionRoles = ['owner','project manager']

        const project = this.props.projectToDisplay ; 
        
        // const email = this.props.userEmail ;
        if (project !== undefined)
        return (
            <div id="div1">
                     <div id="div2" >
                       <span id="view-graph-div">
                            <Link to="/addTask">View Graph</Link>
                        </span>
            </div>: <></>
                

                {
                 this.viewProject(project,EditPermissionRoles) 
                }
               
            </div>
        )
        else{

            return (
                <div>
                    Create a Project using the Create Project option on the Dashboard Menu 
                </div>
            )
        }
    }
}

export default ProjectView ; 