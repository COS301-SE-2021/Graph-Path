import React from 'react' ;
import '../css/ProjectInformation.css'
import {
    Button, ButtonToolbar,
    Checkbox,
    ControlLabel, DatePicker,
    Divider,
    Drawer,
    FlexboxGrid,
    Form,
    FormControl,
    FormGroup, HelpBlock,
    Modal, Placeholder
} from "rsuite";

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
            disabled: true
        }
    }

    handleViewMembers = () =>{
        this.setState({
            show: !this.state.show
        })
    }

    handleAddMembers = () =>{
        this.setState({
            showModal: !this.state.showModal
        })
    }

    enableEdit = () => {
        this.setState({
            disabled: !this.state.disabled
        })
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
                                   type='text'    />


                            <label>Project Owner</label>
                            <input value={project.owner}
                                   disabled
                                   type='text'/>


                            <label>Start Date</label>
                            <input type="date"
                                   name="startDate"
                                   defaultValue={project.startDate}
                                   onChange={this.change}
                                   disabled = {(this.state.disabled) ? "disabled" : ""} />

                            <label>Due Date</label>
                            <input defaultValue={project.dueDate}
                                   type='date'
                                   name="dueDate"
                                   onChange={this.change}
                                   disabled = {(this.state.disabled) ? "disabled" : ""}/>
                            {
                                this.state.disabled ? <Button id="btn-form" disabled = {(this.state.disabled) ? "" : "disabled"}
                                                              onClick={this.enableEdit}>Edit</Button>
                                    :

                                    <Button id="btn-form" disabled = {(this.state.disabled) ? "disabled" : ""}
                                            onClick={this.enableEdit}>Update</Button>
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
                            {project.groupMembers.map((value,index)=>{
                                return (
                                    <div key={index} id="memberDiv">
                                        { value.email !== project.owner ?
                                            <>
                                                <p>Email: {value.email}
                                                </p>
                                            </> : <>
                                                Owner: {value.email}
                                            </>
                                        }


                                    </div>
                                )
                            })}
                        </Drawer.Body>
                    </Drawer>

                    {/*To Add Members*/}
                    <Modal backdrop={"static"} show={this.state.showModal} onHide={this.handleAddMembers}>
                        <Modal.Header>
                            <Modal.Title style={{textAlign:"center"}}>Add/Invite Members</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>


                                <FlexboxGrid id="permission-div" justify="space-around">

                                    <Form>
                                        <FormGroup>
                                            <ControlLabel>Email</ControlLabel>
                                            <FormControl name="memberName" placeholder="Member Email" />
                                            <HelpBlock tooltip>Required</HelpBlock>

                                            <FlexboxGrid.Item id="can-do-div" colspan={24} md={6} >Permissions
                                                <Divider/>
                                                <div id="check-list">
                                                    <Checkbox>View Graph</Checkbox>
                                                    <Checkbox>Add Node</Checkbox>
                                                    <Checkbox>Add Task</Checkbox>
                                                    <Checkbox>Update Project Information</Checkbox>
                                                    <Checkbox>Delete Project</Checkbox>
                                                    <Checkbox>Delete Node</Checkbox>
                                                    <Checkbox>Remove Members</Checkbox>
                                                    <Checkbox>Add Members</Checkbox>
                                                    <Checkbox>Change Task Status</Checkbox>
                                                </div>
                                            </FlexboxGrid.Item>
                                        </FormGroup>
                                    </Form>


                                </FlexboxGrid>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleAddMembers}>
                                Send Invite
                            </Button>
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