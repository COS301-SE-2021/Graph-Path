import  React from 'react' ;
// import { Modal, Button } from 'react-bootstrap';
import { Modal, Button, ControlLabel, DatePicker, Form, FormControl, FormGroup, HelpBlock, Placeholder } from 'rsuite';


class NewProject extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show:true,
            startDate: new Date(),
            dueDate: new Date(),
            next:false

        }
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
            <></>

            // <Modal show={this.state.show} onHide={this.handleClose} animation={false} backdrop="static" keyboard={false}>
            //     <Modal.Header closeButton>
            //         <Modal.Title>New Project</Modal.Title>
            //     </Modal.Header>
            //     <Modal.Body>
            //         {/* Form */}
            //         {
            //             this.state.next === false ?
            //
            //                 <Form>
            //                     <FormGroup>
            //                         <ControlLabel>Project Name</ControlLabel>
            //                         <FormControl name="projectName" placeholder="Project Name" />
            //                         <HelpBlock tooltip>Required</HelpBlock>
            //                     </FormGroup>
            //
            //                     <FormGroup>
            //                         <ControlLabel>Start Date</ControlLabel>
            //                         <FormControl name="startDate"
            //
            //                         />
            //                         <HelpBlock tooltip>Required</HelpBlock>
            //                     </FormGroup>
            //
            //                     <FormGroup>
            //                         <ControlLabel>Due Date</ControlLabel>
            //                         <DatePicker name="dueDate" oneTap />
            //                         <HelpBlock tooltip>Required</HelpBlock>
            //                     </FormGroup>
            //                 </Form>
            //                 :
            //                 <div>Edit Roles</div>
            //         }
            //
            //
            //     </Modal.Body>
            //     <Modal.Footer>
            //         {
            //             this.state.next === false ?
            //
            //                 <Button variant="primary" onClick={this.handleNext}>
            //                     Next
            //                 </Button>
            //                 :<>
            //                     <Button variant="primary" onClick={this.handleNext}>
            //                         Back
            //                     </Button>
            //                     <Button variant="secondary" onClick={this.handleClose}>
            //                         Submit
            //                     </Button>
            //                 </>
            //         }
            //     </Modal.Footer>
            // </Modal>

            // <Modal backdrop={backdrop} show={show} onHide={this.close}>
            //     <Modal.Header>
            //         <Modal.Title>Modal Title</Modal.Title>
            //     </Modal.Header>
            //     <Modal.Body>
            //         <Paragraph />
            //     </Modal.Body>
            //     <Modal.Footer>
            //         <Button onClick={this.close} appearance="primary">
            //             Ok
            //         </Button>
            //         <Button onClick={this.close} appearance="subtle">
            //             Cancel
            //         </Button>
            //     </Modal.Footer>
            // </Modal>

        )
    }
}

export default NewProject ; 