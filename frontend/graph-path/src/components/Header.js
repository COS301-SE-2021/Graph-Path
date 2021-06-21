import React from 'react' ;
import Dashboard from './Dashboard' ;
import Register from './Register';
import Login from './Login' ;
import '../css/Header.css';
import '../css/App.css';
import '../css/common.css'
import {BrowserRouter as Router, Switch,Route,Link} from 'react-router-dom' ;


class Header extends React.Component{
    constructor(props){
        super(props) ; 
        this.state = {
            log:false,
            status:this.props.status||"Please log in",

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

    render(){
        if (this.state.log){
        // var elem = document.getElementById('DashButton').style.display = "none" ;
            return (
                <Router>
                    <div className="bigHeader">
                    <header className="App-header">
                    <h4>Graph Path</h4>
                    <div className="App-link">
                        <label>&#9786; :</label> 
                        <div className="drop"> 
                            <button className="dropbtn">Options</button>
                            <div className="dropdown-content">     SignOut
                            <a href="#" onClick={this.changeStatus}> SignOut</a>
                            </div>
                        </div>
                        </div>
                        <button id="DashButton" onClick={this.toogleDashMenu}>Menu</button>
                    </header>

                    <Switch path="signOut">
                        <Dashboard logOut={this.changeStatus} 
                            menuToogleClose={this.renderClose}
                            menuToogleOpen={this.renderOpen}
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
                            <Login logIn={this.changeStatus} />
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