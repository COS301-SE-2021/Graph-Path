import {React,Component} from "react";


//import "rsuite/dist/styles/rsuite-default.css" ;

// import '../css/Header.css'
import Login from './Login'
import landingSnap from '../img/landing.png';
import {  Form,FormGroup,FormControl,ControlLabel,Modal, Button, Divider } from 'rsuite';

import "rsuite/dist/styles/rsuite-dark.css" ;
import Register from './Register' ;
import {HashRouter as Router,Switch,Route, Redirect} from 'react-router-dom' ;
import ProjectManager from "./ProjectManager";
import Dashboard from "./Dashboard";
import Landing from './Landing' ;



class CustomHeader extends Component{

    constructor(props){
        super(props);
        this.state={

            show1:false,
            show2:false,

            show:false,
            openSignin:false,
            logged:false

        }
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }
    changeLogStatus=()=>{
        console.log('logged')
        this.setState({
            logged:!this.state.logged
        }) ;
    }
    open(){
        this.setState({ show1: true,show2:false})
    }
    close(){
        this.setState({show1: false})
    }
    signInMododal = ()=>{
        this.setState({
            openSignin:!this.state.openSignin
        }) ;
        
    }
    render(){
        return (
            <div data-testid="tidHeader">
                <Router>

                   {
                       !this.state.logged?<Redirect to="/home"/>:""
                   }
                    <Switch>
                        <Route path="/home" exact render={()=>{
                            return <>
                            <Landing logInvalid={this.changeLogStatus} />
                    
                            </> 
                        }} />
                       
                        <Route path='/dashboard' render={()=>{
                            return(
                                <>
                                    <Dashboard/>
                                </>
                            )
                        }}
                        />
                        <Route path='/signin' render={ ()=>{
                                console.log('rendering...')

                    return (
                                <div>        
                               <Modal   show={this.state.openSignin} onHide={this.closeLog} size="xs" >
                                    <Modal.Header>
                                        <Modal.Title>Sign In</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Login login={this.changeLogStatus}/>
                                    </Modal.Body>
                                </Modal>
                            </div>
                            )
                        }} />
               
                    </Switch>
            </Router>
            </div>

        )
    }
}


export default CustomHeader ;