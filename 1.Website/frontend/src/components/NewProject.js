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
            rbca:[],
            users:[],
            role:"Client"
        }
    }


    addMember = (memberEmail) =>{
        if (memberEmail !== undefined && Array.isArray(memberEmail)){
            console.log('add member',memberEmail) ;

            let users = memberEmail.length === 0 ? [] :this.state.members ;
            users = memberEmail.map((user,index)=>{
                if (users[index]===undefined ){
                    //no user yet?then push into array
                    var userRole = this.state.members[index] === undefined ? "Client" :  this.state.members[index].role ;
                    var label = user.label ;
                    var email = user.value ;
                    let roledUser = {
                        email:email,
                        role:userRole,
                        label:label
                    }
                    // users.push(roledUser) ;
                    return roledUser
                }
                else{
                    return users[index] ;

                }
            }) ;


            this.setState({
                members:users 
            }, console.log('after update',this.state))
        }
    }

    getAllRoles=()=>{
        axios.get('http://localhost:9001/project/AllPermissions')
        .then((res)=>{
            const control = res.data ; 

            if (control.data !== null){
                this.setState({
                    rbca:control.data
                })
            }
            else{

            }
            // console.log(control.data.roles,'rbca')
        })
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

    componentDidMount(){
        this.getAllRoles() ;
    }

    
    handleSubmit = (event) =>{
        event.preventDefault() ; 

        const data = {
            projectName:this.state.name,
            startDate:this.state.startDate,
            dueDate:this.state.dueDate,
            groupMembers:[{email:this.props.userEmail, role:"owner"},...this.state.members],
            owner:this.props.userEmail, //add ownwer from dashboard
            graph:{}, //ES6
            //userId:from dashboard
        }
        //communicate with the API
        this.sendData(data) ;
        
        //wait for response
        // this.changeToDefault() ;
    }

    handleChange = (newRole, index) =>{
        // this.state.members[index] = e.target.value;
        var newMembers = [...this.state.members] ;
        var user = {...newMembers[index]} ;
        user.role = newRole ;
        newMembers[index] = user ; 
        console.log(user.role,index)

        this.setState(
            {
                members: newMembers
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
                    <Team userEmail={this.props.userEmail} chooseMember={this.addMember} />
                    <br/>
                    <div>
                        {this.state.members.length>0?
                        this.state.members.map((value,ind)=>{
                            return <>
                                <span key={`q${ind}`} data-num={ind}>{value.label}</span> &nbsp;
                                <select key={`w${ind}`} name="role" value={value.role} onChange={(e)=>this.handleChange(e.target.value,ind)}>
                                    {this.state.rbca.roles.map((val,ind2)=>{
                                        return <option key={`k${ind2}`}value={val}>{val}</option>
                                    })}
                                </select>
                                <br/>
                            </>
                        })
                        :<></>}
                    </div>
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
