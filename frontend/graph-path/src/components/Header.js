import React from 'react' ;
import Dashboard from './Dashboard' ;
import Register from './Register';
import Login from './Login' ;
import '../css/App.css';
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

    render(){
        if (this.state.log){
            return (
                <Router>
                    <div>
                    <header className="App-header">
                    <div>Graph Path</div>    
                    <div className="App-link">
                        <Link to="/signOut" onClick={this.changeStatus}>signOut</Link>
                        </div>
                    </header>
                    <Switch path="sinOut">
                        <Dashboard logOut={this.changeStatus} />
                    </Switch>
                    

                    </div>
                </Router>
            )

        }
        else{
            return (
                <Router>
                <div>
                    <header className="App-header">
                    Graph Path
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