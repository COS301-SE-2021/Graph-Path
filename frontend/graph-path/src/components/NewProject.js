import  React from 'react' ; 


class NewProject extends React.Component{
    constructor(props){
        super(props) ;
        this.state = {
            projName: null , 
            members: [] ,
            startDate:null,
            endDate:null,
            member: '',
            numberMembers: 0 
        }
    }


    addMember = () =>{
        if (this.state.member !== "" ){
            this.state = {
                members:this.state.members.push(this.state.member)  ,
                numberMembers: this.state.numberMembers+1
            }
            document.getElementById('member').value = '' ; 
        }
        else{
            console.log('member name is empty') ;
        }
    }
    

    increaseMembers = () =>{
        this.setState({
            
        }) ;
    }

    render(){
        return (
        <form method="POST" encType="multipart/form-data" onSubmit={this.handleSubmit}>
            <input type="text" required="true" name="projName" placeholder="Project Name" onChange={this.updateField} />
            <p>Start Date</p>
            <input type="date" name="startDate" onChange={this.updateField} />
            <br/>
            <p>Due Date</p>
            <input type="date" name="dueDate" onChange={this.updateField}/>
            <br/>
            <input type="text" id="member" name="member" placeholder="Add Member" onChange={this.updateField}/>
            <span className="newMember" onClick={this.addMember}><a>+ +</a></span>
            <br/>
            <input type="text" name="graph" placeholder="Graph" />
            <br/>
            <input type="submit" value="Add New"  />


        </form>
        )
    }
    handleSubmit = (event) =>{
        event.preventDefault() ; 

        //communicate with the API


        //wait for response
    }

    updateField = (event) =>{
        this.setState({
            [event.target.name]:event.target.value
        }, console.log(this.state)) ;
    }
}

export default NewProject ; 