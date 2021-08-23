import {React,Component} from "react";


//import "rsuite/dist/styles/rsuite-default.css" ;

import '../css/Header.css'
import Login from './Login'
import landingSnap from '../img/landing.png';
import {  Form,FormGroup,FormControl,ControlLabel,Modal, Button, Divider } from 'rsuite';

import "rsuite/dist/styles/rsuite-dark.css" ;
import Register from './Register' ;
import {HashRouter as Router,Switch,Route, Redirect} from 'react-router-dom' ;
import ProjectManager from "./ProjectManager";
import Dashboard from "./Dashboard";



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
            <Router>
            <div>
                <img src={landingSnap} alt="Logo"/>
                <Modal   show={this.state.show1} onHide={this.close} size="xs" >
                    <Modal.Header>
                        <Modal.Title>Sign Up</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Register />
                    </Modal.Body>
                </Modal>
                <Button onClick={this.open} id='signup-btn'>Sign Up</Button>

                <Modal   show={this.state.show2} onHide={this.close} size="xs">
                    <Modal.Header>
                        <Modal.Title>Sign In</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Login />
                    </Modal.Body>
                </Modal>
                <Button onClick={this.open} id='signin-btn'>Sign In</Button>
            </div>


                <div data-testid="tidHeader">
                   
                    <Switch>
                        <Route path="/" exact render={()=>{
                            return <>
                             <Modal   show={this.state.show} onHide={this.close} size="xs">
                        <Modal.Header>
                            <Modal.Title>Sign Up</Modal.Title>

                        </Modal.Header>
                        <Modal.Body>
                            <Register />
                        </Modal.Body>
                    </Modal>
                    
                    <Modal show={this.state.openSignin} onHide={this.signInMododal}> 
                    <Modal.Header>
                                <Modal.Title>Sign Up</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <Form onSubmit={this.changeLogStatus}  formValue={this.state.formValue} onChange={this.handleChange} data-testid="tidLoginForm">

                            <FormGroup>
                                <ControlLabel> Email</ControlLabel>
                                <FormControl name="email" type="email"/>
                            </FormGroup>

                            <FormGroup>
                                <ControlLabel> Password</ControlLabel>
                                <FormControl name="password" type="password"/>
                            </FormGroup>
                            
                            <FormGroup>
                                <FormControl type="submit"/>
                            </FormGroup>
                        </Form>
                                        </Modal.Body>
                                </Modal>
                    <Button data-testid="tidSignUpLink" onClick={this.open} id='signup-btn'>Sign Up</Button>
                    <Button data-testid="tidSignUpLink" onClick={this.signInMododal}>Sign In</Button>



                    <Divider>
                        <Link to="/projects" className="link-btn, link-text">To ProjectManager</Link>
                    </Divider>
                    <Switch>
                        <Route path='/projects' render={()=>{
                            return <>
                                <ProjectManager />

                            {
                                this.state.logged?<Redirect to="/dashboard" />:""
                            }
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
                            return (
                                <>
                               

                            </>
                            )
                        }} />
                    </Switch>
                </div>
            </Router>
        )
    }
}


export default CustomHeader ;