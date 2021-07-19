import React from 'react' ;
import Dashboard from './Dashboard' ;
import Register from './Register';
import Login from './Login' ;
import '../css/Header.css';
import '../css/App.css';
import Username from './Username';
import '../css/common.css'
import {BrowserRouter as Router, Switch,Route,Link, Redirect} from 'react-router-dom' ;
import * as FaIcons from "react-icons/fa";
import Profile from "./Profile";


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
                //first time loggging valid
                this.props.logInValid() ;
            }
            else if (!this.state.log){

            }
        }) ; 
    }
    renderClose =() =>{
        var elem = document.getElementById('DashButton') ;
        console.log('Header clicked', elem.style.display)
        if (elem!==null){ 
            elem.style.visibility='hidden' ;
        }
    }
    renderOpen = () =>{
        var elem = document.getElementById('DashButton') ;
        if (elem!==null){ 
            elem.style.visibility='visible' ;
        }
    }

    toogleDashMenu = () =>{
        var elem = document.getElementById('modal1') ;
        console.log('clicked', elem.style.display)
        if (elem !== null){
            elem.style.display='block' ;
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
                    <img id="logoImg" alt={"NoCapLogo"} src={`${this.props.api}/NoCapLogo.jpeg`} />
                    <h4>Graph Path</h4>
                   {/* If the user is logged in , display the relevant header info */}
                   {
                       this.state.log ? 
                       
                       <div className="UsernameDiv">
                            <Link to="/profile">
                                <Username userEmail={this.state.loggedUser} />
                            </Link>
                    
                            <FaIcons.FaPowerOff id="powerBtn" onClick={()=>this.changeStatus(false)} />
                            <FaIcons.FaBars id="DashButton" onClick={this.toogleDashMenu} />
                        </div>   
                        : //else not logged in
                        <span>
                        <br/>
                        <Link className="App-link" to="/signIn" >LogIn</Link>
                           
                        <Link className="App-link" to="signUp">SignUp</Link>
                        </span>   
                   }
                </header>
                <Switch>
                
                    <Route path="/signIn">
                        {this.state.log === true ? 
                            <Redirect to="/dashboard" />:<span></span>}
                            <Login logIn={this.changeStatus} 
                                updateUser = {this.updateLoggedUser}
                            />
                    </Route>
                    <Route path="/signUp">
                        <Register />
                    </Route>
                    <Route path="/profile" > 
                        <Profile />
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