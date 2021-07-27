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
                    {/* <h2>First name</h2>
                    <p>{userInfo.firstName}</p>
                    <input placeholder={userInfo.firstName} value="livhu" />
                    <hr/>

                    <h2>Last name</h2>
                    <p>{userInfo.surname}</p>
                    <hr/>
                    <h2>Username</h2>
                    <p>{userInfo.username}</p>
                    <hr/>
                    <h2>Email</h2>
                    <p>{userInfo.email}</p>
                    <hr/>
                    */}
                    <form className="profileForm"  >
                        <p>First Name</p>
                        <input type="text" value={userInfo.firstName} />

                        <p>Last Name</p>
                        <input type="text" value={userInfo.lastName}/>

                        <p>Username</p>
                        <input value={userInfo.username} />

                        <p>Email</p>
                        <input type="text" placeholder="Enter email" value={userInfo.email}/>
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