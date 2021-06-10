import  React from 'react' ; 
import '../css/Login.css'
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
               throw Error(response.statusText) ;
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
            console.log('rejected',response) ;
        })
        .catch((error)=>{
            console.log(error) ;
        })
    }

    
    handleSubmit = (event) =>{
        event.preventDefault() ; 

        const data = {
            projectName:this.state.name,
            startDate:this.state.startDate,
            dueDate:this.state.dueDate,
            groupMembers:this.state.Members,//this.state.Members,
            owner:this.state.Owner, //add ownwer from dashboard
            Graph:this.state.Graph, //ES6
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
        <form method="POST" encType="multipart/form-data" onSubmit={this.handleSubmit} className="logForm">
            <input type="text" required="true" name="name" placeholder="Project Name" onChange={this.updateField} />
            <br/>
            Start Date
            <br/>
            <input type="date" name="startDate" onChange={this.updateField} />
            <br/>
            <p>Due Date</p>
            <input type="date" name="dueDate" onChange={this.updateField}/>
            <br/>
            <input type="text" id="member" name="Members" placeholder="Add Member" onChange={this.updateField}/>
            <span className="newMember" onClick={this.addMember}><a>+</a></span>
            <br/>
            <input type="text" name="graph" placeholder="Graph" />
            <br/>
            <input type="submit" value="Add New" className="btn1"  />


        </form>
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
