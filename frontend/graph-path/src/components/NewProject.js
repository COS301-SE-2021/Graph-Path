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
            Graph:"No Projects Yet" ,
            api:'http://localhost:9001',
            answer:null
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

    
    async sendData (data){
        try{
            //path to make the post and wait for the response
           const response = await axios.post(`${this.state.api}/project/newProject`,data) 
           if(response.status===400){
               throw Error(response.statusText) ;
           }//else
           const res = response.data.json() ;
           this.setState({
               answer:res
           },()=>{
               if (this.state.answer!== null && this.state.answer.code==1){
                   this.props.changeToDefault() ;
               }
           }) ;
        }
        catch(error){
            console.log(error) ;
        }
    }
    
    handleSubmit = (event) =>{
        event.preventDefault() ; 

        const data = {
            projectName:this.state.name,
            startDate:this.state.startDate,
            dueDate:this.state.dueDate,
            groupMembers:this.state.Members,//this.state.Members,
            owner:this.state.Owner, //add ownwer from dashboard
            Graph:this.state, //ES6
            //userId:from dashboard
        }
        //communicate with the API
        this.sendData(data) ;
        
        //wait for response
        // this.changeToDefault() ;
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
                    <input type="text" required="true" name="name" placeholder="Project Name" onChange={this.updateField} />
                    <p>Start Date</p>
                    <input type="date" name="startDate" onChange={this.updateField} />
                    <p>Due Date</p>
                    <input type="date" name="dueDate" onChange={this.updateField}/>
                    <p>Members</p>
                    <input type="text" id="member" name="Members" placeholder="Add Member" onChange={this.updateField}/>
                    <span className="newMember" onClick={this.addMember}><a>+</a></span>
                    <br/>
                    <input type="text" name="graph" placeholder="Graph" />
                    <br/>
                    <input type="submit" value="Add New" className="btn1"  />


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
