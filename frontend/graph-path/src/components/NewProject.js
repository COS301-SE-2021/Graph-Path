import  React from 'react' ; 
import '../css/Login.css'

class NewProject extends React.Component{
    constructor(props){
        super(props) ;
        this.state = {
            name: null , 
            members: [] ,
            startDate:null,
            dueDate:null,
            Members: "",
            numberMembers: 0 ,
            Owner:"Nani",
            Graph:"No Projects Yet"
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

    handleSubmit = (event) =>{
        event.preventDefault() ; 

        const data = {
            name:this.state.name,
            startDate:this.state.startDate.toString(),
            dueDate:this.state.dueDate.toString(),
            Members:this.state.Members,
            Owner:this.state.Owner,
            Graph:this.state, //ES6
        }
        //communicate with the API
        fetch('http://localhost:9001/project/newProject',{
            method:'POST',
            body:data
        }) 
        .then( res => res.json())
        .then(res => {
            alert(res.message) ;
            console.log(res) ;
        })
        .catch(err=>{
            alert('there was an error')
            console.log(err) ;
        })
        //
        window.alert(`created project: ${this.state.projName} \n 
        starts:${this.state.startDate} \n ends:${this.state.dueDate} \n members:${this.state.members.toString()}`
        ) ; 

        //wait for response
        this.changeToDefault() ;
    }

    senddata = (data) =>{

    }


    updateField = (event) =>{
        this.setState({
            [event.target.name]:event.target.value
        }, console.log(this.state)) ;
    }
}

export default NewProject ; 