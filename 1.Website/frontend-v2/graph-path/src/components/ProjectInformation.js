import React from 'react' ;
import '../css/ProjectInformation.css'
import {
    Button,
    Checkbox,
    ControlLabel,
    Divider,
    Drawer,
    FlexboxGrid,
    Form,
    FormControl,
    FormGroup, HelpBlock,
    Modal
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
            showModal:false
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


    render() {
        const project = this.props.project;
        return(
            <div id="main-div">
                <div id="project-name"><h3>{project.projectName}</h3></div>
                <div id="project-information">


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
                        </Drawer.Header>
                        <Drawer.Body>
                            <Paragraph />
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

                    <Button onClick={this.handleViewMembers}>View Members</Button>
                    <Button onClick={this.handleAddMembers}>Add Members</Button>


                </div>

            </div>
        )
    }
}
export default ProjectInformation;