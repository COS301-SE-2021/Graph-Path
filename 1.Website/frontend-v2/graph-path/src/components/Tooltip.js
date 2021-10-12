import React from 'react';
import {Button, ButtonGroup, Divider, Modal, Panel, Steps} from "rsuite";
import AddEdge from "../img/gif/AddEdge.gif";
import AddMembers from "../img/gif/AddMembers.gif";
import AddSubtask from "../img/gif/AddSubtask.gif";
import AssignTask from "../img/gif/AssignTask.gif";
import CreateProject from "../img/gif/CreateProject.gif";
import CreateTask from "../img/gif/CreateTask.gif";
import SearchKanban from "../img/gif/SearchKanban.gif";

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
                                <Steps.Item  />
                                <Steps.Item  />
                                <Steps.Item  />
                                <Steps.Item  />
                                <Steps.Item  />
                                <Steps.Item  />
                                <Steps.Item  />
                            </Steps>
                            <Divider />
                            {/*header={`Step: ${this.state.step + 1}`}*/}
                            <Panel  >
                                {
                                    this.state.step === 0 ?
                                        <>
                                            {/*<h6>Create Project</h6>*/}
                                            <img src={CreateProject} />
                                        </>

                                        :this.state.step === 1?
                                            <>
                                                {/*<h6>Create Project</h6>*/}
                                                <img src={CreateTask} />
                                            </>
                                            :this.state.step === 2?
                                                <>
                                                    {/*<h6>Create Project</h6>*/}
                                                    <img src={AddEdge} />
                                                </>
                                                :this.state.step === 3?
                                                    <>
                                                        {/*<h6>Create Project</h6>*/}
                                                        <img src={AddSubtask} />
                                                    </>
                                                    :this.state.step === 4?
                                                        <>
                                                            {/*<h6>Create Project</h6>*/}
                                                            <img src={AddMembers} />
                                                        </>
                                                        :this.state.step === 5?
                                                            <>
                                                                {/*<h6>Create Project</h6>*/}
                                                                <img src={AssignTask} />
                                                            </>
                                                            :this.state.step === 6?
                                                                <>
                                                                    {/*<h6>Create Project</h6>*/}
                                                                    <img src={SearchKanban} />
                                                                </>
                                                            :""


                                }
                            </Panel>
                            <ButtonGroup>
                                <Button onClick={this.onPrevious} disabled={this.state.step === 0} >Previous</Button>
                                <Button onClick={this.onNext} disabled={this.state.step === 6} >Next</Button>
                                <Button onClick={this.handleClose}>Close</Button>
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