import  React from 'react' ; 


class NewProject extends React.Component{
    constructor(props){
        super(props) ;
        this.state = {
            projName: null , 
            members: null ,
            startDate:null,
            endDate:null,

        }
    }
    render(){
        return (
        <form method="POST" encType="multipart/form-data" onSubmit={this.handleSubmit}>
            <input type="text" required="true" name="projName" placeholder="Project Name" onChange={this.updateField} />
            <p>Start Date</p>
            <input type="date" name="startDate" />
            <p>Due Date</p>
            <input type="date" name="dueDate" />
            <input type="text" name="member1" placeholder="Add Member" />
            <input type="text" name="member2" placeholder="Add Member 2" />
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