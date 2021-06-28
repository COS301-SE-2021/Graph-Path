import React from 'react'
import '../css/Login.css'
import axios from 'axios' ;
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

class Login extends React.Component{
    constructor(props){
        super(props) ; 
        this.state ={
            email:'',
            password:'',
            answer: null
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
        // const form = document.getElementById('inForm') ; 
        const data = {
            email: this.state.email,
            password:this.state.password
        } ;
        if (data.password==='' || data.password === undefined){
            alert('please enter password') ;
        }
        else{            
            console.log(data);
            this.sendData(data) ;
            console.log('answer from sendData',this.state.answer);
        }

        //change status of login
    }
    
    sendData(data){
        try{  

        // fetch(`http://localhost:90001/user/login/${data.email}`)
        axios.get(`http://localhost:9001/user/login/${data.email}`)
        .then((response)=>{
            if (response.status===400){
                throw Error(response.statusText) ;
            }
            console.log('from back end',response)

            const res = response.data;
            console.log(res) ;
            this.setState({
                answer:res.message,
                responseData:res.data //data
            },()=>{
                // alert('res:'+this.state.answer)
                console.log(this.state)//Heavey checks
                if (this.state.responseData === undefined || this.state.responseData.password !== this.state.password.toString() ){
                    alert('try again') ;
                }
                else if (this.state.responseData.password === this.state.password.toString() && this.state.answer){
                    //access given
                    this.props.logIn() ; 
                    this.props.updateUser(this.state.responseData)  ;
                }
              }) ;
            
        },(response)=>{
                console.log('rejected',response) ;
    
        })
        .catch((error)=>{
            console.log(error) ;
        })
        }
        catch(error){
            console.log(error) ;
        }
         
    }

    render(){

        return (

            <div className="loginScreen">
                <form className="logForm" id="inForm" onSubmit= {this.onSubmit}>
                    <h4>Sign In</h4>
                    <p>Email</p>
                    <input name = 'email'
                           type='email'
                           placeholder='Email' value={this.state.email}
                           onChange={e=>this.change(e)}
                    />

                    <p>Password</p>
                    <input name='password'
                           type='password'
                           placeholder='Password' value={this.state.password}
                           onChange={e=>this.change(e)}
                    />
                    <br />
                    <input type="submit" className="btn1" value="Login" />
                    Don't Have an Account? Register <Link to="/signUp"> Here</Link>
                </form>
            </div>


        );
    }
}

export default Login ;