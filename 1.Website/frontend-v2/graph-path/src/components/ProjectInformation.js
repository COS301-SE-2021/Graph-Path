import React from 'react' ;
import '../css/ProjectInformation.css'
import {
    Button, ButtonToolbar,
    Checkbox, CheckboxGroup,
    ControlLabel, DatePicker,
    Divider,
    Drawer,
    FlexboxGrid,
    Form,
    FormControl,
    FormGroup, HelpBlock, Icon,
    Modal, Placeholder
} from "rsuite";
import axios from "axios";

function Paragraph() {
    return null;
}

class ProjectInformation extends React.Component{
    /**
     * Update project information (name, due, start)
     * Show(Members, )
     * Add or Invite Members
     * Remove Members
     * Change roles
     * @returns {JSX.Element}
     */

    constructor(props) {
        super(props);
        this.state ={
            show:false,
            showModal:false,
            disabled: true,
            projName:'',
            projectOwner:'',
            startD: '',
            dueD:'',
            api:'http://localhost:9001',
            answer:'',
            editMember:false,
            value:[],
            memberRole:""
        }
    }

    handleViewMembers = () =>{
        this.setState({
            show: !this.state.show
        })
    }

    handleAddMembers = () =>{
        this.setState({
            showModal: !this.state.showModal,
        })
    }

    addMemberModal=()=>{
        this.setState({
            showModal: true,
            editMember: false
        })
    }

    enableEdit = () => {
        this.setState({
            disabled: !this.state.disabled
        })
    }

    onSubmit = (e)=>{
        e.preventDefault();
        console.log("submitted",this.state)

        const data = Object.assign( this.props.project,{
            projectID: this.props.project._id

        })

        // console.log("props",this.props.project.projectToDisplay)
        // if(this.state.empty === true){
        //
        // }else{
            if(this.state.projName === ''){
                // data.projectName = this.props.project.projectName; //no change
            }else{
                data.projectName = this.state.projName; //change
            }

            if(this.state.startD === ''){
                // data.startDate = this.props.project.startDate;
            }else{
                data.startDate = this.state.startD;
            }

            if(this.state.dueD === ''){
                // data.dueDate = this.props.project.dueDate;
            }else{
                data.dueDate = this.state.dueD;
            }
            this.sendData(data);
            console.log("data",data)
            this.setState({
                disable: true
            })

        // }

    }

