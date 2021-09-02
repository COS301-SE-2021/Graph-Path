import React from 'react';
import './css/App.css';

//import Register from './Register'

import Header from './components/Header' ;
import {HashRouter as Router} from 'react-router-dom' ;
import { Provider} from 'react-redux' ;
import store from './components/Helpers/Reducer';


// import 

function createUser(user){
  console.log('action',user)
  return {
    type:'CREATE_USER',
    payload:user
  }
}

function updateUserToken(token){
  return {
    type:'UPDATE_TOKEN' ,
    payload: {
      token:token
    }
  }
}

function mapStateToProps(state){
  return state ;
}

const mapDispatchToProps = {
  updateUserToken,
  createUser
}

//reducer
function reducer(state ,action){
  switch(action.type ){
    case 'UPDATE_TOKEN':
      let auth = {
        token: action.payload.token
      }
      let newState = Object.assign(state,auth) ;
      return newState ;
    case  'CREATE_USER' :{
      return {
        loggedUser:action.payload}
    }
    default:
      return state
  }
}

// const ConnectedHeader = connect(mapStateToProps,mapDispatchToProps)(Header) ;

class App extends React.Component {
    render(){
    return (
      <Provider store={store}>
      <Router>
        <div className="App" data-testid="tidApp">    
            <Header />
            {/* <ConnectedHeader /> */}
        </div>
       </Router> 
       </Provider>
    );
  }
}

export default App;
