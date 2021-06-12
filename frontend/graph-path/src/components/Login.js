import React from 'react'
import '../css/Login.css'
import axios from 'axios' ;

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

        console.log(data);
        this.sendData(data) ;
        console.log(this.state.answer)

        //change status of login
        this.props.logIn() ; 
    }
    
    async sendData(data){
        try{
            
            const response =  await axios.post(`http://localhost:90001/users`,data)
            if (response.status===400){
                throw Error(response.statusText) ;
            }
            else{
                this.setState({
                    answer:response.data.message
                })  ;
            }
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
                </form>
            </div>


        );
    }
}

export default Login ;