import  React from 'react' ;
import '../css/Task.css';
import Select from 'react-select' ;
import {Button} from "react-bootstrap";
import {Link,withRouter} from "react-router-dom";


/*
   
*/

class Task extends React.Component{
    constructor(props) {
        super(props);
        this.members= [];   
        this.state = {
            name: '',
            taskMembers:[],
            startDate:new Date().toJSON().slice(0,10),
            dueDate: new Date().toJSON().slice(0,10),
            priority: null,
            status: "not started",
            about: null,
            api:'http://localhost:9001',
            fullForm:false,
            critical:false
        }
    }
    cleanUp=()=>{
        this.setState({
            name: '',
            taskMembers:[],
            startDate:new Date().toJSON().slice(0,10),
            dueDate: new Date().toJSON().slice(0,10),
            priority: null,
            status: "not started",
            about: null,
            fullForm:false,
            critical:false

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
        const emailUsers = [] ;
        for (let user of this.state.taskMembers){
            var userEmail = {
                email:user.value ,
                role:user.role
            }
            emailUsers.push(userEmail) ;
        } 

        
        //communicate with the API
        // this.sendData(data) ;
        if (this.props.fullForm){
            // this.props.addTask - for req
            const data = {
            
                description: this.state.about,
                issued: this.state.startDate,
                due: this.state.dueDate,
                assignee: emailUsers   ,
                status:"not started",
                assigner:this.props.user,
                nodeID:`${this.props.projectId}_${this.props.nodeId}`,
                project:this.props.projectId
            }
            
            // console.log('Sending ',data) ;
        

            this.props.addTask(data)
        }
        else{
            const data = {
                label:this.state.name,
                critical:this.state.critical
            }
            

            this.props.addTask(data) ;

        }
        this.cleanUp();
       
    }

    updateField = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        }, console.log(this.state));
    }

    handleCriticalChange =(event)=>{
        this.setState({
            critical:!this.state.critical

        })
    }

    toogleForm = () =>{
        this.setState({
            fullForm:!this.state.fullForm
        }) ;
    }

    handleSearch=(ans)=>{
    //   console.log('task members',ans)
      this.setState({
          taskMembers:ans
      })

    }

    componentDidMount(){
        if (this.props.members!== undefined && Array.isArray(this.props.members)){
            var options = [];
             for (let member of this.props.members){
                let mem = {
                    value:member.email,
                }
                if (member.label === undefined){
                    
                }
                else{
                    mem["label"] = member.label
                    options.push(mem)
                }
            }
            this.setState({
                members : options ,
                fullForm:false
            })
            
            // console.log('task valued mems',options)
        }
        // console.log('Task Mount') ;
    }

    handleCriticalClick =(event)=>{
        console.log('clicked for node',this.props.nodeId) ; 

        if (this.props.nodeId !== undefined && typeof this.props.criticalPath === 'function'){
            this.props.criticalPath(this.props.nodeId) ;
        }

    }

    render() {
        const {match} = this.props ;
        var custom = this.props.label ;
        // console.log('comm',this.props.members)
        return(
            <div className="TaskScreen">
                <form method="POST" encType="multipart/form-data" onSubmit={this.handleSubmit}>
                    <h4>{!this.props.fullForm?'Add Node':''}</h4>
                    <p>Node Name</p>
                    <input type="text" name="name" required={true}
                     placeholder="Node Name"
                     value={custom === undefined ? this.state.name
                        :this.props.label} 
                     onChange={this.updateField} 
                     onFocus={(e)=>{custom = undefined}}/>
                    
                    {
                        this.props.fullForm
                        // ?<div onClick={this.toogleForm}>Attach Task</div>
                            ?
                            <>

                                <Button onClick={this.toogleForm}>{this.state.fullForm?'Close':'Add Task'}</Button>
                                    <br/>
                                <Link to={`${match.url}viewTask/?id=${this.props.nodeId}`}>View Task</Link>
                                <br/>
                                <Button onClick={(e)=>this.handleCriticalClick(e)} > Critical From Current Node </Button>
                                <br/>
                            </>

                        :<>
                            <label>Critical?</label><input type="checkbox" value={"Critical"} checked={this.state.critical} onChange={this.handleCriticalChange}/>  
                        </>
                        
                    }
                    
                    {this.state.fullForm && this.props.fullForm ? <span>
                        <p>Description</p>
                        <input type="text" name="about" required={true} placeholder="Description" onChange={this.updateField}/>
                        <p>Start Date</p>
                        <input type="date" value={this.state.startDate} name="startDate" onChange={this.updateField} />
                        <p>Due Date</p>
                        <input  type="date"  value={this.state.dueDate} name="dueDate" onChange={this.updateField} />
                        <p>Assign Task</p>
                        <Select options={this.state.members} 
                        onChange={this.handleSearch}
                        placeholder={'Search Member'}
                        isSearchable={true}
                        isMulti={true} />
                        {

                            this.state.taskMembers.map((member,index)=>{
                                return (
                                        <span  
                                           
                                        >{member.label}<br/></span>
                                )
                            })
                        }
                        </span>
                    :<span/>}
                    
                    {
                     (custom !== undefined && !this.state.fullForm)
                    ?`Viewing Node ${this.props.label}`:
                <input type="submit" value={custom !== undefined?'Add Task': "Add Node"} className="btn1"/>
                               
                    }
                </form>
            </div>
        )
    }
}
export default withRouter(Task);