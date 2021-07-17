import React from 'react';
import '../css/Profile.css'

import {Link} from 'react-router-dom' ;

class Profile extends React.Component{
    render() {
        return(
            <div className="profileContainer">
                <div className="App-Link">
                    <Link to="/dashboard">Dashboard</Link> 
                    <span>   .   </span>
                    <Link to="/editProfile">Edit Profile</Link>
                </div>

                <h1>Profile</h1>
                {/*
                * Change Email
                * Change Username
                * Change Password*/}


            </div>

        )
    }
}
export default Profile;