import React from 'react';
import './css/App.css';
import './css/Login.css'
import Header from './components/Header' ; 
import Dashboard from './components/Dashboard' ;
import Register from './components/Register';
import Login from './components/Login'

/*Changed this to class type*/
class App extends React.Component {

  constructor(props){
    super(props) ; 
    this.state = {
      logged: false ,
      dash:false
    }
  }

  login = () =>{
    // console.log('App must login') ;
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

  dashboardViewToogle = () =>{
    this.setState({
      dash:!this.state.dash
    }) ; 
  }



  render(){

    if (this.state.logged){
      return (
        <div className="App">
        <Header log={this.state.logged} logOut={this.logoff} />
        <Dashboard toogleDash={this.dashboardViewToogle}/>
      </div>
      ) ; 
    }
    else if (this.state.dash && this.state.logged){
      return (
        <div className="App">
        <Header log={this.state.logged} logOut={this.logoff} dashboard={this.state.dash} dashboardView={this.dashboardViewToogle} />
        <Dashboard toogleDash={this.dashboardViewToogle} />
      </div>
      ) ;
    }
    else{

      return (
          <div className="App">
            <Header log={this.state.logged} />
            <Register />

            <Login changeLog={this.login} />
        </div>
      );
    } //else
  }
}

export default App;
