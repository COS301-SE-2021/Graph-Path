import React from 'react'
import '../css/Login.css'
import axios from 'axios' ;

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
        // fetch(`http:`)
        const form = document.getElementById('inForm') ; 
        var data = new FormData(form) ;

        // console.log(data);
        // axios.post(``,)
        // .then(res => res.json())
        // .then(res => this.setState({

        // }))
        // .catch(err => {
        //     console.log('error while connecting to server')
        // })

        //change status of login
        this.props.changeLog() ; 
    }
    render(){

        return (

            <form className="logForm" id="inForm" onSubmit= {this.onSubmit}>
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
                <input type="submit" className="btn1" value="Submit" / > 
            </form>

        );
    }
}

export default Login ;