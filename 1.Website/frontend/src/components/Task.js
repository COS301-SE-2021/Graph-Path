import  React from 'react' ;
import '../css/Task.css';

/*
   
*/

class Task extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            members: [],
            startDate:null,
            dueDate:null,
            priority: null,
            status: null,
            about: null,
            api:'http://localhost:9001',
        }
    }
    cleanUp=()=>{
        this.setState({
            name: '',
        }) ;
    }
    changeToDefault = () =>{
        this.props.default() ;
    }

    handleChange = (e, index) =>{
        var temp = this.state.members ;
        temp[index] = e.target.value;
       // console.log(this.members[index])
        this.setState(
            {
                members: temp
        })
    }


    handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            taskName: this.state.name,
            description: this.state.about,
            startDate: this.state.startDate,
            dueDate: this.state.dueDate,
            members: this.state.members,
            priority: this.state.priority
        }
        //communicate with the API
        // this.sendData(data) ;
        this.cleanUp();
        this.props.addTask(data) ;
    }

    updateField = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        }, console.log(this.state));
    }

    displayForm = () =>{

    }


    render() {
        var custom = this.props.label ;
        return(
            <div className="TaskScreen">
                <form method="POST" encType="multipart/form-data" onSubmit={this.handleSubmit}>
                    <h4>{!this.props.fullForm?'Add Node':'Edit Task'}</h4>
                    <p>Task</p>
                    <input type="text" name="name" required={true}
                     placeholder="Task Name" 
                     value={custom === undefined ? this.state.name
                        :this.props.label} 
                     onChange={this.updateField} 
                     onFocus={(e)=>{custom = undefined}}/>
               
                    {this.props.fullForm ? <span>
                        <p>Description</p>
                        <input type="text" name="about" required={true} placeholder="Description" onChange={this.updateField}/>
                        <p>Start Date</p>
                        <input type="date" name="startDate" onChange={this.updateField} />
                        <p>Due Date</p>
                        <input  type="date" name="dueDate" onChange={this.updateField} />
                        <p>Assign Task</p>
                        <input type="text" placeholder="Email" onChange={(e)=>this.handleChange(e,0)} />
                        {
                            this.state.members.map((member,index)=>{
                                return (
                                        <input  key={index}
                                            onChange={(e)=>this.handleChange(e,index+1)}
                                            type="text" placeholder="Email" />
                                )
                            })
                        }
                        {/* <button onClick={(e)=>this.handleRemove(index)}>-</button>*/}
                        {/* <input type="button" onClick={(e)=>this.addMember(e)} />*/}
                        <label>
                            <p>Priority</p>
                            <select name="priority" onChange={this.updateField}>
                                <option value="Urgent">Urgent</option>
                                <option value="High">High</option>
                                <option value="Normal">Normal</option>
                                <option value="Low">Low</option>
                            </select>
                        </label>
                        </span>
                    :<span/>}
                    
                    <input type="submit" value="Add Task" className="btn1"/>
                </form>
            </div>
        )
    }
}
export default Task;