import  React from 'react' ;
import '../css/Task.css';

//var jsgraphs = require('js-graph-algorithms');
//var graph = new jsgraphs.DiGraph(3);
class Task extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            members: [],
            startDate:null,
            dueDate:null,
            priority: null,
            status: null,
            about: null
        }
    }

    addMember(){
        this.setState(
            {
                members: [...this.state.members,""]
            }
        )
    }

    handleChange(e, index){
        this.state.members[index] = e.target.value;
       // console.log(this.members[index])
        this.setState(
            {
                members: this.state.members
            }
        )
    }

 /*

    handleRemove(index){
        this.state.members.splice(index,1)

        this.setState({
            members: this.state.members
        })
    }

  */



    handleSubmit = (event) => {
        event.preventDefault();

        const data = {

        }
    }

    updateField = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        }, console.log(this.state));
    }

    render() {
        return(
            <div className="TaskScreen">
                <form method="POST" encType="multipart/form-data">
                    <h4>Add Task</h4>
                    <p>Task</p>
                    <input type="text" name="name" required="true" placeholder="Task Name" onChange={this.updateField} />
                    <p>Description</p>
                    <input type="text" name="about" placeholder="Description" onChange={this.updateField}/>
                    <p>Start Date</p>
                    <input required="true" type="date" name="startDate"  />
                    <p>Due Date</p>
                    <input required="true" type="date" name="dueDate" />
                    <p>Assign Task</p>
                    <input name="members" type="text" placeholder="Email" onChange={this.updateField} />
                    {
                        this.state.members.map((member,index)=>{
                            return (
                                    <input  key={index}
                                           onChange={(e)=>this.handleChange(e,index)}
                                           type="text" placeholder="Email" />
                            )
                        })
                    }
                    {/* <button onClick={(e)=>this.handleRemove(index)}>-</button>*/}
                    <button onClick={(e)=>this.addMember(e)}>+</button>
                    <label>
                        <p>Priority</p>
                        <select value={} onChange={''}>
                            <option value="1">Urgent</option>
                            <option value="2">High</option>
                            <option value="3">Normal</option>
                            <option value="4">Low</option>
                        </select>
                    </label>
                    <input type="submit" value="Add Task" className="btn1"/>
                </form>
            </div>
        )
    }
}
export default Task;