    sendData = (data)=>{
        console.log("token",this.props.user)
        try{
            axios.put(`${this.state.api}/project/updateEverythingProject/`,data,{
                headers:{
                    authorization:this.props.user.token
                }
            })
            .then((response)=>{
                console.log('update project response',response.data)
                    // if(response.status === 400){
                    //     throw Error(response.statusText);
                    // }

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
            if(error.response.data){
                console.log(error.response.data)
            }
            console.log(error)
        }
    }

    removeMember = (email)=>{
        console.log("email",email)
        const data ={
            projectID: this.props.project._id,
            email: email
        }
        try{
            axios.patch(`${this.state.api}/project/removeProjectMember/`,data,{
                headers:{
                    authorization:this.props.user.token
                }
            })
                .then((response)=>{
                    if(response.status === 400){
                        throw Error(response.statusText);
                    }

                    const res = response.data;

                    this.setState({
                        answer:res.message
                    },()=>{
                        if(this.state.answer !== undefined){
                            // this.setState({
                            //     popUpText: email+" has been removed from the project."
                            // });
                            // this.showPopUP()
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

    handleEditRole=(email)=>{
        this.setState({
            editMember: true,
            showModal: true,
            memberRole:email
        })

        console.log("edit role",email)
    }

    handleCloseEdit=()=>{
        this.setState({
            editMember: false,
            showModal: false,
            value:[]
        })
    }

    updateRole=()=>{
        this.props.project.groupMembers.map((value,index)=>{
            value.email === this.state.memberRole ?
                this.props.project.groupMembers[index].permissions = [...this.props.project.groupMembers[index].permissions,...this.state.value]
                :
                <></>
        })

        this.setState({
            editMember: false,
            showModal: false,
            value:[]
        })
    }

    change = (e)=>{
        e.preventDefault();
        const {name,value} = e.target;
        this.setState({ [name]: value })

    }

    render() {
        const project = this.props.project;
        {console.log("proj",project)}
        return(
            <div id="main-div">
                <div id="project-name"><h3>{project.projectName}</h3></div>
                <div id="project-information">
                    <div className="info">
                        <form className="profileForm" onSubmit={this.onSubmit} >
                            <label>Project Name</label>
                            <input defaultValue={project.projectName}
                                   disabled = {(this.state.disabled) ? "disabled" : ""}
                                   onChange={this.change}
                                   type='text'
                                   name = "projName"
                            />


                            <label>Project Owner</label>
                            <input value={project.owner}
                                   disabled
                                   type='text'/>


                            <label>Start Date</label>
                            <input type="date"
                                   name="startD"
                                   defaultValue={project.startDate}
                                   onChange={this.change}
                                   disabled = {(this.state.disabled) ? "disabled" : ""} />

                            <label>Due Date</label>
                            <input defaultValue={project.dueDate}
                                   type='date'
                                   name="dueD"
                                   onChange={this.change}
                                   disabled = {(this.state.disabled) ? "disabled" : ""}/>
                            {
                                this.state.disabled ? <Button id="btn-form" disabled = {(this.state.disabled) ? "" : "disabled"}
                                                              onClick={this.enableEdit}>Edit</Button>
                                    :

                                    // <Button id="btn-form" disabled = {(this.state.disabled) ? "disabled" : ""}
                                    //         onClick={this.enableEdit}>Update</Button>
                                    <input className="rs-btn rs-btn-default" id="btn-form" type="submit" value="Update"/>
                            }

                            <Button id="btn-form" disabled = {(this.state.disabled) ? "disabled" : ""}
                                    onClick={this.enableEdit}>Cancel</Button>

                        </form>
                    </div>

                </div>
                <div id="second-div">
                    {/*To View Members*/}
                    <Drawer
                        size={"xs"}
                        placement={"left"}
                        show={this.state.show}
                        onHide={this.handleViewMembers}
                    >
                        <Drawer.Header>
                            <Drawer.Title>Project Members</Drawer.Title>
                            <Divider/>
                        </Drawer.Header>
                        <Drawer.Body>
                            {
                                project.groupMembers.map((value,index)=>{
                                return (
                                    <div key={index} id="memberDiv">
                                        { value.email !== project.owner ?
                                            <>
                                                <div>
                                                    <p id="email-p">Email: {value.email}</p>
                                                    <Icon id="change-icon" icon="pencil-square" onClick={()=>this.handleEditRole(value.email)} />
                                                    <Icon id="remove-icon" icon="user-times" onClick={()=>this.removeMember(value.email)}/>
                                                </div>
                                                <Divider/>
                                            </> : <>
                                                Owner: {value.email}
                                                <Divider/>
                                            </>
                                        }


                                    </div>
                                )
                            })}
                            <Icon onClick={this.addMemberModal} id="add-icon" icon={"user-plus"}/>
                        </Drawer.Body>
                    </Drawer>

                    {/*To Add Members*/}
                    <Modal backdrop={"static"} show={this.state.showModal} onHide={this.handleCloseEdit}>
                        <Modal.Header>
                            {
                                this.state.editMember === false ?
                                    <>
                                        <Modal.Title style={{textAlign:"center"}}>Add/Invite Members</Modal.Title>
                                    </>
                                    :
                                    <>
                                        <Modal.Title style={{textAlign:"center"}}>Change Permissions</Modal.Title>
                                    </>
                            }

                        </Modal.Header>
                        <Modal.Body>


                                <FlexboxGrid id="permission-div" justify="space-around">

                                    <Form>
                                        <FormGroup>
                                            {
                                                this.state.editMember === false ?
                                                    <>

                                                    <ControlLabel>Email</ControlLabel>
                                                    <FormControl name="memberName" placeholder="Member Email" />
                                                <HelpBlock tooltip>Required</HelpBlock>
                                                    </>
                                                :
                                                    <>

                                                        {/*<h6>email owner</h6>*/}
                                                        {console.log("project-email",project.email)}

                                                    </>
                                            }


                                            <FlexboxGrid.Item id="can-do-div" colspan={24} md={6} >Permissions
                                                <Divider/>
                                                <div id="check-list">
                                                    <CheckboxGroup
                                                        name="checkboxList"
                                                        value={this.state.value}
                                                        onChange={value => {
                                                            console.log("permission",value)
                                                            this.setState({
                                                                value
                                                            })
                                                        }}
                                                    >
                                                        <Checkbox value="update project owner" >Change Project Owner</Checkbox>
                                                        <Checkbox value="update graph" >Update Graph</Checkbox>
                                                        <Checkbox value="update all project" >Update Project Information</Checkbox>
                                                        <Checkbox value="delete project">Delete Project</Checkbox>
                                                        <Checkbox value="delete task">Delete Task</Checkbox>
                                                        <Checkbox value="remove members">Remove Members</Checkbox>
                                                        <Checkbox value="add members">Add Members</Checkbox>
                                                    </CheckboxGroup>

                                                </div>
                                            </FlexboxGrid.Item>
                                        </FormGroup>
                                    </Form>


                                </FlexboxGrid>
                        </Modal.Body>
                        <Modal.Footer>
                            {
                                this.state.editMember == false ?
                                    <>
                                        <Button variant="secondary" onClick={this.handleAddMembers}>
                                            Send Invite
                                        </Button>
                                    </>
                                    :
                                    <>
                                        <Button variant="secondary" onClick={this.updateRole}>
                                            Update
                                        </Button>
                                    </>
                            }

                        </Modal.Footer>
                    </Modal>


                    <Button id="btn-info" onClick={this.handleViewMembers}>View Members</Button>
                    <Button id="btn-info" onClick={this.handleAddMembers}>Add Members</Button>


                </div>
            </div>
        )
    }
}
export default ProjectInformation;