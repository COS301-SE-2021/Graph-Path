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
            editView:false,
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


    viewProject = (project)=>{
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

                        <input id="btn1" disabled type="button" id="editBtn" value="Edit" />
                    </form>
                     <br/>
                     <Button id="div3" onClick={this.handleShow}>
                         View Members
                     </Button>

                     <Offcanvas show={this.state.show} onHide={this.handleClose}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Project Members</Offcanvas.Title>
                        </Offcanvas.Header>
                         <Offcanvas.Body>
                             {project.groupMembers.map((value,index)=>{
                                 return <div key={index}>{value.email}</div>
                             })}
                         </Offcanvas.Body>
                     </Offcanvas>



                </div>

            </div>

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
        const project = this.props.projectToDisplay ; 
        const email = this.props.userEmail ;
        if (project !== undefined)
        return (
            <div id="div1">
                   { //If project has groupManagers and u are one of them, you can edit, else just view
                        (project.groupManagers !== undefined && project.groupManagers.indexOf(email) > 0)||email === project.owner?
                            <div id="div2" >


                                    <span id="view-graph-div">
                                        <Link to="/addTask">View Graph</Link>
                                    </span>


                            </div>: <></>
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