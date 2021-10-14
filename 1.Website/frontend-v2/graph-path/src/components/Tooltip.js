import React from 'react';
import {Button, ButtonGroup, Divider, Modal, Panel, Steps} from "rsuite";
import AddEdge from "../img/gif/AddEdge.gif";
import AddMembers from "../img/gif/AddMembers.gif";
import AddSubtask from "../img/gif/AddSubtask.gif";
import AssignTask from "../img/gif/AssignTask.gif";
import CreateProject from "../img/gif/CreateProject.gif";
import CreateTask from "../img/gif/CreateTask.gif";
import SearchKanban from "../img/gif/SearchKanban.gif";
import Stats from "../img/landing/statistics2.gif";
import Toolt from "../img/gif/Tooltip.gif";

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
                <Modal id="modal-div" size={"lg"} backdrop={"backdrop"} keyboard={false} show={this.state.show} onHide={this.handleClose} >
                    <Modal.Header>
                        <Modal.Title>Graph Path Tool Tips</Modal.Title>
                    </Modal.Header>
                    <Modal.Body id="modal-div">
                        <div>
                            <Steps current={this.state.step} >
                                <Steps.Item  />
                                <Steps.Item  />
                                <Steps.Item  />
                                <Steps.Item  />
                                <Steps.Item  />
                                <Steps.Item  />
                                <Steps.Item  />
                                <Steps.Item />
                                <Steps.Item />
                            </Steps>
                            <Divider />
                            {/*header={`Step: ${this.state.step + 1}`}*/}
                            <Panel id="panel-img"  >
                                {
                                    this.state.step === 0 ?
                                        <>
                                            <h4>Create Project</h4><br/>
                                            <img src={CreateProject} />
                                            <p>To create a new project, simply click on the button "New Project" on the Dashboard</p>
                                        </>

                                        :this.state.step === 1?
                                            <>
                                                <h4>Add Task</h4><br/>
                                                <img src={CreateTask} />
                                                <p>To add a task on the project, simply click on the button "Add Task" and provide all the necessary details.<br/><br/>
                                                    To remove or delete a Task, press and hold "Alt" button, while holding, click on the Task you want to remove.</p>
                                            </>
                                            :this.state.step === 2?
                                                <>
                                                    <h4>Link Tasks</h4><br/>
                                                    <img src={AddEdge} />
                                                    <p>To link tasks together, simply press and hold "Ctrl" (For Windows) and "Shift" (For MAcOS) button on your PC, while holding the button, click the first task followed by the second task.<br/><br/>
                                                    To remove or delete the line, press and hold "Alt" button, while holding, click on the line you want to remove.</p>
                                                </>
                                                :this.state.step === 3?
                                                    <>
                                                        <h4>Add Sub-Tasks on Tasks</h4><br/>
                                                        <img src={AddSubtask} />
                                                        <p>To add a subtask, click on a task you want to add a subtask for, click "Add Subtask" and provide necessary details.<br/><br/>
                                                        To delete a subtask, click on the task where the subtask is located, expand the subtask details and click the trash bin.</p>
                                                    </>
                                                    :this.state.step === 4?
                                                        <>
                                                            <h4>Add Members to a Project</h4><br/>
                                                            <img src={AddMembers} />
                                                            <p>To Add Members to your project, click "Edit" button on the graph view and  click the "Add Members" button.</p>
                                                        </>
                                                        :this.state.step === 5?
                                                            <>
                                                                <h4>Assign Project Members to a Subtask</h4><br/>
                                                                <img src={AssignTask} />
                                                                <p>To assign project members to a subtask, click on the Task the subtask is located, expand the subtask details, click on the "Assign Task To Project Member" and select the members.</p>
                                                            </>
                                                            :this.state.step === 6?
                                                                <>
                                                                    <h4>Using The Kanban</h4><br/>
                                                                    <img src={SearchKanban} />
                                                                    <p>You can change the Subtask status by dragging the subtask to a new status and also search at the bottom of the Kanban for a Project, Task or Subtask.</p>
                                                                </>
                                                            :this.state.step === 7?
                                                                <>
                                                                    <h4>Checking Project Statistics</h4><br/>
                                                                    <img src={Stats} />
                                                                    <p>To check any of our statistics, simply select a project you want to view the statistics for on the "Select Project" dropdown.</p>
                                                                </>
                                                                :this.state.step === 8?
                                                                    <>
                                                                        <h4>To access the tooltip</h4><br/>
                                                                        <img src={Toolt} />
                                                                        <p>To access the tooltip, click on "Profile" button on navigation bar and navigate to "Tool tips" button and the click on the button.</p>
                                                                    </>
                                                                    :""


                                }
                            </Panel>
                            <ButtonGroup id="tooltip-btn">
                                <Button onClick={this.onPrevious} disabled={this.state.step === 0} >Previous</Button>
                                <Button onClick={this.onNext} disabled={this.state.step === 8} >Next</Button>
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