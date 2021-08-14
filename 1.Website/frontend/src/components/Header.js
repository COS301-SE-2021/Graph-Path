import React from 'react' ;
import Dashboard from './Dashboard' ;
import Register from './Register';
import Login from './Login' ;
import '../css/Header.css';
import '../css/App.css';
import Username from './Username';
import '../css/common.css'
import '../css/Login.css'
import {BrowserRouter as Router, Switch,Route,Link, Redirect} from 'react-router-dom' ;
import * as FaIcons from "react-icons/fa";
import Profile from "./Profile";
import process_pic from "../images/process.svg";
import completeTask_pic from "../images/completed_task.svg";


class Header extends React.Component{
    constructor(props){
        super(props) ; 
        this.state = {
            log:false,
            status:this.props.status||"Please log in",
            loggedUser:{}
        }
    } 
    changeStatus = (val) =>{
        this.setState({
            log:val
        },()=> {
            if (this.state.log && typeof this.props.logInValid === 'function'){
                //first time logging valid
                this.props.logInValid() ;
            }
            else if (!this.state.log){

            }
        }) ; 
    }
    renderClose =() =>{
        const elem = document.getElementById('DashButton') ;
        console.log('Header clicked', elem.style.display)
        if (elem!==null){ 
            elem.style.visibility='hidden' ;
        }
    }
    renderOpen = () =>{
        const elem = document.getElementById('DashButton') ;
        if (elem!==null){ 
            elem.style.visibility='visible' ;
        }
    }

    toggleDashMenu = () =>{
        const elem = document.getElementById('modal1') ;
        let navB = document.getElementById('modal2');
        console.log('clicked', elem.style.display)
        if (elem !== null && navB !== null){
            elem.style.display='block' ;
            navB.style.display='block';
            this.renderClose() ; 
        }
        else{        
            console.log('clicked but null', elem.style.display)
            // this.renderOpen() ;
        }
    }

    updateLoggedUser = (userInfo) =>{
        this.setState({
            loggedUser:userInfo
        }) ;
    }

    render(){
        return(
            <Router>
                <div className={this.state.log ? "bigHeader":"header_"}>
                <header className="App-header">
                    {/*<img id="logoImg" alt={"NoCapLogo"} src={`${this.props.api}/NoCapLogo.jpeg`} />*/}
                    <h4>Graph Path</h4>
                   {/* If the user is logged in , display the relevant header info */}
                   {
                       this.state.log ? 
                       
                       <div className="UsernameDiv">
                            <Link to="/profile">
                                <Username userEmail={this.state.loggedUser} />
                            </Link>
                    
                            <FaIcons.FaPowerOff id="powerBtn" onClick={()=>this.changeStatus(false)} />
                            <FaIcons.FaBars id="DashButton" onClick={this.toggleDashMenu} />
                        </div>   
                        : //else not logged in
                        ""

                   }
                </header>
                    {
                        this.state.log === false ?
                            <>
{/* 
                                <div className="log-container">
                                    <div className="log">
                                        <Link className="btn1" id="btn1-link" to="/signIn" >Sign In</Link>

                                        <Link className="btn1" id="btn2-link" to="signUp">Sign Up</Link>

                                    </div>

                                </div> */}

                    <div className="login-reg-panel">
                        <div className="login-info-box">
                            <h2>Have an account</h2>
                            <Link to="/signIn"> <label id="label-register" htmlFor="log-reg-show">Sign In</label>
                            </Link>
                            <input type="radio" name="active-log-panel" id="log-reg-show" value="log-reg-show" />
                        </div>

                        <div className="register-info-box">
                        <h2>Don't have an account?</h2>
                        <Link to="signUp" ><label id="label-login" htmlFor="log-login-show">Sign Up</label>
                        </Link>
                        <input type="radio" name="active-log-panel" value="log-login-show" id="log-login-show" />
                        </div>
                    </div>


                                <img alt="Process " src={process_pic} className="img1"/>
                                <img alt="Complete Task " src={completeTask_pic} className="img2" />

                            </>
                            :
                            ""
                    }


                <Switch>
                
                    <Route path="/signIn">
                        {this.state.log === true ? 
                            <Redirect to="/dashboard" />:
                            <span/>}

                            <Login logIn={this.changeStatus} 
                                updateUser = {this.updateLoggedUser}

                            />
                    </Route>
                    <Route path="/signUp">
                
                        <Register />

                    </Route>
                    <Route path="/profile" > 
                        <Profile userEmail={this.state.loggedUser} updateUser = {this.updateLoggedUser}/>
                        {this.state.log === false ? 
                        <Redirect to="/signIn" />:<span/>}
                    </Route>
                
                    <Route path="/dashboard">
                        <Dashboard api={this.props.api}
                            menuToogleClose={this.renderClose}
                            menuToogleOpen={this.renderOpen}
                            loggedUser={this.state.loggedUser.email} />
                            {this.state.log === false ? 
                        <Redirect to="/signIn" />:<span/>}
                        
                    </Route>
                </Switch>
                </div>

            </Router>
        )
    }

    
}

export default Header ; 