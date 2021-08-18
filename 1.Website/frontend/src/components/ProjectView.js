import React from 'react' ;
import { Link } from 'react-router-dom';
import '../css/common.css' ;
import '../css/ProjectView.css'
import PopUpMessage from "./PopUpMessage";
import {Button, Offcanvas} from "react-bootstrap";
import * as HiIcons from "react-icons/hi";
import * as FaIcons from "react-icons/fa";
import axios from "axios";



//Receives as a prop the project to display
class ProjectView extends React.Component{
    constructor(props){
        super(props);
        this.state={
            edit:false,
            show: false,
            projName:'',
            projectOwner:'',
            startD: '',
            dueD:'',
            empty : false,
            api:'http://localhost:9001',
            answer:'',
            popUp: false,
            popUpText: "",
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

    /* disable and enable the pop up*/
    showPopUP = () =>{
        this.setState({
            popUp: true
        })
        setTimeout(
            () =>
                this.setState({
                    popUp: false
                }),5000
        );
    }

    change = (e)=>{
        e.preventDefault();
        const {name,value} = e.target;
        this.setState({ [name]: value })

    }

    onSubmit = (e)=>{
        e.preventDefault();
        console.log("submitted",this.state)

        const data = {
            projectName:'',
            dueDate: '',
            startDate: '',
            owner: this.props.projectToDisplay.owner,
            graph: this.props.projectToDisplay.graph,
            groupMembers: this.props.projectToDisplay.groupMembers
        }

        console.log("props",this.props.projectToDisplay)
        if(this.state.empty === true){

        }else{
            if(this.state.projName === ''){
                data.projectName = this.props.projectToDisplay.projectName; //no change
            }else{
                data.projectName = this.state.projName; //change
            }

            if(this.state.startD === ''){
                data.startDate = this.props.projectToDisplay.startDate;
            }else{
               data.startDate = this.state.startD;
            }

            if(this.state.dueD === ''){
              data.dueDate = this.props.projectToDisplay.dueDate;
            }else{
               data.dueDate = this.state.dueD;
            }
            this.sendData(data);
            console.log("data",data)
            this.setState({
                edit: false
            })

            this.setState({
                popUpText: "Project Information Updated"
            });
            this.showPopUP()
        }

    }


    sendData = (data)=>{
        try{
            axios.put(`${this.state.api}/project/updateEverythingProject/${this.props.projectToDisplay._id}`,data)
                .then((response)=>{
                    if(response.status === 400){
                        throw Error(response.statusText);
                    }

                    const res = response.data;

                    this.setState({
                        answer: res.message
                    },()=>{
                        if (this.state.answer !== undefined) {
                            //alert(`Username or Password changed `)
                            //this.props.updateUser(data)

                        } else {
                            alert(`Something went wrong please update again `)
                        }
                    })
                },(response)=>{
                    console.log('rejected', response);
                    alert('Server Error, Please try again later');
                })
        }catch (error){
            console.log(error)
        }
    }

    removeMember = (email)=>{
        console.log("email",email)
        try{
            axios.patch(`${this.state.api}/project/removeProjectMember/${this.props.projectToDisplay._id}/${email}`)
                .then((response)=>{
                    if(response.status === 400){
                        throw Error(response.statusText);
                    }

                    const res = response.data;

                    this.setState({
                        answer:res.message
                    },()=>{
                        if(this.state.answer !== undefined){
                            this.setState({
                                popUpText: email+" has been removed from the project."
                            });
                            this.showPopUP()
                        }else{
                            alert("something went wrong please remove again")
                        }
                    })
                },(response)=>{
                    console.log('rejected',response);
                    alert('Server Error, Please try again later')
                })
                .then(()=>{
                   //instant update
                })
        }catch(error){
            console.log(error);
        }
    }


    viewProject = (project,permissions)=>{
        // console.log('project view',project,permissions)
        return(
            <div id="view-div">
                <div id="main-view">
                    <div id="form-div">
                        <form id="project-form" onSubmit={this.onSubmit}>
                            <h3 style={{fontWeight:"bold"}}>Project Information</h3>
                            <label>Project Name</label>
                            <input
                                type='text'
                                name = "projName"
                                defaultValue={project.projectName}
                                placeholder="Enter Project Name"
                                onChange={this.change}
                                required
                            />

                            <label>Project Owner</label>
                            <input
                                type='text'
                                value={project.owner}
                                disabled/>

                            <label>Start Date</label>
                            <input
                                type='date'
                                name = "startD"
                                onChange={this.change}
                                defaultValue={project.startDate}
                                required
                            />

                            <label>Due Date</label>
                            <input
                                type='date'
                                name = "dueD"
                                onChange={this.change}
                                defaultValue={project.dueDate} required />


                            <input type="submit" id="editBtn" value="Submit"
                            />

                        </form>
                    </div>
                    <div id="button-div">

                         <span id="view-graph-div">
                            <Link to="/addTask">View Graph</Link>
                        </span>

                        {  permissions.indexOf(project.role.toLowerCase())>=0 ?
                            <>
                                <Button id="div3" onClick={this.handleShow}>
                                    View Members
                                </Button>
                            </>
                            :
                            ""}
                    </div>
                </div>
                 <div id="project-form-div">

                     {/* <form id="project-form" onSubmit={this.onSubmit}>
                        <h3 style={{fontWeight:"bold"}}>Project Information</h3>
                        <label>Project Name</label>
                        <input
                            type='text'
                            name = "projName"
                            defaultValue={project.projectName}
                            placeholder="Enter Project Name"
                            onChange={this.change}
                            required
                             />

                        <label>Project Owner</label>
                        <input
                            type='text'
                            value={project.owner}
                            disabled/>

                        <label>Start Date</label>
                        <input
                            type='date'
                            name = "startD"
                            onChange={this.change}
                            defaultValue={project.startDate}
                            required
                        />

                        <label>Due Date</label>
                        <input
                            type='date'
                            name = "dueD"
                            onChange={this.change}
                            defaultValue={project.dueDate} required />


                        <input type="submit" id="editBtn" value="Submit"
                                />

                    </form>*/}
                     <br/>


                    
                     <Offcanvas show={this.state.show} onHide={this.handleClose}>
                        <Offcanvas.Header id="canvasHeader" closeButton>
                            <Offcanvas.Title>Project Members</Offcanvas.Title>
                        </Offcanvas.Header>
                         <Offcanvas.Body id="canvasBody">
                             {project.groupMembers.map((value,index)=>{
                                 return (
                                     <div key={index} id="memberDiv">
                                         { value.email !== project.owner ?
                                         <>
                                         <p>Full names: {value.label}<br/>Email: {value.email}
                                         </p>
                                         <HiIcons.HiUserRemove id="userRemove" onClick={()=>this.removeMember(value.email)} />
                                         <FaIcons.FaUserEdit id="userEdit" />
                                         </> : <>
                                                 Owner: {value.email}
                                             </>
                                         }


                                     </div>
                                 )
                             })}
                             <HiIcons.HiUserAdd id="userAdd" />
                         </Offcanvas.Body>
                     </Offcanvas>
                </div>

            </div>

        )
    }


    editView = ()=>{
        console.log('change view',this.state.edit)
        this.setState({
            edit: true
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

            </div>
                

                {
                 this.viewProject(project,EditPermissionRoles) 
                }
                {this.state.popUp && <PopUpMessage text={this.state.popUpText} />}
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