import  React from 'react' ;
import '../css/NewProject.css';
// import { Modal, Button } from 'react-bootstrap';
import {
    Modal,
    Button,
    ControlLabel,
    DatePicker,
    Form,
    FormControl,
    FormGroup,
    HelpBlock,
    FlexboxGrid,
    Divider, Checkbox
} from 'rsuite';


class NewProject extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show:false,
            startDate: new Date(),
            dueDate: new Date(),
            next:false

        }
    }
    componentDidMount(){
    }

    handleClose=()=>{
        this.setState({
            show:false,
            next:false
        })
    }

    handleShow=()=>{
        this.setState({
            show:true
        })
    }

    handleNext=()=>{
        this.setState({
            next:!this.state.next
        })
    }
    render(){
        return(
            <>
            <Modal backdrop={"static"} show={this.state.show} onHide={this.handleClose}>
                <Modal.Header>
                    <Modal.Title>New Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Form */}
                    {/*{*/}
                    {/*    this.state.next === false ?*/}

                            <Form>
                                <FormGroup>
                                    <ControlLabel>Project Name</ControlLabel>
                                    <FormControl name="projectName" placeholder="Project Name" />
                                    <HelpBlock tooltip>Required</HelpBlock>
                                </FormGroup>

                                <FormGroup>
                                    <ControlLabel>Due Date</ControlLabel>
                                    <DatePicker name="dueDate" oneTap />
                                    <HelpBlock tooltip>Required</HelpBlock>
                                </FormGroup>

                                <FormGroup>
                                    <ControlLabel>Due Date</ControlLabel>
                                    <DatePicker name="dueDate" oneTap />
                                    <HelpBlock tooltip>Required</HelpBlock>
                                </FormGroup>
                            </Form>
                            {/*:*/}
                            {/*// <div id="permission-div">*/}
                            {/*//*/}
                            {/*//     <div id="role-div" >*/}
                            {/*//*/}
                            {/*//     </div>*/}
                            {/*//     <div id="can-do-div">*/}
                            {/*//*/}
                            {/*//     </div>*/}
                            {/*//*/}
                            {/*// </div>*/}
                            {/*<>*/}
                            {/*    <FlexboxGrid id="permission-div" justify="space-around">*/}
                            {/*        <FlexboxGrid.Item id="role-div" colspan={24} md={6} >*/}
                            {/*            Roles*/}
                            {/*            <Divider/>*/}

                            {/*        </FlexboxGrid.Item>*/}
                            {/*        <FlexboxGrid.Item id="can-do-div" colspan={24} md={6} >Permissions*/}
                            {/*            <Divider/>*/}
                            {/*            <div id="check-list">*/}
                            {/*                <Checkbox>View Graph</Checkbox>*/}
                            {/*                <Checkbox>Add Node</Checkbox>*/}
                            {/*                <Checkbox>Add Task</Checkbox>*/}
                            {/*                <Checkbox>Update Project Information</Checkbox>*/}
                            {/*                <Checkbox>Delete Project</Checkbox>*/}
                            {/*                <Checkbox>Delete Node</Checkbox>*/}
                            {/*                <Checkbox>Remove Members</Checkbox>*/}
                            {/*                <Checkbox>Add Members</Checkbox>*/}
                            {/*                <Checkbox>Change Task Status</Checkbox>*/}
                            {/*            </div>*/}
                            {/*        </FlexboxGrid.Item>*/}
                            {/*    </FlexboxGrid>*/}
                            {/*</>*/}
                    {/*}*/}
                </Modal.Body>
                <Modal.Footer>
                 {/*{*/}
                 {/*       this.state.next === false ?*/}

                 {/*           <Button variant="primary" onClick={this.handleNext}>*/}
                 {/*               Next*/}
                 {/*           </Button>*/}
                 {/*           :<>*/}
                 {/*               <Button variant="primary" onClick={this.handleNext}>*/}
                 {/*                   Back*/}
                 {/*               </Button>*/}
                 {/*               <Button variant="secondary" onClick={this.handleClose}>*/}
                 {/*                   Create*/}
                 {/*               </Button>*/}
                 {/*           </>*/}
                 {/*   }*/}

                    <Button variant="secondary" onClick={this.handleClose}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
                </>

        )
    }
}

export default NewProject ; 