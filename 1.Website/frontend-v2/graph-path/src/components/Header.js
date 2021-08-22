import {React,Component} from "react";
import {  Divider,Modal, Button } from 'rsuite';
import "rsuite/dist/styles/rsuite-dark.css" ;
import Register from './Register' ;
import {HashRouter as Router,Link,Switch,Route} from 'react-router-dom' ;
import ProjectManager from "./ProjectManager";
import Dashboard from "./Dashboard";


class CustomHeader extends Component{

    constructor(props){
        super(props);
        this.state={
            show:false,
            logged:false
        }
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }
    changeLogStatus=()=>{
        this.setState({
            logged:!this.state.logged
        }) ;
    }
    open(){
        this.setState({ show: true})
    }
    close(){
        this.setState({show: false})
    }
    render(){
        return (
            <Router>
                <div data-testid="tidHeader">
                   
                    <Divider>
                        <Link to="/projects" className="link-btn, link-text">To ProjectManager</Link>
                    </Divider>
                    <Divider>
                        <Link to="/dashboard" className="link-btn, link-text">Dashboard</Link>
                    </Divider>
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
                    <Button data-testid="tidSignUpLink" onClick={this.open} id='signup-btn'>Sign Up</Button>

                            </>
                        }} />
                        <Route path='/projects' render={()=>{
                            return 
                        }}/>

                        <Route path='/dashboard' render={()=>{
                            return(
                                <>
                                    <Dashboard/>
                                </>
                            )
                        }}

                        />
                    </Switch>
                </div>
            </Router>
        )
    }
}


export default CustomHeader ;