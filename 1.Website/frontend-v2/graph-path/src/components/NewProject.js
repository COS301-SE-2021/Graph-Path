import  React from 'react' ;
import '../css/NewProject.css';
import CustomField from './Reusable/CustomField';
import PropTypes from 'prop-types' ;
import axios from 'axios' ;

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
            startDate: new Date(),
            dueDate: new Date(),
            next:false,
            formValue:{
                projectName:'',
                startDate: new Date(now.getFullYear(),now.getMonth(),now.getDate()).toJSON().slice(0,10) ,
                dueDate: new Date(now.getFullYear()+1,now.getMonth(),now.getDate()).toJSON().slice(0,10),
            },
            formError:{}
        }
    }
    componentDidMount(){
    }

    handleSubmit=()=>{
        console.log('min proj',this.state.formValue)
        let project = Object.assign(this.state.formValue,this.props.preInfo)
        const {formValue} = this.state ;
        if (!this.form.check()){
            console.log('Form error')
        }
        else{
        this.sendProjectInfo(project) ;
        }
    }

    sendProjectInfo=(project)=>{
        console.log('b4 api',project) ;

        // fetch(`${this.props.api}/project/newProject`,{
        //     method:'POST',
        //     body:JSON.stringify(project),
        //     headers:{
        //         authorization:this.props.token
        //     }
        // })
        axios.post(`${this.props.api}/project/newProject`,project,{
            headers:{
                authorization:this.props.token,
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
            
        })
        .then((res)=>{
        console.log('api',res) ;
            
        this.setState({
            show:false,
            next:false
        }) ;
        },(reject)=>console.log('rejected',reject))
        .catch((err)=>{
            for (let key of Object.keys(err)){
                console.log(key,': ',err[key])

            }
            console.log(err)
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

    handleInfoChange=(form)=>{
        console.log('update',form) ;
        let updated = {...form} ;
        if ( form.dueDate instanceof Date ){
            updated.dueDate = form.dueDate.toJSON().slice(0,10) 
            // console.log('yes Due is Date',updated)

        }

        if (form.startDate instanceof Date ){
        // console.log('yes issued is Date')

            updated.startDate = form.startDate.toJSON().slice(0,10) 
        }
        console.log('yes issued is Date',updated)

        this.setState({
            formValue:updated
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
            startDate:DateType().min(new Date(due.getFullYear()-2,due.getMonth(),due.getDate()-1),'The start date cannot be set to a date that has passed.')
                .isRequired('This field is required.') ,
            dueDate:DateType().range(new Date(),due,'The due date cannot be set to a date more than 24 months from now or a passed date.')
                .isRequired('This field is required.') ,
        })
        return( 
            <>
            <Modal backdrop={"static"} show={this.state.show} onHide={this.handleClose}>
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
    preInfo : PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
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