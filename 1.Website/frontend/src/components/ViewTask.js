import React from 'react' ;
import '../css/ViewTask.css';
import '../css/Task.css';
import {Button, Offcanvas} from "react-bootstrap";
// import Select from "react-select";
import * as HiIcons from "react-icons/hi";
import * as FaIcons from "react-icons/fa";

class ViewTask extends React.Component{
    constructor(props) {
        super(props);
        this.members= [];
        this.state = {
            name: '',
            taskMembers:[],
            filteredList:[],
            startDate:new Date().toJSON().slice(0,10),
            dueDate: new Date().toJSON().slice(0,10),
            priority: null,
            status: "not started",
            about: null,
            api:'http://localhost:9001',
            addOrView:false
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

    switch = ()=>{
        this.setState({
            addOrView: !this.state.addOrView
        })

    }


    render() {
        const taskList = this.props.taskList;
        const nodeId = this.props.nodeId;
        const projId = this.props.projectId;
        // console.log("tasklist",taskList)
        let temp =[];
       // includes(projId+'_'+nodeId)

        temp = taskList.filter(list => list.nodeID === projId+'_'+nodeId)




        // console.log("fil list",temp)

        return(
            <div id="add-of-task-div">

                        <>

                            <Offcanvas show={this.state.show} onHide={this.handleClose}>
                                <Offcanvas.Header id="canvasHeader" closeButton>
                                    <Offcanvas.Title>Project Members</Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body id="canvasBody">
                                    {
                                        (temp.assignee !== undefined && temp.assignee !== null) ?
                                        temp.assignee.map((value,index)=>{
                                        return (
                                            <div key={index} id="memberDiv">
                                                { value.email !== temp.owner ?
                                                    <>
                                                        <p>Full names: {value.label}<br/>Email: {value.email}
                                                        </p>
                                                        <HiIcons.HiUserRemove id="userRemove" onClick={()=>this.removeMember(value.email)} />
                                                        <FaIcons.FaUserEdit id="userEdit" />
                                                    </> : <>
                                                        Owner: {value.email}
                                                    </>
                                                }

                                            </div>

                                        )

                                    })

                                    : <></>}

                                    <>
                                        <HiIcons.HiUserAdd id="userAdd" />
                                    </>


                                </Offcanvas.Body>
                            </Offcanvas>

                            <div id="task-container">
                                {

                                    temp.map((value,index)=>{
                                        return (
                                        <div key={index} className="project-form-div" id="nP">
                                            <form id="new-project-form" onSubmit={this.onSubmit}>
                                                <h3 style={{fontWeight:"bold"}}>Task {index+1}</h3>
                                                <label>Description</label>
                                                <input
                                                    type='text'
                                                    name = "projName"
                                                    defaultValue={temp[index].description}
                                                    placeholder="Description"
                                                    onChange={this.change}
                                                    required
                                                />

                                                <label>Start Date</label>
                                                <input
                                                    type='date'
                                                    name = "startD"
                                                    defaultValue={temp[index].issued}
                                                    onChange={this.change}
                                                    required
                                                />

                                                <label>Due Date</label>
                                                <input
                                                    type='date'
                                                    name = "dueD"
                                                    defaultValue={temp[index].due}
                                                    onChange={this.change}
                                                    required />


                                                <input type="submit" id="editBtn" value="Update"
                                                />
                                                <Button id="member-button" onClick={this.handleShow}>Members Assigned</Button>
                                            </form>

                                        </div>
                                        )
                                    })
                                }
                                {/*<div id="project-form-div" id="nP">*/}
                                {/*    <form id="new-project-form" onSubmit={this.onSubmit}>*/}
                                {/*        <h3 style={{fontWeight:"bold"}}>Task ?</h3>*/}
                                {/*        <label>Description</label>*/}
                                {/*        <input*/}
                                {/*            type='text'*/}
                                {/*            name = "projName"*/}
                                {/*            placeholder="Description"*/}
                                {/*            onChange={this.change}*/}
                                {/*            required*/}
                                {/*        />*/}

                                {/*        <label>Start Date</label>*/}
                                {/*        <input*/}
                                {/*            type='date'*/}
                                {/*            name = "startD"*/}
                                {/*            onChange={this.change}*/}
                                {/*            required*/}
                                {/*        />*/}

                                {/*        <label>Due Date</label>*/}
                                {/*        <input*/}
                                {/*            type='date'*/}
                                {/*            name = "dueD"*/}
                                {/*            onChange={this.change}*/}
                                {/*            required />*/}


                                {/*        <input type="submit" id="editBtn" value="Update"*/}
                                {/*        />*/}

                                {/*    </form>*/}
                                {/*    <Button id="member-button">Members Assigned</Button>*/}
                                {/*</div>*/}
                                {/*<div id="project-form-div" id="nP">*/}
                                {/*    <form id="project-form" onSubmit={this.onSubmit}>*/}
                                {/*        <h3 style={{fontWeight:"bold"}}>Task ?</h3>*/}
                                {/*        <label>Description</label>*/}
                                {/*        <input*/}
                                {/*            type='text'*/}
                                {/*            name = "projName"*/}
                                {/*            placeholder="Description"*/}
                                {/*            onChange={this.change}*/}
                                {/*            required*/}
                                {/*        />*/}

                                {/*        <label>Start Date</label>*/}
                                {/*        <input*/}
                                {/*            type='date'*/}
                                {/*            name = "startD"*/}
                                {/*            onChange={this.change}*/}
                                {/*            required*/}
                                {/*        />*/}

                                {/*        <label>Due Date</label>*/}
                                {/*        <input*/}
                                {/*            type='date'*/}
                                {/*            name = "dueD"*/}
                                {/*            onChange={this.change}*/}
                                {/*            required />*/}


                                {/*        <input type="submit" id="editBtn" value="Update"*/}
                                {/*        />*/}

                                {/*    </form>*/}
                                {/*    <Button id="member-button">Members Assigned</Button>*/}
                                {/*</div>*/}
                                {/*<div id="project-form-div" id="nP">*/}
                                {/*    <form id="project-form" onSubmit={this.onSubmit}>*/}
                                {/*        <h3 style={{fontWeight:"bold"}}>Task ?</h3>*/}
                                {/*        <label>Description</label>*/}
                                {/*        <input*/}
                                {/*            type='text'*/}
                                {/*            name = "projName"*/}
                                {/*            placeholder="Description"*/}
                                {/*            onChange={this.change}*/}
                                {/*            required*/}
                                {/*        />*/}

                                {/*        <label>Start Date</label>*/}
                                {/*        <input*/}
                                {/*            type='date'*/}
                                {/*            name = "startD"*/}
                                {/*            onChange={this.change}*/}
                                {/*            required*/}
                                {/*        />*/}

                                {/*        <label>Due Date</label>*/}
                                {/*        <input*/}
                                {/*            type='date'*/}
                                {/*            name = "dueD"*/}
                                {/*            onChange={this.change}*/}
                                {/*            required />*/}


                                {/*        <input type="submit" id="editBtn" value="Update"*/}
                                {/*        />*/}

                                {/*    </form>*/}
                                {/*    <Button id="member-button">Members Assigned</Button>*/}
                                {/*</div>*/}
                                {/*<div id="project-form-div" id="nP">*/}
                                {/*    <form id="project-form" onSubmit={this.onSubmit}>*/}
                                {/*        <h3 style={{fontWeight:"bold"}}>Task ?</h3>*/}
                                {/*        <label>Description</label>*/}
                                {/*        <input*/}
                                {/*            type='text'*/}
                                {/*            name = "projName"*/}
                                {/*            placeholder="Description"*/}
                                {/*            onChange={this.change}*/}
                                {/*            required*/}
                                {/*        />*/}

                                {/*        <label>Start Date</label>*/}
                                {/*        <input*/}
                                {/*            type='date'*/}
                                {/*            name = "startD"*/}
                                {/*            onChange={this.change}*/}
                                {/*            required*/}
                                {/*        />*/}

                                {/*        <label>Due Date</label>*/}
                                {/*        <input*/}
                                {/*            type='date'*/}
                                {/*            name = "dueD"*/}
                                {/*            onChange={this.change}*/}
                                {/*            required />*/}


                                {/*        <input type="submit" id="editBtn" value="Update"*/}
                                {/*        />*/}

                                {/*    </form>*/}
                                {/*    <Button id="member-button">Members Assigned</Button>*/}
                                {/*</div>*/}
                            </div>
                        </>

            </div>
        )
    }
}
export default ViewTask;