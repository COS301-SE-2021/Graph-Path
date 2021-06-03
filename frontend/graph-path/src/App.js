import './css/App.css';
import React, { Component}from 'react' ;
/*import React, { Component} from 'react'*/
import Dashboard from './components/Dashboard' ;
import Register from './components/Register';
import Login from './components/Login'

/*Changed this to class type*/
class App extends Component {

    /*Check the user inputs*/
    onSubmit =fields =>{
        console.log('User inputs: ', fields);
    }
    render(){
    return (
            <div className="App">
                <header className="App-header">
                 Graph Path
                </header>
                     <Dashboard />

                    <Register onSubmit={fields=> this.onSubmit(fields)}/>

                    <Login onSubmit={fields=> this.onSubmit(fields)}/>
            </div>
);
}

}

export default App;
