import React from 'react';
import './css/App.css';
import './css/Login.css'
import Header from './components/Header' ;
import Register from './components/Register';
import Login from './components/Login' ;
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min.js';
import $ from 'jquery';

/*Changed this to class type*/
class App extends React.Component {

  constructor(props){
    super(props) ; 
    this.state = {
      logged: false,
      api:"http://localhost:9001",
      isLogged: true
    }
  }



  logInValid = () =>{
    // console.log('App must login') ;
    this.setState({
      logged: true
    }) ; 
  }

  logOffValid = () =>{
    console.log('App must logout') ;
    this.setState({
      logged: false
    }) ; 
  }

  // dashboardViewToogle = () =>{
  //   this.setState({
  //     dash:!this.state.dash
  //   }) ; 
  // }

componentDidMount()
{
  // $(document).ready(function(){
  //   $('.login-info-box').fadeOut();
  //   $('.login-show').addClass('show-log-panel');


  //   $('input[type="radio"]').on('change',function() {

  //     if($('#log-reg-show').is(':checked')) {
  //       $('.register-info-box').fadeIn();
  //       $('.login-info-box').fadeOut();

  //       $('.white-panel').removeClass('right-log');

  //       $('.login-show').addClass('show-log-panel');
  //       $('.register-show').removeClass('show-log-panel');
  //     }
  //     if($('#log-login-show').is(':checked')) {
  //       $('.register-info-box').fadeOut();
  //       $('.login-info-box').fadeIn();

  //       $('.white-panel').addClass('right-log');

  //       $('.register-show').addClass('show-log-panel');
  //       $('.login-show').removeClass('show-log-panel');

  //     }
  //   });
  // });

}

  render(){
    const url = this.state.api ;



    return(
        <div className="App">
          <Header api={url} logOut={this.logOffValid} logInValid={this.logInValid}/>

        </div>
    )



              {/* <div className="login-reg-panel">
                  <div className="login-info-box">
                    <h2>Have an account</h2>
                    <label id="label-register" htmlFor="log-reg-show">Sign In</label>
                    <input type="radio" name="active-log-panel" id="log-reg-show" value="log-reg-show" />
                  </div>

                <div className="register-info-box">
                  <h2>Don't have an account?</h2>
                  <label id="label-login" htmlFor="log-login-show">Sign Up</label>
                  <input type="radio" name="active-log-panel" value="log-login-show" id="log-login-show" />
                  </div> */}
                
                {/* <div className="white-panel">
                  <div className="register-show">
                    <Register/>
                  </div>
                  <div className="login-show">
                  <Login/>
                  </div>

                </div> */}



              {/* </div> */}


    /*if (this.state.logged){

      return (
        <div className="App">
        <Header
        api={url}
        logOut={this.logOffValid} />
      </div>
      ) ;
    }
    else{

      return (
          <div className="App">
            <Header status="Please sign in, or sign up for an account"
            logInValid={this.logInValid}
            api={url}
            />
          <div>
            <img src={url} alt="img1" />
          </div>
        </div>
      );
  }
*/
}

}


export default App;

// **************************************************//


    // else if (this.state.dash && this.state.logged){
    //   return (
    //     <div className="App">
    //     <Header log={this.state.logged} logOut={this.logoff} dashboard={this.state.dash} dashboardView={this.dashboardViewToogle} />
    //     <Dashboard toogleDash={this.dashboardViewToogle} />
    //   </div>
    //   ) ;
    // }