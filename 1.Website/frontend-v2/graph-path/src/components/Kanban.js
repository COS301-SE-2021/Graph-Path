import * as React from 'react'
import '../css/App.css';
import '../css/Kanban.css';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban';
import axios from 'axios';
import PropTypes from 'prop-types' ;


class Kanban extends React.Component {


    constructor(props) {
        super(props) ;
        this.task=[];
        this.myData2=[];
        this.nyData3=[];
        this.state={
            loading: true,
            test: [[]],
            task2: [],
            task3: [],
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
     axios.get(`${this.props.api}/project/getAllProjectsByUserEmail/ntpnaane@gmail.com`,{
         headers:{
             authorization: this.props.user.token
         }
     })

           .then((res)=> {
               if (res.data !== undefined){
                   //this.myData1 = res.data;
                //   console.log(res.data.data[0]._id);
                   console.log('length: ',res.data.data.length);
                   let array1=[];
                   for(let i=0;i<res.data.data.length;i++) {
                       array1.push(res.data.data[i])

               }
                   this.setState({task2: array1})
               }
               console.log(this.state.task2);
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

                        this.setState({task3: res.data.data},()=>this.sortProject())

                }})
                .catch((err)=>{
                    console.log('error in initialization',err)
                })

    }

sortProject=()=>{

    if(this.state.task3.length > 0 && this.state.task2.length>0){
      let temp=this.state.task3.filter((project)=>{
          let i=this.state.task2.find(el=>el._id===project.project)
          console.log(i);
                    if(i!==undefined){
                        if(project.project===i._id){
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
                                                          dataSource={this.state.test} cardSettings={{contentField: "description", headerField: "_id"}}
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

export default Kanban;
