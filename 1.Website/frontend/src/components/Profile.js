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
    console.log(' prop objects',this.props) ; 
    const {match} = this.props  ;
    console.log('match objects',match) ; 

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
                * Change Password*/}

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