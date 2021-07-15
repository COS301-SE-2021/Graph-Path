import  React from 'react' ; 
import '../css/Login.css';
import '../css/NewProject.css';
import axios from 'axios' ;

class NewProject extends React.Component{
    constructor(props){
        super(props) ;
        this.state = {
            name: null , 
            members: [] ,
            startDate:null,
            dueDate:null,
            Members: [],
            numberMembers: 0 ,
            Owner:"Nani",
            Graph:{} ,
            api:'http://localhost:9001',
            answer:null,
            responseData:null
        }
    }


    addMember = () =>{
        if (this.state.member !== "" ){
            const memberName = this.state.member ;
            this.setState({
                members:this.state.members.push(memberName)  ,
                numberMembers: this.state.numberMembers+1
            }, () =>
            document.getElementById('member').value = ""
            ) ; 
        }
        else{
            console.log('member name is empty') ;
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
               alert('res:'+this.state.answer)
               console.log(this.state)
               if (this.state.answer!== null && this.state.answer){
                //    this.props.changeToDefault() ;
               }
            }) 
        
        },(response)=>{
            //There was problem with the network
            console.log('rejected',response) ;
            alert(`Unfortunately there was an Error:\n${response}`)
        })
        .catch((error)=>{
            console.log('Overloked Error Bitting',error) ;
        })
    }

    
    handleSubmit = (event) =>{
        event.preventDefault() ; 

        const data = {
            projectName:this.state.name,
            startDate:this.state.startDate,
            dueDate:this.state.dueDate,
            groupMembers:[this.props.userEmail],//this.state.Members,
            owner:this.props.userEmail, //add ownwer from dashboard
            graph:this.state.Graph, //ES6
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
        return (
            <div className="newProject">
                <form method="POST" encType="multipart/form-data" onSubmit={this.handleSubmit} className="logForm">
                    <h4>Create New Project</h4>
                    <p>Project Name</p>
                    <input type="text" required={true} name="name" placeholder="Project Name" onChange={this.updateField} />
                    <p>Start Date</p>
                    <input type="date" name="startDate" onChange={this.updateField} />
                    <p>Due Date</p>
                    <input type="date" name="dueDate" onChange={this.updateField}/>
                    <p>Members</p>
                    {/* <input type="text" id="member" name="Members" placeholder="Add Member" onChange={this.updateField}/>*/}
                    <input type="text" id="member" name="Members" placeholder="Add Member" onChange={(e)=>this.handleChange(e,0)}/>
                    {
                        this.state.members.map((member,index)=>{
                            return(
                                <input key={index} type="text" id="member" name="Members" placeholder="Add Member" onChange={(e)=>this.handleChange(e,index+1)}/>
                                )

                        })
                    }
                    {/*<span className="newMember" onClick={this.addMember}><a>+</a></span>*/}
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
