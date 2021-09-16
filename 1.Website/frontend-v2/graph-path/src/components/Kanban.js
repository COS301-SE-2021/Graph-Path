import * as React from 'react'
import '../css/App.css';
import '../css/Kanban.css';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban';
import axios from 'axios';
import PropTypes from 'prop-types' ;
import {connect} from "react-redux";
import {Loader} from 'rsuite' ;
import { Query } from '@syncfusion/ej2-data';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

class Kanban extends React.Component {

    //
    constructor(props) {
        super(props);
        this.task = [];
        this.myData2 = [];
        this.nyData3 = [];
        this.state = {
            loading: false,
            test: [[]],
            projectsByEmail: [],
            projectsByEmail2: [],
            allTasks: [],

        };
        this.fields = [{text: 'Unique ID', key: '_id'},
            {key: 'status', type: 'DropDown'},
            {key: 'description', type: 'TextArea'}]
    }

    columnTemplate(heading) {
        return (<div className="header-template-wrap">
            <div className={"header-icon e-icons " + heading.keyField}></div>
            <div className="header-text">{heading.headerText}</div>
        </div>);
    }

    componentDidMount() {
        this.firstSearch();

        // this.secondSearch();
    }

    //http://localhost:9001/project/convertToKanbanBoard/mndebelelt@gmail.com
    //`${this.props.api}/project/getAllProjectsByUserEmail/${this.props.loggedUser.email}`
    firstSearch = () => {
        this.setState({
            loading:true
        }) ;
        axios.get(`${this.props.api}/project/convertToKanbanBoard/${this.props.loggedUser.email}`, {
            headers: {
                authorization: this.props.user.token
            }
        })
            .then((res) => {
                if (res.data !== undefined) {
                    let tasks = []
                    let count = 1;
                    console.log('length 79', res.data.data.length);
                    for (let i = 0; i < res.data.data.length; i++) {
                        console.log('project 81', res.data.data[i]);
                        let project = res.data.data[i];

                        for (let j = 0; j < project.tasks.length; j++) {
                            let task = project.tasks[j];
                            task.projectName = project.projectName;
                            task.Priority = task.status;
                            task.newID = count++;
                            console.log('task 84', task);
                            tasks.push(task);

                        }

                    }

                    console.log('Tasks', tasks);
                    //Attempt to change array into objects
                    // Object.assign(obj1, array1);
                    this.setState({projectsByEmail: tasks,  loading:false})
                    //this.setState({projectsByEmail2: obj1})
                }else {
                    this.setState({
                        loading:false
                    }) ;
                }

            })
            .catch((err) => {
                console.log('error in initialization', err)
            })

    }

    // secondSearch =()=>{
    //       axios(`http://localhost:9001/task/getAllTasks`)
    //             .then((res)=>{
    //                 console.log('2nd',res)
    //                 if (res.data !== undefined )
    //                 {
    //                     this.setState({allTasks: res.data.data},()=>this.sortProject())
    //                 }})
    //             .catch((err)=>{
    //                 console.log('error in initialization',err)
    //             })
    // }

// sortProject=()=>{
//     if(this.state.allTasks.length > 0 && this.state.projectsByEmail.length>0){
//       let temp=this.state.allTasks.filter((project)=>{
//           let i=this.state.projectsByEmail.find(el=>el._id===project.projectID)
//                     if(i!==undefined){
//                         if(project.projectID===i._id){
//                             let newTask=project
//                             newTask['projectName']=i.projectName;
//                             return newTask;
//                         }
//                         else return false;
//
//                     }
//                     else return false;
//             })
//         this.setState({
//                 test: temp
//         })
//         console.log(temp);
//     }
//
// }

    onDropHandler = (event) => {
        console.log(event.data)
    }


    cardTemplate(props) {
        return (<div className="card-template">
            <div className="card-template-wrap">
                <table className="card-template-wrap">
                    <colgroup>
                        <col style={{width: "55px"}}/>
                        <col/>
                    </colgroup>
                    <tbody>
                    <tr>

                        <td className="e-title">
                            <div className="e-card-stacked">
                                <div className="e-card-header">
                                    <div className="e-card-header-caption">
                                        <div style={{color: "#1386d9"}}
                                             className="e-card-header-title e-tooltip-text">{props.title}</div>
                                    </div>
                                </div>
                                <div className="e-card-content" style={{lineHeight: "2.75em"}}>
                                    <table className="card-template-wrap" style={{tableLayout: "auto"}}>
                                        <tbody>
                                        <tr>
                                            {(props.status === 'not started' || props.status === 'in progress' || props.status === 'complete') &&
                                            <td colSpan={2}>
                                                {props.status !== '' &&
                                                <div className="e-description e-tooltip-text">{props.description}</div>}

                                            </td>}
                                            {(props.status === 'complete') && <td className="card-content">

                                            </td>}
                                        </tr>
                                        <tr>

                                            {props.status !== '' && <td className="card-content">
                                                {props.status === 'not started' &&
                                                <div className="e-preparingText e-tooltip-text">Not Started</div>}
                                                {props.status === 'in progress' &&
                                                <div className="e-readyText e-tooltip-text">In Progress</div>}
                                                {(props.status === 'complete') &&
                                                <div className="e-deliveredText e-tooltip-text">Complete</div>}


                                            </td>}
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>);
    }
    //Event after moving the card...
   onDragStop = (event) =>{
        console.log('afterDrag data: ', event.data);
    this.updateChanges(event.data[0]);
    }

