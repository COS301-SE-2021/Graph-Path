import React from 'react' ;
import '../css/ProjectInformation.css'
import {
    Button,
    Checkbox, CheckboxGroup, CheckPicker,
    Divider,
    Drawer,
    FlexboxGrid, Form,
    Icon,
    Modal,
    Notification
} from "rsuite";
import axios from "axios";
import PopUpMessage from "./Reusable/PopUpMessage";
import CustomField from "./Reusable/CustomField";

// function Paragraph() {
//     return null;
// }

class ProjectInformation extends React.Component{
    /**
     * Update project information (name, due, start)
     * Show(Members, )
     * Add or Invite Members
     * Remove Members
     * Change roles
     *
     * Permissions
     * - update project owner
     * - update graph
     * - update all project
     * - delete project
     * - delete task
     * - remove members
     * - add members
     *
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
            projDescription:'',
            api:'http://localhost:9001',
            answer:'',
            editMember:false,
            MemberEditEmail:'',
            value:[],
            memberName:"",
            allMembersFromDb:undefined,
            projectMembers:[]

        }
    }

    componentDidMount(){
        this.getAllUsers() ;
        //this.getTodoList();
    }

    handleViewMembers = () =>{
        this.setState({
            show: !this.state.show
        })
    }

    showAddMembers = ()=>{
        this.setState({
            showModal: true
        })
    }

    handleAddMembers = (e) =>{
        e.preventDefault();
        console.log("submitted",this.state)
        if(this.state.memberName.length > 5) {
            const data = {
                email: this.props.user.email,
                projectID: this.props.project._id,
                groupMembers: [{
                    email: this.state.memberName,
                    role: "Developer",
                    permissions: this.state.value
                }]
            }
            // console.log("add m",this.state)
            this.setState({
                showModal: false,
                value: []
            })
            this.addMember(data)
        }
        else if(this.state.projectMembers.length > 0){
            let data ={
                email: this.props.user.email,
                projectID: this.props.project._id,
                groupMembers:[]
            }
            this.state.projectMembers.map((item,index)=>
                data.groupMembers[index] = {
                    email: item,
                    role: "Developer",
                    permissions: this.state.value
                }
            )
            console.log("p members",data)
            this.setState({
                showModal: false,
                value: []
            })
            this.addMember(data)
            // PopUpMessage("Adding", "warning")
        }
        else{
            PopUpMessage("Provide Email", "warning")
        }

    }

    addMember = (data)=>{
        console.log("submitted sent",data)
        try{
            axios.post(`${this.state.api}/project/addToProjectGroupMembers/`,data,{
                headers:{
                    authorization:this.props.user.token
                }
            })
                .then((res)=>{
                    console.log('add member response',res.data)

                    const resp = res.data;

                    this.setState({
                        answer: resp.message
                    },()=>{
                        if (this.state.answer !== undefined) {
                            PopUpMessage("Member Added", "success")

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
            projectID: this.props.project._id,
            owner: this.props.project.projectOwner,
            email: this.props.user.email

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

            if(this.state.projDescription === ''){
                // data.projectName = this.props.project.projectName; //no change
            }else{
                data.projectDescription = this.state.projDescription; //change
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
            console.log("data send",data)
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
                            PopUpMessage("Project Updated", "success")

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
                            PopUpMessage("Member Removed", "success")
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
        let i = 0;
        this.props.project.groupMembers.map((value,index)=>{
            value.email === email ?
                i = index
            :
            <></>
                // this.setState({
                //     value:this.props.project.groupMembers[index].permissions
                // })
                // :
                // <></>
        })
        console.log("index",i)
        this.setState({
            editMember: true,
            showModal: true,
            MemberEditEmail:email,
            value:this.props.project.groupMembers[i].permissions
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
            value.email === this.state.MemberEditEmail ?
                this.props.project.groupMembers[index].permissions =  this.state.value //[...this.props.project.groupMembers[index].permissions,...this.state.value]

                // this.props.project.groupMembers[index].permissions.map((value))
                :
                <></>
        })

        this.setState({
            editMember: false,
            showModal: false,
            value:[]
        })

        const data = Object.assign( this.props.project,{
            projectID: this.props.project._id,
            owner: this.props.project.projectOwner,
            email: this.props.user.email

        })

        data.groupMembers = this.props.project.groupMembers;

        console.log("data-gr",data)

        this.sendData(data)

    }

    change = (e)=>{
        e.preventDefault();
        const {name,value} = e.target;
        this.setState({ [name]: value })

    }

    getAllUsers=()=>{
        try{
            axios.get(`${this.state.api}/user/listOfAllUsers/`,{
                headers:{
                    authorization:this.props.user.token
                }
            })
                .then((response)=>{
                    if(response.status === 400){
                        throw Error(response.statusText);
                    }

                    const res = response.data.data;
                    console.log("all members",res)
                    this.setState({
                        allMembersFromDb: res
                    })

                    // this.setState({
                    //     answer:res.message
                    // },()=>{
                    //     if(this.state.answer !== undefined){
                    //
                    //     }else{
                    //         alert("something went wrong please remove again")
                    //     }
                    // })
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


    saveMember=(list)=>{
        // e.preventDefault();
        // console.log("Form",list)
        this.setState({
            projectMembers:list
        })
    }

    render() {
        const project = this.props.project;
        const {formValue} = this.state;
         {console.log("proj",project)}
        return(
            <div data-testid="main-div-id" id="main-div">
                <div id="project-name"><h3>{project.projectName}</h3></div>
                <div id="project-information">

                        <form data-testid="form-test-id" className="profileForm" onSubmit={this.onSubmit} >
                            <label>Project Name</label>
                            <input defaultValue={project.projectName}
                                   disabled = {!!(this.state.disabled)}
                                   onChange={this.change}
                                   type='text'
                                   name = "projName"
                                   required
                            />


                            <label>Project Owner</label>
                            <input value={project.projectOwner}
                                   disabled
                                   type='text'/>


                            <label>Project Description</label>
                            <input defaultValue={project.projectDescription}
                                   disabled = {!!(this.state.disabled)}
                                   onChange={this.change}
                                   name="projDescription"
                                   type='text'
                                   required
                            />


                            <label>Start Date</label>
                            <input type="date"
                                   name="startD"
                                   defaultValue={project.startDate}
                                   onChange={this.change}
                                   disabled = {!!(this.state.disabled)}
                                   required
                            />

                            <label>Due Date</label>
                            <input defaultValue={project.dueDate}
                                   type='date'
                                   name="dueD"
                                   onChange={this.change}
                                   disabled = {!!(this.state.disabled)}
                                   required
                            />
                            {
                                project.permissions.includes("update all project") === true || project.permissions.includes("owner") ?
                                    this.state.disabled ? <Button id="btn-form" disabled = {(!this.state.disabled)}
                                                                  onClick={this.enableEdit}>Edit</Button>
                                        :

                                        // <Button id="btn-form" disabled = {(this.state.disabled) ? "disabled" : ""}
                                        //         onClick={this.enableEdit}>Update</Button>
                                        <input className="rs-btn rs-btn-default" id="btn-form" type="submit" value="Update"/>
                                    :
                                    <Button id="btn-form" disabled = {true}
                                            >Edit</Button>
                            }
                            {
                                project.permissions.includes("update all project") === true || project.permissions.includes("owner") ?
                                    <Button data-testid="cancel-id" id="btn-form" disabled={!!(this.state.disabled)}
                                            onClick={this.enableEdit}>Cancel</Button>
                                    :
                                    <Button data-testid="cancel-id" id="btn-form" disabled={true}
                                            >Cancel</Button>
                            }

                        </form>


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
                                        { value.email !== project.projectOwner ?
                                            <>
                                                <div>
                                                    <p id="email-p">Email: {value.email}</p>
                                                    {
                                                        project.permissions.includes("update all project") === true || project.permissions.includes("owner") ?
                                                            <Icon id="change-icon" icon="pencil-square" onClick={()=>this.handleEditRole(value.email)} />
                                                            :
                                                            <></>
                                                    }

                                                    {
                                                        project.permissions.includes("remove members") === true || project.permissions.includes("owner") ?
                                                            <Icon id="remove-icon" icon="user-times" onClick={()=>this.removeMember(value.email)}/>
                                                            :
                                                            <></>
                                                    }

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
                            {
                                project.permissions.includes("add members") === true || project.permissions.includes("owner") ?
                                    <Icon onClick={this.addMemberModal} id="add-icon" icon={"user-plus"}/>
                                    :
                                    <></>
                            }

                        </Drawer.Body>
                    </Drawer>

                    {/*To Add Members*/}
                    <Modal data-testid="modal-test-id" backdrop={"static"} show={this.state.showModal} onHide={this.handleCloseEdit}>
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

                                    <form onSubmit={this.handleAddMembers}>
                                            {
                                                this.state.editMember === false ?
                                                    <>

                                                    {/*<label>Email</label>*/}
                                                    <input id="email-input" onChange={this.change} type="email" name="memberName" placeholder="Member Email"
                                                    />
                                                        <br/>


                                                        {

                                                            this.state.allMembersFromDb !== undefined ?

                                                                <CheckPicker
                                                                    sticky
                                                                    name="groupMembers"
                                                                    data={this.state.allMembersFromDb}
                                                                    appearance="default"
                                                                    placeholder="Search Members"
                                                                    style={{ width: 224 }}
                                                                    onSelect={value => this.saveMember(value)}
                                                                />
                                                                :<></>

                                                        }

                                                    </>
                                                :
                                                    <>

                                                        {/*<h6>email owner</h6>*/}

                                                    </>
                                            }


                                        <FlexboxGrid.Item id="can-do-div" colspan={24} md={6} ><h6 style={{textAlign:"center"}}>Permissions</h6>
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
                                                        <Checkbox value="view statistics">View Statistics</Checkbox>
                                                    </CheckboxGroup>

                                                </div>
                                            </FlexboxGrid.Item>
                                        {
                                            project.permissions.includes("add members") === true || project.permissions.includes("owner") ?
                                                this.state.editMember === false ?
                                                <input type="submit" className="rs-btn rs-btn-default" id="add-member-btn" value="Add Member"/>
                                                    : <></>
                                                :
                                                <></>

                                        }

                                    </form>


                                </FlexboxGrid>
                        </Modal.Body>
                        <Modal.Footer>
                            {
                                this.state.editMember === false ?
                                    <>


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

                </div>
                <div id="btn-form-div">
                    <Button data-testid="view-btn" id="btn-info" onClick={this.handleViewMembers}>View Members</Button>
                    {
                        project.permissions.includes("add members") === true || project.permissions.includes("owner") ?
                            <Button data-testid="add-btn" id="btn-info" onClick={this.showAddMembers}>Add Members</Button>
                            :
                            <Button data-testid="add-btn" id="btn-info" disabled={true}>Add Members</Button>
                    }

                </div>
            </div>
        )
    }
}
export default ProjectInformation;