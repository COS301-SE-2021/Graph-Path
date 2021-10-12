import React from 'react';
import {Button, ButtonGroup, Divider, Modal, Panel, Steps} from "rsuite";

class Tooltip extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            show:true,
            step:0
        }
    }
    handleOpen = () =>{
        this.setState({
            show:true
        })
    }
    handleClose=()=>{
        this.setState({
            show:false,
            step:0
        })
    }

    onNext =()=>{
        this.setState({
            step:this.state.step + 1
        })
    }

    onPrevious =()=>{
        this.setState({
            step:this.state.step - 1
        })
    }
    render() {
        return(
            <>
                <Modal size={"lg"} backdrop={"backdrop"} keyboard={false} show={this.state.show} onHide={this.handleClose} >
                    <Modal.Header>
                        <Modal.Title>Graph Path Tool Tips</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <Steps current={this.state.step} >
                                <Steps.Item title="Start" />
                                <Steps.Item title="Progress" />
                                <Steps.Item title="Finish" />
                                <Steps.Item title="Start" />
                                <Steps.Item title="Progress" />
                                <Steps.Item title="Finish" />
                                <Steps.Item title="Start" />
                                <Steps.Item title="Progress" />
                                <Steps.Item title="Finish" />
                            </Steps>
                            <Divider />
                            <Panel header={`Step: ${this.state.step + 1}`} >
                                {
                                    this.state.step === 0 ?
                                        <p>Create Project</p>
                                        :this.state.step === 1?
                                            <p>Add and Delete Nodes</p>
                                            :this.state.step === 2?
                                                <p>Add and Delete Edges</p>
                                                :this.state.step === 3?
                                                    <p>Critical Path</p>
                                                    :""


                                }
                            </Panel>
                            <ButtonGroup>
                                <Button onClick={this.onPrevious} disabled={this.state.step === 0} >Previous</Button>
                                <Button onClick={this.onNext} disabled={this.state.step === 3} >Next</Button>
                            </ButtonGroup>
                        </div>
                    </Modal.Body>
                    {/*<Modal.Footer>*/}
                    {/*    <Button onClick={this.handleClose}>Close</Button>*/}
                    {/*</Modal.Footer>*/}
                </Modal>
            </>
        )
    }
}
export default Tooltip