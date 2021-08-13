import React from 'react';
import '../css/Reports.css';
//import {Button, Offcanvas} from "react-bootstrap";

class Reports extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show: false,

        }
    }

    handleClose = () =>{
        this.setState({
            show:false
        })
    }

    handleShow = () =>{
        this.setState({
            show: !this.state.show
        })
    }
    render() {
        return(
            <>
                <h1>Hello</h1>

                {/*  <Button onClick={this.handleShow} className="close">Members</Button>
                <Offcanvas show={this.state.show} onHide={this.handleClose}>
                    <Offcanvas.Header closeButton >
                        <Offcanvas.Title>Members</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>

                            livhu

                    </Offcanvas.Body>

                </Offcanvas>*/}
            </>
        )
    }

}
export default Reports;