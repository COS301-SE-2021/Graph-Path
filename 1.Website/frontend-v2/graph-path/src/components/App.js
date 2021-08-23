import React from 'react';
import '../css/App.css';
import Landing from './Landing'

//import Register from './Register'

import Header from './Header' ;
import {HashRouter as Router} from 'react-router-dom' ;



class App extends React.Component {
    render(){
    return (
      // <Router>
        <div className="App" data-testid="tidApp">    
            <Landing />
        </div>
      /* </Router> */
      
    );
  }
}

export default App;
