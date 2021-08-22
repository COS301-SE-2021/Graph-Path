import {React,Component} from "react";
import {  Modal, Button } from 'rsuite';
import "rsuite/dist/styles/rsuite-default.css" ;
import Register from './Register'

class CustomHeader extends Component{

    constructor(props){
        super(props);
        this.state={
            show:false
        }
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }
    open(){
        this.setState({ show: true})
    }
    close(){
        this.setState({show: false})
    }
    render(){
        return (
            <div>
                <Modal   show={this.state.show} onHide={this.close} size="xs">
                    <Modal.Header>
                        <Modal.Title>Sign Up</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Register />
                    </Modal.Body>
                </Modal>
                <Button onClick={this.open} id='signup-btn'>Sign Up</Button>
            </div>

        )
    }
}


export default CustomHeader ;