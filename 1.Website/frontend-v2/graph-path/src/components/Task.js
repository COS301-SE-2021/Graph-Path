import React from 'react' ;
import PropTypes from 'prop-types' ;
import {FormControl,Button,Form,FormGroup,HelpBlock,DatePicker,ControlLabel} from 'rsuite' ;

/**
 * Task will show a list of the tasks provided for a node. 
 * It will also provide a way to add new tasks to the node
 * Furthermore, it will also provide a way to delete one task or all tasks
 */

class Task extends React.Component {
    constructor(props){
        super(props) ;
        this.state = {
            description: '' , 
            issued: new Date() ,
            due: new Date().setDate(new Date().getDate()+1),
            assignee:[],
            assigner:{},
            newTask:false, //if true return form for new task

        }
    }
    createNewTask=()=>{
        return (
            <div>
            <Form>
            <FormGroup>
                <ControlLabel>Description</ControlLabel>
                <FormControl name="description" placeholder="Task Description"  />
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
            
            <FormGroup>
                <Button>Submit</Button>
            </FormGroup>
        </Form>
        </div>
        )
    }

    listAllTasks =()=>{
        if (this.props.nodeTasks){
            if (Array.isArray(this.props.nodeTasks.length)  ){
                return  <small>

                Description : {this.state.nodeTasks[0].description} <br/>
                Issued : {this.state.nodeTasks[0].issued} <br/>
                Due-Date : {this.state.nodeTasks[0].due}
               </small>
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
        return <div data-testid="tidTask">
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
    nodeId:PropTypes.string.isRequired 
}

export default Task ;