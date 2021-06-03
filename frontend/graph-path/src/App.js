import React from 'react';
import Header from './components/Header' ; 
import './css/App.css';
import Dashboard from './components/Dashboard' ;
import Register from './components/Register';
import Login from './components/Login'


class App extends React.Component {

  constructor(props){
    super(props) ; 
    this.state = {
      logged: false 
    }
  }

  login = () =>{
    console.log('App must login') ;
    this.setState({
      logged: true
    }) ; 
  }

  logoff = () =>{
    console.log('App must logout') ;
    this.setState({
      logged: false
    }) ; 
  }

  registerUser = () =>{
    // this.setState({
    //   logged: true
    // }) ; 
  }



  render(){

    if (this.state.logged){
      return (
        <div className="App">
        <Header log={this.state.logged}/>
        <Dashboard />
      </div>
      ) ; 
    }
    else{

      return (
          <div className="App">
            <Header log={this.state.logged} logOut={this.logoff}/>
            <Register/>

            <Login changeLog={this.login} />
        </div>
      );
    } //else
  }
}

export default App;
