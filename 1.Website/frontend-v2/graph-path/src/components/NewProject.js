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
            next:false,
            formValues:{
                name:'',
                dueDate: new Date(),

            }

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

                            <Form formValue={this.state.formValues}>
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
                </Modal.Body>
                <Modal.Footer>
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


// {
//     "email": "ntpnaane@gmail.com",
//     "role": "Project Manager",
//     "label": "Godiragetse Naane",
//     "permissions": [
//       "edit",
//       "view",
//       "delete project",
//       "add members"
//     ]
//   },