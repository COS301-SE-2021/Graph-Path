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
            valid: false
        }
    }

    /* Change the form to be editable*/
    enableEdit = () => {
        this.setState({
            disabled: false
        })
    }

    change =(e) => {
        e.preventDefault();
        const {name,value}=e.target;

        switch(name){
            case 'username':
                this.setState({
                    empty : value.length === 0,
                    valid : name.match(/^[a-zA-Z]+$/)
                })
                break;

            case 'password':
                this.setState({

                })
                break;
        }

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
                            this.state.empty === true ? <div className="errorSpan" >Field cannot be empty</div> : ""
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
                               disabled = {(this.state.disabled) ? "disabled" : ""} />
                        {

                        }

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