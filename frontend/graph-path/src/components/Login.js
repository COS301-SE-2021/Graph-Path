import React from 'react'
import '../css/Login.css'

class Login extends React.Component{
    constructor(props){
        super(props) ; 
        this.state ={
            email:'',
            password:''
        }
    }

    change =(e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit =e=>{
        e.preventDefault(); /*So the values entered don't show on URL*/

        // send data to server 
        console.log(this.state)  ;

        //change status of login
        this.props.changeLog() ; 
    }
    render(){

        return (

            <form onSubmit= {this.onSubmit}>
                <br />
                <br />
                Email<br />
                <input name = 'email'
                       type='email'
                       placeholder='Email' value={this.state.email}
                       onChange={e=>this.change(e)}
                />
                <br />

                Password<br />
                <input name='password'
                       type='password'
                       placeholder='Password' value={this.state.password}
                       onChange={e=>this.change(e)}
                />
                <br />
                <input type="submit" id='btn1' value="Submit" / > 
            </form>

        );
    }
}

export default Login ;