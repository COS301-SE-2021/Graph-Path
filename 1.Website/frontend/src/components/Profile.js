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
    render() {
    // console.log(' prop objects',this.props) ; 
    const {match} = this.props  ;
    const userInfo = this.props.userEmail;
        return(
            <div className="profileContainer">
                <div className="App-Link">
                    <Link to="/dashboard">Dashboard</Link>
                    <span>   .   </span>
                    <Link to={`${match.url}/editProfile`} >Edit Profile</Link>
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
                        <input placeholder="Enter First Name" defaultValue={userInfo.firstName} />

                        <label>Last Name</label>
                        <input placeholder="Enter Last Name" defaultValue={userInfo.lastName}/>

                        <label>Username</label>
                        <input placeholder="Enter Username" defaultValue={userInfo.username}  />

                        <label>Email</label>
                        <input placeholder="Enter Email" defaultValue={userInfo.email}/>

                        <label>New Password</label>
                        <input placeholder="Enter New Password" type="password"/>

                        <input type="submit" className="btn1" value="Update" />
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