import React from 'react';
import '../css/Profile.css'
import PopUpMessage from "./popUpMessage";

import {Link} from 'react-router-dom' ;
import axios from "axios";

class Profile extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            disabled : true,
            empty : false,
            valid: false,
            username: '',
            password: '',
            email: this.props.userEmail.email,
            api:'http://localhost:9001',
            answer:undefined,
            responseData:null,

            formErrors: {
                password:""
            }
        }
    }


    /* Change the form to be editable*/
    enableEdit = () => {
        this.setState({
            disabled: !this.state.disabled
        })
    }

    change =(e) => {
        e.preventDefault();
        const {name,value}=e.target;
        let formErrors = {...this.state.formErrors};
        switch(name){
            case 'username':
                this.setState({
                    empty : value.length === 0,
                    valid : name.match(/^[a-zA-Z]+$/)
                })
                break;

            case 'password':
                formErrors.password = value.length < 8 || value.length > 0 ? 'Minimum for password should be 8 characters'
                    : "";
                break;

            default: break;
        }

       this.setState({ formErrors, [name]: value });

    }
    /*
    * check if there are new changes
    * */
    formValid = ()=>{

    }

    onSubmit = (e) =>{
        e.preventDefault();
        console.log("submitted",this.state)
        //check if all field are updated
        //update this to an easier way******
        this.enableEdit();
        if(this.state.username !== '' && this.state.password !== ''){
            const data = {
                username: this.state.username,
                password: this.state.password,
            }
            this.sendData(data)
        }else if(this.state.username !== '' && this.state.password === ''){
            const data = {
                username: this.state.username,
                password: ''
            }
            this.sendData(data)
        }else if(this.state.username === '' && this.state.password !== ''){
            const data ={
                username: '',
                password: this.state.password
            }
            this.sendData(data)
        }else{
            //dont send any data
        }


    }

    sendData(data){
        try {
            /**
             * Set url for value(s) being updated
             */

            let url = '';
            if(data.username !== '' && data.password === ''){
                url = this.state.api+"/user/updateUserUsername/"+this.state.email+"/"+data.username;
            }else if(data.username === '' && data.password !== ''){
                url = this.state.api+"/user/updateUserPassword/"+this.state.email+"/"+data.password;
            }else if(data.username !== '' && data.password !== ''){
                url = this.state.api+"/user/updateUserUsernameAndPassword/"+this.state.email+"/"+data.username+"/"+data.password;
            }


            axios.patch(`${url}`)
                .then((response) => {
                    if (response.status === 400) {
                        throw Error(response.statusText);
                    }

                    const res = response.data;

                    this.setState({
                        answer: res.message,
                       // responseData:res.data
                    }, () => {
                       // console.log("response", this.state.responseData)
                        if (this.state.answer !== undefined) {
                            //alert(`Username or Password changed `)
                            //this.props.updateUser(data)

                        } else {
                            alert(`Something went wrong please update again `)
                        }
                    })
                }, (response) => {
                    console.log('rejected', response);
                    alert('Server Error, Please try again later');
                })
                .then(()=>{
                    axios.get(`http://localhost:9001/user/login/${this.state.email}`)
                        .then((response)=>{
                            if(response.status === 400){
                                throw Error(response.statusText);
                            }
                            const res = response.data;
                            this.setState({
                                responseData: res.data
                            },()=>{
                                console.log("resp",this.state)
                                if(this.state.responseData.username === data.username){
                                    this.props.updateUser(this.state.responseData);
                                }
                            })
                        })
                })

        }catch (error){
            console.log(error);
        }
    }

    render() {
    // console.log(' prop objects',this.props) ; 

        const {formErrors} = this.state;
    const userInfo = this.props.userEmail;
        return(
            <div className="profileContainer">
                <div className="App-Link">
                    <Link to="/dashboard" className="btn1" id="dashBtn">Dashboard</Link>
                    <span>   .   </span>
                    {/* <Link to={`${match.url}/editProfile`}  >Edit Profile</Link> */}
                    <input className="btn1" type="button" value="Edit Profile" onClick={this.enableEdit} disabled = {(this.state.disabled) ? "" : "disabled"} />
                </div>

                <h1>Profile</h1>
                {/*
                * Change Email
                * Change Username
                * Change Password
                * Invite link
                */}

                <div className="info">
                    <form className="profileForm" onSubmit={this.onSubmit} >
                        <label>First Name</label>
                        <input value={userInfo.firstName}
                           disabled type='text'    />


                        <label>Last Name</label>
                        <input value={userInfo.lastName}
                           disabled
                        type='text'/>


                        <label>Username</label>
                        <input type="text"
                               name="username"
                               placeholder="Enter Username"
                               defaultValue={userInfo.username}
                               onChange={this.change}
                               disabled = {(this.state.disabled) ? "disabled" : ""} />
                        {
                            this.state.empty === true ? <div  >Field cannot be empty</div> : ""
                        }

                        <label>Email</label>
                        <input value={userInfo.email}
                               type='text'
                               disabled/>

                        <label>New Password</label>
                        <input placeholder="Enter New Password"
                               name="password"
                               type="password"
                               onChange={this.change}
                               value={this.state.password}
                               disabled = {(this.state.disabled) ? "disabled" : ""} />

                        {formErrors.password.length > 0 && (
                            <span className='errorMessage'>{formErrors.password}</span>
                        )}

                        <input type="submit"
                               className="btn1"
                               value="Update"

                               disabled = {(this.state.disabled) ? "disabled" : ""} />


                        <input type="button"
                               className="btn1"
                               id="cancelBtn"
                               value="Cancel"
                               onClick={this.enableEdit}
                               disabled = {(this.state.disabled) ? "disabled" : ""} />

                    </form>


                </div>
                <PopUpMessage trigger={false}>
                    <p>This is a pop up</p>
                </PopUpMessage>

            </div>

        )
    }
}
export default Profile;