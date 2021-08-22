import {React,Component} from "react";
import {  Modal, Button } from 'rsuite';
import "rsuite/dist/styles/rsuite-default.css" ;
import Register from './Register'
import '../css/Header.css'
import Login from './Login'
import landingSnap from '../img/landing.png'

class CustomHeader extends Component{

    constructor(props){
        super(props);
        this.state={
            show1:false,
            show2:false
        }
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }
    open(){
        this.setState({ show1: true,show2:false})
    }
    close(){
        this.setState({show1: false})
    }
    render(){
        return (

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

        )
    }
}


export default CustomHeader ;