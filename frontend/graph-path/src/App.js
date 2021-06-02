import './css/App.css';
import Dashboard from './components/Dashboard' ;
import Register from './components/Register';
import Login from './components/Login'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        Graph Path
        </header>
       <Dashboard />

        <Register/>

        <Login />
    </div>
  );
}

export default App;
