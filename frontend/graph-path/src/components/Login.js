import React from 'react'
import Dashboard from "./Dashboard";
import '../css/Login.css'

class Login extends React.Component{
    state ={
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
        this.props.onSubmit(this.state);
        console.log(this.state)

    }
    render(){

        return (

            <form>

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
                <button id='btn1' onClick={(e) => this.onSubmit(e)} > Submit </button>
            </form>

        );
    }
}

export default Login ;