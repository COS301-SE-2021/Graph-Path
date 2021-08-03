import React from 'react';
import '../css/Profile.css'

import {Link, withRouter, Route, Switch} from 'react-router-dom' ;

function EditView (){

    // const {url} = match
    return (<h1>
        EditView
    </h1>)
}



class Profile extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            disabled : true,
            empty : false,
            valid: false,
            username: '',
            password: '',

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
        console.log(this.state)
        //check if all field are updated

        if(this.state.username !== '' && this.state.password !== ''){
            const data = {
                username: this.state.username,
                password: this.state.password
            }
            console.log("data",data)
            this.sendData(data)
        }else if(this.state.username !== '' && this.state.password === ''){
            const data = {
                username: this.state.username
            }
            console.log("data",data)
            this.sendData(data)
        }else if(this.state.username === '' && this.state.password !== ''){
            const data ={
                password: this.state.password
            }
            console.log("data",data)
            this.sendData(data)
        }else{
            //dont send any data
        }


    }

    sendData(data){

    }

    render() {
    // console.log(' prop objects',this.props) ; 
    const {match} = this.props  ;
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
                               value={this.state.username}
                               disabled = {(this.state.disabled) ? "disabled" : ""} />
                        {
                            this.state.empty === true ? <div  >Field cannot be empty</div> : ""
                        }

                        <label>Email</label>
                        <input defaultValue={userInfo.email}
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

                <div>
                    <Switch>
                        <Route path={`${match.url}/editProfile`} component={EditView}/>
                    </Switch>
                </div>
            </div>

        )
    }
}
export default withRouter(Profile);