import React from 'react';
import './css/App.css';

//import Register from './Register'

import Header from './components/Header' ;
import {HashRouter as Router} from 'react-router-dom' ;
import { Provider} from 'react-redux' ;
import store from './components/Helpers/Reducer';


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
