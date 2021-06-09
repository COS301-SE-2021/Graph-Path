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
            log:false
        }
    } 
    changeStatus = () =>{
        this.setState({
            log:!this.state.log
        },()=> {
            if (this.state.log && typeof this.props.logInValid === 'function'){
                this.props.logInValid() ;
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
                        {/* <form >
                            <input className="App-link"
                            type="submit" value="LogOff" 
                            onClick={this.props.logOut} />  
                        </form> */}
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
                    </header>
                    {/* <form className="form-header"> */}
                        <Link className="App-link" to="/signIn" >LogIn</Link>
                        {/* <input className="App-link"
                         type="submit" value="LogIn" 
                         onClick={this.props.logOut} />  
                         */}
                        <Link className="App-link" to="signUp">SignUp</Link>
                        {/* <input className="App-link"
                         type="submit" value="SignUp" 
                         onClick={this.props.logOut} />  */}
                    {/* </form> */}
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