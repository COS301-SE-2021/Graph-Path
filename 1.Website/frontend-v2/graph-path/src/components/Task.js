import React from 'react' ;
import PropTypes from 'prop-types' ;
import {Schema,CheckPicker,SelectPicker,Icon,FormControl,Button,Form,FormGroup,HelpBlock,DatePicker,ControlLabel, RadioGroup, Radio, Panel, PanelGroup} from 'rsuite' ;
import CustomField from './Reusable/CustomField';
import  '../css/Common.css' ;
import {format} from 'date-fns' ;



/**
 * Task will show a list of the tasks provided for a node. 
 * It will also provide a way to add new tasks to the node
 * Furthermore, it will also provide a way to delete one task or all tasks
 */

class Task extends React.Component {
    
    constructor(props){
        super(props) ;        
        this.state = {
            assignee:[],
            assigner:{},
            newTask:false, //if true return form for new task
            editTask:{},
            newStatus:'not started',
            formValue:{
                description: '' , 
                issued: new Date(this.now.getFullYear(),this.now.getMonth(),this.now.getDate()).toJSON().slice(0,10) ,
                due: new Date(this.now.getFullYear(),this.now.getMonth()+1,this.now.getDate()).toJSON().slice(0,10),
                status:'not started',
                taskMembers:[]
            },
            formError:{}

        }
    }

    //private fields
    now = new Date() ;

    DateType = Schema.Types.DateType ;
    StringType = Schema.Types.StringType ;
    dueDate = new Date(this.now.getFullYear()) ;
    minDate = new Date(this.now.getFullYear(),this.now.getMonth(),this.now.getDate()-1) ;
    
    taskModel = Schema.Model({
        description: this.StringType().minLength(5,'Please add more details on the description')
            .isRequired('This field is required.') ,
        issued:this.DateType().min(this.minDate,'The issued date cannot be set to a date that has passed.')
            .isRequired('This field is required.') ,
        due:this.DateType().min(this.dueDate,'The due date cannot be set to a date that has passed.')
            .isRequired('This field is required.') ,
    })
    // EOF provate fields


    handleTaskCreation =(form,event)=>{
        console.log('Form ',form)

        this.setState({
            formValue:form
        }) ;
    }

    handleTaskErrors = (formError)=>{
        this.setState({
            formError
        }) ;
    }

  
    handleTaskSubmit =()=>{
        const {formValue} = this.state ;
        if (!this.form.check()){
            console.log('Form error')
        }
        else{
            let updated = {...formValue} ;
            if ( formValue.due instanceof Date ){
                // console.log('yes Due is Date',updated)    
                let d1 = format(updated.due,'yyyy-MM-dd')
                updated.due = d1 ;
            }
    
            if (formValue.issued instanceof Date ){
                // console.log('yes issued is Date')
                let d1 = format(updated.issued,'yyyy-MM-dd')
                updated.issued = d1 ; 
            }
    
            // alert('saved') ;
            console.log('selected submit',updated) ; 

            if (this.state.editTask.nodeID === undefined){
                this.props.sendTaskInfo(updated) ;
                this.setState({
                    newTask:!this.state.newTask
                }) ;
            }
            else{
                let fullTask = Object.assign(this.state.editTask,updated) ;
                this.props.updateNode(fullTask) ;
                this.switchToEditTask({}) ; //switch view
            }
            
        }
    }

    getDefaultFormState=()=>{
        return {
            description: '' , 
            issued: new Date(this.now.getFullYear(),this.now.getMonth(),this.now.getDate()).toJSON().slice(0,10) ,
            due: new Date(this.now.getFullYear(),this.now.getMonth()+1,this.now.getDate()).toJSON().slice(0,10),
            status:'not started',
            taskMembers:[]
        }
    }

    
    toogleScreen=()=>{
        // console.log('toggled')
        let def = this.getDefaultFormState() ;
        this.setState({
            newTask: !this.state.newTask,
            formValue:def,
            formError:{},
            editTask:{}

        }) ;
    }

    switchToEditTask = (taskObj) =>{
        console.log('selected for edit',taskObj) ; 
        
        let formValue2 = {...this.state.formValue} ;
        if (taskObj.nodeID !== undefined){    
            formValue2.description = taskObj.description ; 
            formValue2.due = taskObj.due ; 
            formValue2.taskMembers = taskObj.taskMembers ;
            formValue2.status = taskObj.status ;
        }
        else{
            formValue2 = this.getDefaultFormState() ;
        }
        this.setState({
            editTask:taskObj,
            formValue:formValue2
        }) ; 
    }

