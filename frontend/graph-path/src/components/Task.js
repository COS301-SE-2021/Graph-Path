import  React from 'react' ;
import '../css/Task.css';
import axios from "axios";

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
            about: null,
            api:'http://localhost:9001',
        }
    }
/*
    addMember(){
        this.setState(
            {
                members: [...this.state.members,""]
            }
        )
    }
*/
    changeToDefault = () =>{
        this.props.default() ;
    }

    handleChange = (e, index) =>{
        this.state.members[index] = e.target.value;
       // console.log(this.members[index])
        this.setState(
            {
                members: this.state.members
            }
        )
    }


    sendData (data){
        //path to make the post and wait for the response
       axios.post(`${this.state.api}/insertTask`,data)
            .then((response) =>{
                if(response.status===400){
                    throw Error(response.statusText) ;
                }//else
                console.log('from back end',response)

                const res = response.data;
                console.log(res) ;
                this.setState({
                    answer:res.message,
                    responseData:res.data //data
                },()=>{
                    // alert('res:'+this.state.answer)
                    console.log(this.state)
                    if (this.state.answer!== null && this.state.answer){
                        //    this.props.changeToDefault() ;
                    }
                })

            },(response)=>{
                console.log('rejected',response) ;
            })
            .catch((error)=>{
                console.log(error) ;
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
        return(
            <div className="TaskScreen">
                <form method="POST" encType="multipart/form-data" onSubmit={this.handleSubmit}>
                    <h4>Add Task</h4>
                    <p>Task</p>
                    <input type="text" name="name" required={true} placeholder="Task Name" onChange={this.updateField} />
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
                    <input type="submit" value="Add Task" className="btn1"/>
                </form>
            </div>
        )
    }
}
export default Task;