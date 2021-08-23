import React from 'react'
import landingSnap from "../img/landing.png";
import {Button, Modal} from "rsuite";
import Register from "./Register";
import Login from "./Login";
import '../css/Landing.css'
import { withRouter, Route,HashRouter as Router, Switch, Redirect } from 'react-router-dom';

class Landing extends React.Component{
    constructor(props){
        super(props);
        this.state={

            show:false,
            show1:false

        }
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);

        this.closeLog = this.close.bind(this);
        this.openLog = this.open.bind(this);
}

//Deal with Register
    close() {
        this.setState({ show: false });
    }
    open() {
        this.setState({ show: true });
    }

    //Deal with Login
    closeLog() {
        this.setState({ show1: true });
    }
    openLog() {
        this.setState({ show1: true });
        
    }

    nextPath =(path)=>{
        this.props.history.push(path)
    }

    render(){
        return(
           <div>
               <Router>
               <span  >
                   <p className="aboutText">
                       Graph path is an interactive graph based project Management tool.
                       It aims to organise tasks of a project on a interactive and user friendly graph.
                       This system takes all the tasks of a project that needs to be done and organises them into a graph to make it easier to use and understand.
                       The specific type of graph should be a DirectedAcyclic Graph since it would be easy to read,
                       understand and it would provide a very user friendly interface to interact with.
                   </p>
               </span>


               <img src={landingSnap} alt="Logo"/>
               <Modal   show={this.state.show} onHide={this.close} size="xs" >
                   <Modal.Header>
                       <Modal.Title>Sign Up</Modal.Title>
                   </Modal.Header>
                   <Modal.Body>
                       <Register />
                   </Modal.Body>
               </Modal>
               <Button onClick={this.open} id='signup-btn'>Sign Up</Button>

               
               <Button onClick={()=>this.nextPath('/signin')} id='signin-btn'>Sign In</Button>
               <Switch>
               <Route path='/signin' render={ ()=>{
                                console.log('rendering...')

                    return (
                                <div>        
                               <Modal   show={true} onHide={this.nextPath('/')} size="xs" >
                                    <Modal.Header >
                                        <Modal.Title>Sign In</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Login login={this.props.logInValid}/>
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

export default withRouter(Landing);