    //Post clicking the save button
    onDataBound = (event) => {
        console.log('afterSave data:', event)
    }

    updateChanges = (newData) =>{
        newData.taskID = newData._id ;
        console.log('updated ',newData) ;

        axios.patch(`${this.props.api}/task/updateEverythingTask`,newData,{
            headers:{
                authorization:this.props.loggedUser.token
            }
        })
       .then((response)=>{
           console.log(response);
       })
       .catch((error)=>{
           if(error.response)
           {
               console.log(error.response);
           }

       })
    }

    searchClick(userInput){
        let searchValue=userInput.value;
        let searchQuery=new Query();
        if(searchValue !== ''){
            searchQuery=new Query().search(searchValue,['_id', 'description', 'title'], 'contains', true);
        }
        this.kanbanObj.query=searchQuery;
    }

    reset(){
        this.kanbanObj.query=new Query();
    }

    resetClick(){
        document.getElementById('search_text').value='';
        this.reset();
    }

    onFocus(element){
        if (element.target.value === ''){
            this.reset();
        }
    }

    render() {
        //console.log('break test 126',this.state.projectsByEmail2)

        if (this.state.loading){
            return <Loader backdrop={false} speed={'slow'} size={'lg'} />
        }
        else{
            return (
                <div className='schedule-control-section'>
                    <div className='col-lg-12 control-section'>
                        <div className='control-wrapper'>
                            <KanbanComponent cssClass="kanban-card-template" id="kanban" keyField="status"
                                             enableTooltip={true}
                                             dataSource={this.state.projectsByEmail} cardSettings={{
                                contentField: "description",
                                headerField: "_id",
                                template: this.cardTemplate.bind(this)
                            }}
                                             swimlaneSettings={{keyField: "projectName", textField: "projectName"}}
                                             cardClick={this.handler} style={{background: "black"}}
                                             dragStop={this.onDragStop.bind(this)}  dataBound={this.onDataBound.bind(this)}
                                             ref={(kanban) => { this.kanbanObj = kanban; }}
                            >
                                <ColumnsDirective>
                                    <ColumnDirective headerText="Not Started" keyField="not started"
                                                     template={this.columnTemplate.bind(this)}/>
                                    <ColumnDirective headerText="In Progress" keyField="in progress"
                                                     template={this.columnTemplate.bind(this)}/>
                                    <ColumnDirective headerText="Complete" keyField="complete"
                                                     template={this.columnTemplate.bind(this)}/>
                                </ColumnsDirective>
                            </KanbanComponent>
                        </div>


                    </div>

                    <div className="col-lg-3 property-section">
                        <div className="property-panel-section">
                            <p className="property-panel-header">Searching</p>
                            <div className="property-panel-content">
                                <table className="e-filter-table">
                                    <tr>
                                        <td>
                                            <div>
                                                <TextBoxComponent id="search_text" ref={(kanban) => { this.textBoxObj = kanban; }} showClearButton={true} placeholder="Enter search text" onFocus={this.onFocus.bind(this)} input={this.searchClick.bind(this)} style={{color: "white"}}/>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                                <div className='e-reset-button'>
                                    <ButtonComponent id='reset_filter' className="e-btn" onClick={this.resetClick.bind(this)}>Reset</ButtonComponent>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            )
        }


    }

}



Kanban.defaultProps = {
    api:'http://localhost:9001'
}

Kanban.propTypes = {
    user: PropTypes.object, 
    api: PropTypes.string
}


function updateUserToken(token){
    return {
        type:'UPDATE_TOKEN' ,
        payload: {
            token:token
        }
    }
}

function mapStateToProps(state){
    return {
        loggedUser:state.loggedUser
    } ;
}


const mapDispatchToProps = {
    updateUserToken,
}

export default connect(mapStateToProps,mapDispatchToProps)(Kanban) ;