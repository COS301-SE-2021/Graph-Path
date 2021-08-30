import * as React from 'react'
import '../css/App.css';
import '../css/Kanban.css';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban';
import axios from 'axios';


class Kanban extends React.Component {


    constructor(props) {
        super(...arguments);
       //this.data = extend([], MockData, null, true);
       // super(props);
       //  this.data=new DataManager({
       //      url:'http://localhost:9001/project/convertToKanbanBoard/611bb44d8aaa82090e1a9372/',
       //      adaptor: new ODataAdaptor
       //  })
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
  componentDidMount() {
    this.firstSearch();

    this.secondSearch();
   }

   firstSearch =()=>{
     axios(`http://localhost:9001/project/getAllProjectsByUserEmail/lbmuhali@gmail.com/`)
           //.then(res=>res.json())
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
    //   console.log(this.state.task2);
    // return this.state.task2;
   }

    secondSearch =()=>{
          axios(`http://localhost:9001/task/getAllTasks`)
                .then((res)=>{
                    if (res.data !== undefined )
                    {

                        this.setState({task3: res.data.data},()=>this.sortProject())

                }})
                .catch((err)=>{
                    console.log('error in initialization',err)
                })




    }

sortProject=()=>{
    let projects=[]
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




    DialogOpen(args) {
        args.cancel = true;

    }


    render() {
          return (

                    <div>
                        {/*{this.state.test.length>0 ?*/}
                        {/*   // this.state.test.map((filteredArr)=> {*/}
                        {/*        return(*/}
                        <KanbanComponent id="kanban"  keyField="status"
                                                          dataSource={this.state.test} cardSettings={{contentField: "description", headerField: "_id"}}
                                                          swimlaneSettings={{ keyField: "projectName",textField: "projectName"}}

                                >
                                    <ColumnsDirective>
                                        <ColumnDirective headerText="Not Started" keyField="not started"/>
                                        <ColumnDirective headerText="In Progress" keyField="inProgress"/>
                                        <ColumnDirective headerText="Complete" keyField="complete"/>
                                    </ColumnsDirective>
                                </KanbanComponent>
                        {/*)*/}
                        {/*    })*/}
                        {/*: 'No Task'*/}
                        {/*}*/}


                    </div>

        )

    }
}
export default Kanban;


/*

swimlaneSettings={{ keyField: ""}}

<KanbanComponent id="root"  keyField="Status" dataSource={this.data} cardSettings={{contentField: "Description", headerField: "Id"}} swimlaneSettings={{ keyField: "Project"}} dialogOpen={this.DialogOpen.bind(this)}>
                            <ColumnsDirective>
                                <ColumnDirective headerText="Not Started" keyField="notStartedTasks"/>
                                <ColumnDirective headerText="In Progress" keyField="inProgressTasks"/>
                                <ColumnDirective headerText="Complete" keyField="completeTasks"/>
                            </ColumnsDirective>
                        </KanbanComponent>

    <KanbanComponent id="kanban"  keyField="DueDate"
                                            dataSource={this.state.task3} cardSettings={{contentField: "description", headerField: "TaskUniqueID"}}

                        >
                            <ColumnsDirective>
                                <ColumnDirective headerText="Not Started" keyField="2021-08-28"/>
                                <ColumnDirective headerText="In Progress" keyField="2021-08-15"/>
                                <ColumnDirective headerText="Complete" keyField="completeTasks"/>
                            </ColumnsDirective>
                        </KanbanComponent>

                        console.log([this.state.task3])
* */

