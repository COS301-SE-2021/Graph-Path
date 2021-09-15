import  React from 'react' ;
import '../css/NewProject.css';
import CustomField from './Reusable/CustomField';
import PropTypes from 'prop-types' ;
import {format} from 'date-fns' ;
import {
    Modal,
    Button,
    ControlLabel,
    DatePicker,
    Form,
    FormControl,
    FormGroup,
    HelpBlock,Schema
} from 'rsuite';

class NewProject extends React.Component{
    constructor(props){
        super(props);
        let now = new Date() ;
        this.state={
            show:false,
            next:false,
            formValue:{
                projectName:'',
                description:'',
                startDate: new Date(now.getFullYear(),now.getMonth(),now.getDate()),//.toJSON().slice(0,10) ,
                dueDate: new Date(now.getFullYear(),now.getMonth()+1,now.getDate()),//.toJSON().slice(0,10),
            },
            formError:{}
        }
    }
    componentDidMount(){
    }

    cleanUp=()=>{
        let now = new Date() ;
        this.setState({
            show:false,
            next:false,
           formValue:{
               projectName:'',
               description:'',
               startDate: new Date(now.getFullYear(),now.getMonth(),now.getDate()),//.toJSON().slice(0,10) ,
               dueDate: new Date(now.getFullYear(),now.getMonth()+1,now.getDate()),//.toJSON().slice(0,10),
           },
           formError:{}
        })
    }

    handleSubmit=()=>{
        // console.log('min proj',this.state.formValue)
        const {formValue} = this.state ;
        let updated = {...formValue} ;
        if ( formValue.dueDate instanceof Date ){
            
            let d1 = format(updated.dueDate,'yyyy-MM-dd')
            updated.dueDate = d1 ;
        }

        if (formValue.startDate instanceof Date ){
        // console.log('yes issued is Date')
            let d1 = format(updated.startDate,'yyyy-MM-dd')
            updated.startDate = d1 ;
        }
        // console.log('yes issued is Date',updated)

        // let project = Object.assign(updated,this.props.preInfo)
        if (!this.form.check()){
            console.log('Form error')
        }
        else{
            this.props.sendProjectInfo(updated) ; //props
        }
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

    handleInfoChange=(form)=>{
        // console.log('update',form) ;
        this.setState({
            formValue:form
        }) ;

    }

    handleProjectErrors = (formError)=>{
        this.setState({
            formError
        }) ;
    }

    render(){
        const {formError,formValue} = this.state ;
        const {DateType,StringType} = Schema.Types ;
        let due = new Date() ;
        due.setFullYear(due.getFullYear()+2)
        const projectModel =Schema.Model({
            projectName: StringType().minLength(2,'Project name should have more than 2 letters')
                .isRequired('This field is required.') ,
            startDate:DateType().min(new Date(due.getFullYear()-2,due.getMonth(),due.getDate()-1),'The start date cannot be set to a date that has passed by more than a day.')
                .isRequired('This field is required.') ,
            dueDate:DateType().min(this.state.formValue.startDate,'The due date cannot be before start date or a date in the past.')
                .isRequired('This field is required.') ,
            description: StringType().minLength(5,'Please add more details on the description')
                .isRequired('This field is required.') ,
        })
        // console.log('np',this.props)

        return( 
            <>
            <Modal data-testid="modal-id-test" backdrop={"static"} show={this.state.show} onHide={this.cleanUp}>
                <Modal.Header>
                    <Modal.Title>New Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form formValue={formValue}
                        model={projectModel}
                        ref={ref=>(this.form=ref)}
                        onCheck={formError=>this.handleProjectErrors(formError)} 
                        onChange={this.handleInfoChange}
                    >
                        <FormGroup>
                            <ControlLabel>Project Name</ControlLabel>
                            <FormControl name="projectName" placeholder="Project Name" />
                            <HelpBlock tooltip>Required</HelpBlock>
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel>Description</ControlLabel>
                            <FormControl name="description" placeholder="Project Description"  />
                            <HelpBlock tooltip>Required</HelpBlock>
                        </FormGroup>

                        <CustomField 
                            accepter={DatePicker}
                            name={"startDate"} 
                            label={"Start Date"}
                            oneTap={true}
                            format={'YYYY-MM-DD'}
                            error={formError.startDate}
                        />

                        <CustomField 
                            accepter={DatePicker}
                            name={"dueDate"}
                            label={"Due Date"}
                            oneTap={true}
                            format={'YYYY-MM-DD'}
                            error={formError.dueDate}
                        />

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleSubmit}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
                </>

        )
    }
}

NewProject.propTypes = {
    sendProjectInfo : PropTypes.func.isRequired,
    api:PropTypes.string.isRequired,
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