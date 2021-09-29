import React from 'react' ;
import {Button, Icon, HelpBlock, Popover, Whisper} from 'rsuite' ;
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
                <Button appearance={'link'} >Add Node</Button> button on top . <br/>
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
            </div>
            
            {this.nodeHelper()}

        </Popover>)
        
        return (
            <div id="help-tip">
            <Whisper placement={'auto'} trigger={'active'} speaker={helpers}>
                <Icon icon={'help-o'} size={'2x'}/>
            </Whisper>
            </div>
        )
    }

}

export default GraphHelp ; 