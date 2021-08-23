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
}

//Deal with Register
    close() {
        this.setState({ 
            show: false,
            show1:false });
        
    }
    open() {
        this.setState({ show: true });
    }

    //Deal with Login
    closeLog() {
        this.setState({ show1: false });
    }
    openLog=()=> {
        console.log('openig login')
        this.setState({ show1: true });
        
    }

    nextPath =(path)=>{
        this.props.history.push(path)
    }

    render(){
        console.log('landing props',this.props, this.state) ;
        const {location} = this.props ;
        return(
           <div>
               <span  >
                   <h1>About </h1>
                   <p className="aboutText">
                       Graph path is an interactive graph based project Management tool.
                       It aims to organise tasks of a project on a interactive and user friendly graph.
                       This system takes all the tasks of a project that needs to be done and organises them into a graph to make it easier to use and understand.
                       The specific type of graph should be a DirectedAcyclic Graph since it would be easy to read,
                       understand and it would provide a very user friendly interface to interact with.
                   </p>
               </span>


               <img src={landingSnap} alt="Logo"/>
               <Modal   show={this.state.show || this.state.show1} onHide={this.close} size="xs" >
                   <Modal.Header>
                       <Modal.Title>Sign Up</Modal.Title>
                   </Modal.Header>
                   <Modal.Body>
                       {
                           this.state.show ? 
                            <Register />
                       :<Login login={this.props.logInvalid}/>
                       }

                   </Modal.Body>
               </Modal>
               <Button onClick={this.open} id='signup-btn'>Sign Up</Button>
               
               <Button onClick={()=>this.openLog()} id='signin-btn'>Sign In</Button>
           </div>
        )
    }
}

export default withRouter(Landing);