import * as React from 'react'
import '../css/App.css';
import '../css/Kanban.css';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban';
import axios from 'axios';
import PropTypes from 'prop-types' ;
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";


class Kanban extends React.Component {


    constructor(props) {
        super(props) ;
        this.task=[];
        this.myData2=[];
        this.nyData3=[];
        this.state={
            loading: true,
            test: [[]],
            projectsByEmail: [],
            allTasks: [],
            //data: extend([], MockData, null, true)
        }
    }
    columnTemplate(heading) {
        return (<div className="header-template-wrap">
            <div className={"header-icon e-icons " + heading.keyField}></div>
            <div className="header-text">{heading.headerText}</div>
        </div>);
    }
  componentDidMount() {
    this.firstSearch();

    this.secondSearch();
   }

   firstSearch =()=>{
     axios.get(`${this.props.api}/project/getAllProjectsByUserEmail/${this.props.loggedUser.email}`,{
         headers:{
             authorization: this.props.user.token
         }
     })
           .then((res)=> {
               if (res.data !== undefined){
                   console.log('length: ',res.data.data.length);

                   let array1=[];
                   for(let i=0;i<res.data.data.length;i++) {
                       array1.push(res.data.data[i])
               }
                   this.setState({projectsByEmail: array1})
               }
               console.log('projs',this.state.projectsByEmail);

           })
           .catch((err)=>{
               console.log('error in initialization',err)
           })

   }

    secondSearch =()=>{
          axios(`http://localhost:9001/task/getAllTasks`)
                .then((res)=>{
                    console.log('2nd',res)
                    if (res.data !== undefined )
                    {
                        this.setState({allTasks: res.data.data},()=>this.sortProject())
                    }})
                .catch((err)=>{
                    console.log('error in initialization',err)
                })
    }

sortProject=()=>{
    if(this.state.allTasks.length > 0 && this.state.projectsByEmail.length>0){
      let temp=this.state.allTasks.filter((project)=>{
          let i=this.state.projectsByEmail.find(el=>el._id===project.projectID)
                    if(i!==undefined){
                        if(project.projectID===i._id){
                            let newTask=project
                            newTask['projectName']=i.projectName;
                            return newTask;
                        }
                        else return false;

                    }
                    else return false;
            })
        this.setState({
                test: temp
        })
        console.log(temp);
    }

}

    handler =(event)=>{
        console.log(event.data)
    }



    DialogOpen(args) {
        args.cancel = true;

    }


    render() {
          return (

                    <div>

                        <KanbanComponent cssClass="kanban-header" id="kanban"  keyField="status"
                                                          dataSource={this.state.test} cardSettings={{contentField: "description", headerField: "_id" }}
                                                          swimlaneSettings={{ keyField: "projectName",textField: "projectName"}}
                                                    cardClick={this.handler}
                                                    // drag={(prps)=>console.log(prps)}
                                >
                                    <ColumnsDirective>
                                        <ColumnDirective headerText="Not Started" keyField="not started"  />
                                        <ColumnDirective headerText="In Progress" keyField="inProgress"  template={this.columnTemplate.bind(this)}/>
                                        <ColumnDirective headerText="Complete" keyField="complete"  template={this.columnTemplate.bind(this)}/>
                                    </ColumnsDirective>
                                </KanbanComponent>


                    </div>

        )

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