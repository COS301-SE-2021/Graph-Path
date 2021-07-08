import React from 'react' ;
import Dashboard from './Dashboard' ;
import Register from './Register';
import Login from './Login' ;
import '../css/Header.css';
import '../css/App.css';
import Username from './Username';
import '../css/common.css'
import {BrowserRouter as Router, Switch,Route,Link} from 'react-router-dom' ;
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
    changeStatus = () =>{
        this.setState({
            log:!this.state.log
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
        if (this.state.log && this.state.loggedUser!== {}){
        // var elem = document.getElementById('DashButton').style.display = "none" ;
            return (
                <Router>
                    <div className="bigHeader">
                    <header className="App-header">
                    <h4>Graph Path</h4>

                    <div className="UsernameDiv">
                        <Link to="/profile">
                            <Username userEmail={this.state.loggedUser} />
                        </Link>

                        <FaIcons.FaPowerOff id="powerBtn" onClick={this.changeStatus} />
                        <FaIcons.FaBars id="DashButton" onClick={this.toogleDashMenu} />
                    </div>
                        {/* <button id="DashButton" onClick={this.toogleDashMenu}>Menu</button>*/}

                    </header>
                    
                    <Switch >
                        <Route exact path="/profile" component={Profile}
                        />
                           <Route path="/" render={(props)=>(
                            <Dashboard {...props} 
                            logOut={this.changeStatus} 
                            menuToogleClose={this.renderClose}
                            menuToogleOpen={this.renderOpen}
                            loggedUser={this.state.loggedUser.email}
                        />
                        )}    
                            
                        />
                    </Switch>
                    

                    </div>
                </Router>
            )

        }
        else{
            return (
                <Router>
                <div className="header_">
                    <header className="App-header">
                    <h4>Graph Path</h4>
                    <p>{this.state.status}</p>
                    </header>
                        <Link className="App-link" to="/signIn" >LogIn</Link>
                        
                        <Link className="App-link" to="signUp">SignUp</Link>
                        <Switch>
                        <Route path="/signIn">
                            <Login logIn={this.changeStatus} 
                                updateUser = {this.updateLoggedUser}
                            />
                        </Route>
                        <Route path="/signUp">
                            <Register />
                        </Route>
                    </Switch>
                </div>
                </Router>
            )
        }
    }
}

export default Header ; 