import React from 'react' ;
import {Button, Icon,IconButton, Dropdown, Popover, Whisper} from 'rsuite' ;
/**
 * When you click on the help button it shows different help sections
 * 1. Adding and Deleting Node
 * 2. Adding and Deleting Edge
 * 3. Adding and Deleting Subtask
 * 4. Finding Critical Path
*/
class GraphHelp extends React.Component{

    constructor(props){
        super(props) ; 
        this.state = {
            section : 'all' ,
        }
    }

    chageHelpSection=(section)=>{
        this.setState({
            section:section
        }) ;
    }

    nodeHelper = ()=>{
        switch (this.state.section) {
            case 'node': return (<>
              To add Node/Task use the                 
              <IconButton icon={<Icon icon={'task'}/>} >Add Task</IconButton>

                 button on top . <br/>
                Give the task a name/label and whether it is
                import (critical) or not. 
            <br/>
            To delete the task, press and hold the alt (ALT) key, while holding click the task you want to delete.
    
            </>) 
            case 'task' : return (<>
            To add a  subtask, <b>click</b> a created task and <b>click</b> button 
            <Button appearance={'ghost'}>ADD SUBTASK</Button> 
            <br/>
            To delete a task, <b>click</b> node with a task and expand the details, 
            <b>click</b> the <Icon icon={'trash'}/> option.
            </>)
            case 'edge': 
            return (<>
              To add Lines/Edges between tasks, press and hold the control (CTRL) key,
              <br/>
              while holding the key, click the first task followed by the second task.  
              <br/>
                <u>For MacOS users, use the shft(SHIFT) key to add lines.</u>
              <br/>

              The line goes from 1st task, to 2nd task. 
              <br/>
              To delete the line, press and hold the alt (ALT) key, 
              <br/>
              while holding, click the line you want to delete.
     
                </>)
            case 'critical':
                return(<>    
                To find the critical paths use:
                <Dropdown disabled title={"Critical Path"} 
                  icon={<Icon icon={'charts-line'}/>}/> dropdown option.
                  <br/>
                1.1  Use  <Dropdown.Item icon={<Icon icon={'road'}/>} disabled>
                      Project Graph Critical Path
                    </Dropdown.Item> to find the paths to all critical nodes.
                <br/>
                1.2 Use  <Dropdown.Item disabled icon={<Icon icon={'refresh'}/>}>
                      Reset Graph
                    </Dropdown.Item>
                    to reset the graph after finding the critical paths
                    <br/>

                </>)
            default :   return (
                <>
            Choose a category
              
                </>)

        }      
    }

    render(){
        const helpers = (<Popover>
            <div id="help-bar">
                <Button appearance={'primary'}
                onClick={(e)=>this.chageHelpSection('node')}>Tasks</Button>
                <Button appearance={'primary'}
                onClick={(e)=>this.chageHelpSection('edge')}>Lines</Button>
                <Button appearance={'primary'}
                onClick={(e)=>this.chageHelpSection('task')}>Sub-Tasks</Button>
                <Button appearance={'primary'}
                onClick={(e)=>this.chageHelpSection('critical')}>Critical Path</Button>
            </div>
            
            {this.nodeHelper()}

        </Popover>)
        
        return (
            <div id="help-tip">
            <Whisper placement={'auto'} trigger={'active'} speaker={helpers}>
                <Icon icon={'help-o'} size={'2x'}/>
            </Whisper>
            <span className={'graphMessage'}>{this.props.text}</span>
            </div>
        )
    }

}

export default GraphHelp ; 