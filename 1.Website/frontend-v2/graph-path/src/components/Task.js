import React from 'react' ;
import PropTypes from 'prop-types' ;
import {Schema,FormControl,Button,Form,FormGroup,HelpBlock,DatePicker,ControlLabel, RadioGroup, Radio, Panel, Row} from 'rsuite' ;
import CustomField from './Reusable/CustomField';
/**
 * Task will show a list of the tasks provided for a node. 
 * It will also provide a way to add new tasks to the node
 * Furthermore, it will also provide a way to delete one task or all tasks
 */

class Task extends React.Component {
    
    constructor(props){
        super(props) ;
        let now = new Date() ;
        
        this.state = {
            assignee:[],
            assigner:{},
            newTask:false, //if true return form for new task
            formValue:{
                description: '' , 
                issued: new Date(now.getFullYear(),now.getMonth(),now.getDate()).toJSON().slice(0,10) ,
                due: new Date(now.getFullYear(),now.getMonth()+1,now.getDate()).toJSON().slice(0,10),
                status:'not started',
            },
            formError:{}

        }
    }

    handleTaskCreation =(form,event)=>{
        let updated = {...form} ;
        if ( form.due instanceof Date ){
            updated.due = form.due.toJSON().slice(0,10) 
            // console.log('yes Due is Date',updated)

        }

        if (form.issued instanceof Date ){
        // console.log('yes issued is Date')

            updated.issued = form.issued.toJSON().slice(0,10) 
        }

        this.setState({
            formValue:updated
        }) ;
    }
    handleTaskErrors = (formError)=>{
        this.setState({
            formError
        }) ;
    }

    createNewTask=()=>{
        const {formError,formValue} = this.state ;
        const {DateType,StringType} = Schema.Types ;
        let dueDate = new Date() ;
        dueDate.setFullYear(dueDate.getFullYear()+1)
        const taskModel =Schema.Model({
            description: StringType().minLength(5,'Please add more details on the description')
                .isRequired('This field is required.') ,
            issued:DateType().min(new Date(dueDate.getFullYear()-1,dueDate.getMonth(),dueDate.getDate()-1),'The issued date cannot be set to a date that has passed.')
                .isRequired('This field is required.') ,
            due:DateType().range(new Date(),dueDate,'The due date cannot be set to a date more than 12 months from now or a passed date.')
                .isRequired('This field is required.') ,
        })

        return (
            <div>
            <Form formValue={formValue} 
                model={taskModel}
                ref ={ ref =>(this.form = ref)}
                onCheck={formError=>this.handleTaskErrors(formError)} 
                onChange={this.handleTaskCreation}> 
            <FormGroup data-testid="filter-input-description">
                <ControlLabel>Description</ControlLabel>
                <FormControl name="description" placeholder="Task Description"  />
                <HelpBlock tooltip>Required</HelpBlock>
            </FormGroup>

           <CustomField 
               accepter={DatePicker}
               name={"issued"} 
               label={"Start Date"}
               oneTap={true}
                // format={'YYYY-MM-DD'}
                error={formError.issued}

           />
            {/* <HelpBlock tooltip>Required</HelpBlock> */}

            <CustomField 
                accepter={DatePicker}
                name={"due"}
                label={"Due Date"}
                error={formError.due}
                oneTap={true}
                format={'YYYY-MM-DD'}
            />
            <CustomField 
                name="status" 
                label={"Status"}    
                accepter={RadioGroup}
                // error={}
                inline
            >
                <Radio value={'not started'} >Not Started</Radio>
                <Radio value={'in progress'} >In Progress</Radio>
                <Radio value={'complete'} >Complete</Radio>
                </CustomField>
            
            <FormGroup>
                <Button data-testid="btn1" onClick={this.handleTaskSubmit}>Submit</Button>
            </FormGroup>
        </Form>
        </div>
        )
    }

    handleTaskSubmit =()=>{
        const {formValue} = this.state ;
        if (!this.form.check()){
            console.log('Form error')
        }
        else{
            // alert('saved') ;
            this.props.sendTaskInfo(formValue) ;
            this.setState({
                newTask:!this.state.newTask
            }) ;
        }
    }

    listAllTasks =()=>{
        if (this.props.nodeTasks){
        console.log('task props',this.props)

            if (Array.isArray(this.props.nodeTasks) && this.props.nodeTasks.length>0 ){
             return this.props.nodeTasks.map((task)=>{
                return <Panel bordered header={`Description : ${task.description} `}>
                <small>
                
                    Issued : {task.issued} <br/>
                    Due-Date : {task.due} <br/>
                    Status : {task.status}
                    <br/>
                    </small>
            </Panel>
             
               }) 
            }
            else{
                return <small>
                No Tasks Provided, Please add new tasks
                </small>
            }
        }
        else{
            return <>
            No Props Provided
            </>
        }
    }
    toogleScreen=()=>{
        console.log('toggled')
        this.setState({
            newTask: !this.state.newTask
        }) ;
    }
    
    render(){
        return <div id="tidTask" data-testid="tidTask">
            <div>
                <Button onClick={this.toogleScreen}>
                {this.state.newTask?"Close":"ADD TASK"}
                </Button> | DELETE TASK
            </div>
            <div>
                {
                    !this.state.newTask // display the list
                    ?this.listAllTasks()
                    //if not displat the form
                    :this.createNewTask() 
                }
               
            </div>
        
        </div>
    }
} 

Task.propType = {
    nodeTasks : PropTypes.array.isRequired, 
    sendTaskInfo:PropTypes.func.isRequired 
}

export default Task ;