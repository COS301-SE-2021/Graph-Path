import React from 'react'
import Dashboard from "./Dashboard";
import '../css/Register.css'

class Register extends React.Component{
    state ={
        firstName:'',
        lastName:'',
        userName:'',
        email:'',
        password:''
    }

    change =(e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit =e=>{
        e.preventDefault(); /*So the values entered don't show on URL*/
        console.log(this.state)
    }
    render(){

        return (

            <form>
                First Name
                <br />
                <input name='firstName'
                       placeholder='FirstName' value={this.state.firstName}
                        onChange={e=>this.change(e)}
                />
                <br />
                Lastname
                <br />
                <input name='lastName'
                       placeholder='lastName' value={this.state.lastName}
                       onChange={e=>this.change(e)}
                />
                <br />
                Username
                <br />
                <input name= 'userName'
                       placeholder='UserName' value={this.state.userName}
                       onChange={e=>this.change(e)}
                />
                <br />
                Email
                <br />
                <input name = 'email'
                       type='email'
                       placeholder='Email' value={this.state.email}
                       onChange={e=>this.change(e)}
                />
                <br />
                Password
                <br />
                <input name='password'
                       type='password'
                       placeholder='Password' value={this.state.password}
                       onChange={e=>this.change(e)}
                />
             <br />
                    <button  id='btn1' onClick={(e) => this.onSubmit(e)} > Submit </button>
            </form>

        );
    }
}

export default Register ;