    handleSortChange =(value)=>{
        // console.log('value',value )
        this.setState({
            newStatus:value
    })}

    createNewTask=()=>{
            const {formError,formValue} = this.state ;
        
            return (
                <div>
                <Form formValue={formValue} 
                    model={this.taskModel}
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
                    // format={'YYYY-MM-DD'}
                />
                <CustomField 
                    name="status" 
                    label={"Status"}    
                    accepter={RadioGroup}
                    // error={}
                    inline
                >
                    <Radio className={'not-started'} value={'not started'} >Not Started</Radio>
                    <Radio className={'in-prog'} value={'in progress'} >In Progress</Radio>
                    <Radio className={'complete'} value={'complete'} >Complete</Radio>
                    </CustomField>
                
                <FormGroup>
                    <Button data-testid="btn1" onClick={this.handleTaskSubmit}>Submit</Button>
                </FormGroup>
            </Form>
            </div>
            )
    }

    listAllTasks =()=>{
        if (this.props.nodeTasks){
        // console.log('task props',this.props)
            if(this.state.editTask.status !== undefined){
                const task = this.state.editTask ;
                // the edit button pressed
                const projMembers = this.props.members.map((mem)=>{
                    let taskMem = {
                        label : mem.email,
                        value : mem.email
                    }
                    return taskMem ;
                })
                const {formError,formValue} = this.state ;
                const options = [{label:"Not Started",value:"not started"},{label:"In Progress",value:"in progress"},{label:"Complete",value:"complete"}]
                return <><Panel bordered header={'Edit Task '}>
                   <p> <Button onClick={()=>this.switchToEditTask({})}><Icon icon={'close'}/> Cancel</Button>
                   
                   </p>
                    <small>
                
                        <b>Issued</b> : {task.issued} <br/>
                       
                        <Form formValue={formValue}
                            model={this.taskModel}
                            ref ={ ref =>(this.form = ref)}
                            onCheck={formError=>this.handleTaskErrors(formError)} 
                            onChange={this.handleTaskCreation}> 
                            
                        <FormGroup >
                            <ControlLabel>Description</ControlLabel>
                            <FormControl name="description" placeholder="Task Description"  />
                            <HelpBlock tooltip>Required</HelpBlock>
                        </FormGroup>


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
                                accepter={SelectPicker}
                                // error={}
                                inline={'true'}
                                data={options}
                            ></CustomField>  

                        <CustomField 
                                name="taskMembers" 
                                label={"Assign Task To Project Member"}    
                                accepter={CheckPicker}
                                // error={}
                                inline={'true'}
                                data={projMembers}
                            ></CustomField>  
                            
                        </Form >
                                                    
                        <br/>
                    </small>

                    <Button onClick={this.handleTaskSubmit}><Icon icon={'save'} spin={true}/>Save Changes</Button>
                </Panel></>
            }
            else if (Array.isArray(this.props.nodeTasks) && this.props.nodeTasks.length>0 ){
             return <PanelGroup accordion bordered>{
                 this.props.nodeTasks.map((task)=>{
                    return <Panel key={task._id} bordered header={`Description : ${task.description} `}>
                    <small>
                
                        <b>Issued</b> : {task.issued} <br/>
                        <b>Due-Date</b> : {task.due} <br/>
                        <b>Status </b>: {task.status}
                        <br/>
                    </small>
                    <Button onClick={()=>this.props.deleteTask(task._id)}> <Icon icon={'trash'}/>
                    </Button>

                    <Button onClick={()=>this.switchToEditTask(task)}><Icon icon={'pencil-square'}/>Edit Task</Button>
                </Panel>})}
            </PanelGroup>
               
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

    deleteAll = ()=>{
        const tasks = this.props.nodeTasks ;
        if (tasks){
            if (tasks.length > 0 ){
                const temp = tasks[0] ; 
                this.props.deleteNodeTasks(temp.nodeID) ; 
            }
            else{
                alert('no task to delete') ;
            }
        }
        else{
            //nothing
        }
    }

    render(){
        // console.log('Tasks pros',this.props)
        return <div id="tidTask" data-testid="tidTask">
            <div>
                <Button onClick={this.toogleScreen}  appearance={'ghost'}>
                {this.state.newTask?"Close":"ADD TASK"}
                </Button> | <Button onClick={this.deleteAll}
                 appearance={'subtle'}>DELETE ALL TASKS</Button>
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
    members :PropTypes.array.isRequired,
    sendTaskInfo:PropTypes.func.isRequired,
    deleteTask :PropTypes.func.isRequired, 
    deleteNodeTasks:PropTypes.func.isRequired, 
    
}
export default (Task) ;