import  React from 'react' ;
import '../css/Task.css';

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
                    <input type="date" name="startDate"  />
                    <p>Due Date</p>
                    <input type="date" name="dueDate" />
                    <p>Assign Task</p>
                    <input type="text" placeholder="Email" />
                    <label>
                        <p>Priority</p>
                        <select value={''} onChange={''}>
                            <option>Urgent</option>
                            <option>High</option>
                            <option>Normal</option>
                            <option>Low</option>
                        </select>
                    </label>
                    <input type="submit" value="Add Task" className="btn1"/>
                </form>
            </div>
        )
    }
}
export default Task;