import React from 'react' ;
import '../css/ViewTask.css';
import '../css/Task.css';
import {Button, Card, CloseButton} from "react-bootstrap";
import Select from "react-select";

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

    switch = ()=>{
        this.setState({
            addOrView: !this.state.addOrView
        })

    }


    render() {
        const taskList = this.props.taskList;
        const nodeId = this.props.nodeId;
        const projId = this.props.projectId;
        console.log("tasklist",taskList)
        let temp =[];
       // includes(projId+'_'+nodeId)

        temp = taskList.filter(list => list.nodeID === projId+'_'+nodeId)




        console.log("fil list",temp)

        return(
            <div id="add-of-task-div">

                        <>
                            <div id="task-container">
                                {

                                    temp.map((value,index)=>{
                                        return (
                                        <div key={index} id="project-form-div" id="nP">
                                            <form id="new-project-form" onSubmit={this.onSubmit}>
                                                <h3 style={{fontWeight:"bold"}}>Task ?</h3>
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

                                            </form>
                                            <Button id="member-button">Members Assigned</Button>
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