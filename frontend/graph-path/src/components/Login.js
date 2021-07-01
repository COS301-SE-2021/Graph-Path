import React from 'react'
import '../css/Login.css'
import axios from 'axios' ;
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

const formValid =({formErrors,...rest})=>{
    let valid =true;

    //Checks for individual null values
    Object.values(formErrors).forEach(val=> {
            val.length> 0 && (valid=false);
        }
    );

    //Checks for when you submit form with all null values
    Object.values(rest).forEach(val=> {
        val==null && (valid=false);
    });

    return valid;

}
class Login extends React.Component{
    constructor(props){
        super(props) ; 
        this.state ={
            email:'',
            password:'',
            answer: null,

            //Errors
            formErrors:{
                email:"",
                password:""
            }
        }
    }

    change =(e) => {
       // this.setState({
       //     [e.target.name]: e.target.value
        //});

        e.preventDefault(); /*So the values entered don't show on URL*/

        const {name,value}=e.target;

        let formErrors = {...this.state.formErrors};

        switch(name){
            case "email":
                if(value.length==0)
                    formErrors.email='Email field cannot be blank'
                else if(emailRegex.test(value))
                    formErrors.email=''
                else
                    formErrors.email="Invalid email address";
                break;

            case 'password':
                if(value.length==0)
                    formErrors.password='Password field cannot be blank'
                else if(value.length<8)
                formErrors.password ='Your password is 8 characters or more'
                else
                formErrors.password = "";
                break;

            default: break;
        }

        this.setState({ formErrors, [name]: value });
    }

    onSubmit =e=>{
        e.preventDefault(); /*So the values entered don't show on URL*/

        const {name,value}=e.target;

        let formErrors = {...this.state.formErrors};
        
        // send data to server 
        console.log(this.state)  ;
        // fetch(`http:`)
        // const form = document.getElementById('inForm') ; 
        const data = {
            email: this.state.email,
            password:this.state.password
        } ;
        if (data.password==='' || data.password === undefined){
            //alert('please enter password') ;
            formErrors.password='Email and Password do not match'
        }
        else{            
            console.log(data);
            this.sendData(data) ;
            console.log('answer from sendData',this.state.answer);
        }

        //change status of login

        this.setState({ formErrors, [name]: value });
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
                alert('res:'+this.state.answer)
                console.log(this.state)//Heavey checks
                if (this.state.responseData === undefined || this.state.responseData.password !== this.state.password.toString() ){
                    alert('try again') ;
                }
                else if (this.state.responseData.password === this.state.password.toString() && this.state.answer){
                    //access given
                    this.props.logIn() ; 
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
        const {formErrors} = this.state;
        return (

            <div className="loginScreen">
                <form className="logForm" id="inForm" onSubmit= {this.onSubmit}>
                    <h4>Sign In</h4>
                    <p>Email</p>
                    <input
                        className={formErrors.email.length > 0 ? 'error': null}
                        name = 'email'
                        type='email'
                        placeholder='Email' value={this.state.email}
                        onChange={this.change}
                    />
                    {formErrors.email.length > 0 && (
                        <span className='errorMessage'>{formErrors.email}</span>
                    )}


                    <p>Password</p>
                    <input
                        className={formErrors.password.length > 0 ? 'error': null}
                        name='password'
                        type='password'
                        placeholder='Password' value={this.state.password}
                        onChange={e=>this.change(e)}
                    />
                    {formErrors.password.length > 0 && (
                        <span className='errorMessage'>{formErrors.password}</span>
                    )}
                    <input type="submit" className="btn1" value="Login" />
                    Don't Have an Account? Register <Link to="/signUp"> Here</Link>
                </form>
            </div>


        );
    }
}

export default Login ;