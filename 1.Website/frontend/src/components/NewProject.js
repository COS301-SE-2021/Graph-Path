import  React from 'react' ; 
import '../css/Login.css';
import '../css/NewProject.css';
import axios from 'axios' ;
import Team from './Team';
import {Redirect} from 'react-router-dom';
class NewProject extends React.Component{
    constructor(props){
        super(props) ;
        this.state = {
            name: '' , 
            members: [] ,
            startDate:new Date().toJSON().slice(0,10),
            dueDate:new Date().toJSON().slice(0,10),
            numberMembers: 0 ,
            api:'http://localhost:9001',
            answer:null,
            responseData:null,
            redirect:false,
        }
    }


    addMember = (memberEmail) =>{
        console.log('add member',memberEmail) ;
        if (memberEmail !== undefined && Array.isArray(memberEmail)){
            this.setState({
                members:memberEmail 
            }, console.log('after update',this.state))
        }
    }
    

    changeToDefault = () =>{
        this.props.default() ;
    }

    
    sendData (data){
            //path to make the post and wait for the response
        axios.post(`${this.state.api}/project/newProject`,data) 
        .then((response) =>{
           if(response.status===400){
               throw Error("Thrown Error \n"+response.statusText) ;
           }//else
           console.log('from back end',response)

           const res = response.data;
           console.log(res) ;
           this.setState({
               answer:res.message,
               responseData:res.data //data
            },()=>{
               console.log(this.state)
               if (this.state.answer!== null && this.state.responseData !== undefined){
                   this.cleanUp() ;
               }
               else{
                    alert('response:'+this.state.answer)
               }
            }) 
        
        },(response)=>{
            //There was problem with the network
            console.log('rejected',response) ;
            alert(`Unfortunately there was an Error:\n${response.message}`)
        })
        .catch((error)=>{
            console.log('Overloked Error Bitting',error) ;
        })
    }

    cleanUp = () =>{
        console.log('cleaning up') ;
        this.setState({
            name: '' , 
            members: [] ,
            startDate:new Date().toJSON().slice(0,10),
            dueDate:new Date().toJSON().slice(0,10),
            redirect:true
        }) ;
    }

    
    handleSubmit = (event) =>{
        event.preventDefault() ; 

        const data = {
            projectName:this.state.name,
            startDate:this.state.startDate,
            dueDate:this.state.dueDate,
            groupMembers:[this.props.userEmail,...this.state.members],
            owner:this.props.userEmail, //add ownwer from dashboard
            graph:{}, //ES6
            //userId:from dashboard
        }
        //communicate with the API
        this.sendData(data) ;
        
        //wait for response
        // this.changeToDefault() ;
    }

    handleChange = (e, index) =>{
        // this.state.members[index] = e.target.value;
        // console.log(this.members[index])
        this.setState(
            {
                members: this.state.members
            }
        )
    }

    updateField = (event) =>{
        this.setState({
            [event.target.name]:event.target.value
        }, console.log(this.state)) ;
    }

    render(){
        if (this.state.redirect){
            return <Redirect to="viewProjects" />
        }
        return (
            <div className="newProject">
                <form method="POST" encType="multipart/form-data" onSubmit={this.handleSubmit} className="logForm">
                    <h4>Create New Project</h4>
                    <p>Project Name</p>
                    <input type="text" required={true} name="name" placeholder="Project Name" value={this.state.name} onChange={this.updateField} />
                    <p>Start Date</p>
                    <input type="date" name="startDate" onChange={this.updateField} value={this.state.startDate}/>
                    <p>Due Date</p>
                    <input type="date" name="dueDate" onChange={this.updateField} value={this.state.dueDate}/>
                    <p>Members</p>
                    <Team chooseMember={this.addMember} />
                    <br/>
                    <input type="submit" value="Create Project" className="btn1"  />


                </form>
            </div>

        )
    }
}

export default NewProject ; 


///////// Using alternative method
// fetch('http://localhost:9001/project/newProject',{
//             method:'POST',
//             body:data
//         }) 
//         .then( res => res.json())
//         .then(res => {
//             alert(res.message) ;
//             console.log(res) ;
//         })
//         .catch(err=>{
//             alert('there was an error')
//             console.log(err) ;
//         })
//         //
//         window.alert(`created project: ${this.state.projName} \n 
//         starts:${this.state.startDate} \n ends:${this.state.dueDate} \n members:${this.state.members.toString()}`
//         ) ; 
