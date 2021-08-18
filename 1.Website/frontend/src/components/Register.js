import React from 'react'
import '../css/Register.css'
import axios from 'axios';
// import { Link} from 'react-router-dom';
 import {form } from "react-bootstrap";

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
/*Rest part checks for submitting null values for all inputs*/
const formValid = ({formErrors,...rest})=>{
    let valid =true;

    //Checks for individual null values
    Object.values(formErrors).forEach(val=> {
            val.length> 0 && (valid=false);
            console.log(val, 'Valid',valid)
        }
    );

    //Checks for when you submit form with all null values
    Object.values(rest).forEach(val=> {
        val===null && (valid=false);
        console.log(val, 'Valid',valid)
    });

    return valid;
}
class Register extends React.Component{
    state ={
        firstName:'',
        lastName:'',
        userName:'',
        email:'',
        password:'',
        wait:false,
        api:'http://localhost:9001',
        answer:undefined,
        type: 'text',

        //Errors
        formErrors: {
            firstName:"",
            lastName:"",
            userName:"",
            email:"",
            password:""
        }
    };


    change =(e) => {
        //this.setState({
          //  [e.target.name]: e.target.value});

        e.preventDefault();

        const {name,value}=e.target;

        let formErrors = {...this.state.formErrors};

        switch(name){
            case 'firstName':
                formErrors.firstName = value.length===0 ? 'FirstName is required'
                    : "";
                break;

            case 'lastName':
                formErrors.lastName = value.length===0 ? 'LastName is required'
                    : "";
                break;

            case 'userName':
                formErrors.userName = value.length===0 ? 'userName is required'
                    : "";
                break;

            case "email":
                formErrors.email = emailRegex.test(value)
                    ? ''
                    : "Invalid email address";
                break;

            case 'password':
                formErrors.password = value.length < 8 ? 'Minimum for password should be 8 characters'
                    : "";
                break;

            default: break;
        }

        this.setState({ formErrors, [name]: value });

    };

    onSubmit =e=>{
        e.preventDefault(); /*So the values entered don't show on URL and NOT to submit by itself*/
        // this.props.onSubmit(this.state);
        //display loading screen

        if(formValid(this.state)) {
            console.log(this.state)
            const data = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                username: this.state.userName,
                password: this.state.password,
                type: "Standard User",
                Notification: "Email"
            }

            console.log(data)

            this.sendData(data);

            /*Clear inputs once you click on submit*/
            this.setState({
                firstName:'',
                lastName:'',
                userName:'',
                email:'',
                password:''
            });

        }else
        {
            this.setState({
                firstName: this.state.firstName,
                lastName:this.state.lastName,
                userName:this.state.userName,
                email:this.state.email,
                password:this.state.password
            });
        }

    };


    sendData (data){
        //path to make the post and wait for the response
        axios.post(`${this.state.api}/user/newUser`,data)
            .then((response) =>{
                if(response.status===400){
                    throw Error(response.statusText) ;
                }//else
                console.log('from back end',response)

                const res = response.data;
                // console.log(res) ;
                this.setState({
                    answer:res.message,
                    responseData:res.data[0] //data
                },()=>{

                   console.log(this.state)
                    if (this.state.answer!== undefined && this.state.responseData !== undefined){
                       alert(`Registered as: ${this.state.responseData.firstName} ${this.state.responseData.lastName}, \n with login email as:${this.state.responseData.email}`)
                    }
                    else{
                        alert(`Something went wrong please register again. ${this.state.answer}`)
                    }
                })

            },(response)=>{
                console.log('rejected',response) ;
                alert('Server Error, Please try again later') ; 
            })
            .catch((error)=>{
                console.log(error) ;
            })
    }




    render(){

        const {formErrors} = this.state;

        // var ans = this.state.answer ;
        // if (ans !== null || ans !== undefined){
        //     alert(`message:${ans}`) ;
        // }

        return (
            <div className="base-container" ref={this.props.containerRef}>
                <div id="registerScreen">
                    <h4>Sign Up</h4>
                    <form className="logForm" onSubmit={this.onSubmit} >
                        <p >First Name</p>
                        <input
                            className={['form-control', formErrors.firstName.length > 0 ? 'error': null]}
                             name='firstName'
                            type='text'
                            placeholder='First Name' value={this.state.firstName}
                            onChange={this.change}
                            required={true}
                        />
                        {formErrors.firstName.length > 0 && (
                            <span className='errorMessage'>{formErrors.firstName}</span>
                        )}
                        <p className="form-group">Last Name</p>
                        <input
                            className={['form-control', formErrors.lastName.length > 0 ? 'error': null]}
                            name='lastName' type='text'
                            placeholder='Last Name' value={this.state.lastName}
                            onChange={this.change}
                            required={true}
                        />
                        {formErrors.lastName.length > 0 && (
                            <span className='errorMessage'>{formErrors.lastName}</span>
                        )}
                        <p>Username</p>
                        <input
                            className={['form-control', formErrors.userName.length > 0 ? 'error': null]}
                            name= 'userName' type='text'
                            placeholder='Username' value={this.state.userName}
                            onChange={this.change}
                            required={true}

                        />
                        {formErrors.userName.length > 0 && (
                            <span className='errorMessage'>{formErrors.userName}</span>
                        )}
                        <p>Email</p>
                        <input
                            className={['form-control',formErrors.email.length > 0 ? 'error': null]}
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
                            className={['form-control',formErrors.password.length > 0 ? 'error': null]}
                            name='password'
                            type='password'
                            placeholder='Password' value={this.state.password}
                            onChange={e=>this.change(e)}
                            required={true}

                        />

                        {formErrors.password.length > 0 && (
                            <span className='errorMessage'>{formErrors.password}</span>
                        )}
                        <br />
                        <button  className="btn1" type="submit"> Submit </button>
                    </form>
                </div>
            </div>

        );
    }
}

export default Register ;