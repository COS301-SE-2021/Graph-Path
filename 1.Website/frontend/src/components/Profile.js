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
            disabled : true
        }
    }

    enableEdit = () => {
        this.setState({
            disabled: false
        })
    }
    render() {
    // console.log(' prop objects',this.props) ; 
    const {match} = this.props  ;
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
                    <form className="profileForm"  >
                        <label>First Name</label>
                        <input type="text"
                               placeholder="Enter First Name"
                               defaultValue={userInfo.firstName}
                               disabled = {(this.state.disabled) ? "disabled" : ""} />

                        <label>Last Name</label>
                        <input type="text"
                               placeholder="Enter Last Name"
                               defaultValue={userInfo.lastName}
                               disabled = {(this.state.disabled) ? "disabled" : ""} />

                        <label>Username</label>
                        <input type="text"
                               placeholder="Enter Username"
                               defaultValue={userInfo.username}
                               disabled = {(this.state.disabled) ? "disabled" : ""} />

                        <label>Email</label>
                        <input type="text"
                               placeholder="Enter Email"
                               defaultValue={userInfo.email}
                               disabled/>

                        <label>New Password</label>
                        <input placeholder="Enter New Password"
                               type="password"
                               disabled = {(this.state.disabled) ? "disabled" : ""} />

                        <input type="submit"
                               className="btn1"
                               value="Update"
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