import  React from 'react' ;
// import { Modal, Button } from 'react-bootstrap';
import { Modal, Button, ControlLabel, DatePicker, Form, FormControl, FormGroup, HelpBlock, Placeholder } from 'rsuite';


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
        console.log('confirmed')
    }

    handleClose=()=>{
        this.setState({
            show:false
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
                    {
                        this.state.next === false ?

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
                            :
                            <div>Edit Roles</div>
                    }
                </Modal.Body>
                <Modal.Footer>
                 {
                        this.state.next === false ?

                            <Button variant="primary" onClick={this.handleNext}>
                                Next
                            </Button>
                            :<>
                                <Button variant="primary" onClick={this.handleNext}>
                                    Back
                                </Button>
                                <Button variant="secondary" onClick={this.handleClose}>
                                    Submit
                                </Button>
                            </>
                    }
                </Modal.Footer>
            </Modal>
                </>

        )
    }
}

export default NewProject ; 