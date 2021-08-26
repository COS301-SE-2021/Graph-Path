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
        this.myData1=[];
        this.myData2=[];
        this.nyData3=[];
        this.state={
            loading: true,
            test: '',
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
     axios(`http://localhost:9001/project/getAllProjectsByUserEmail/mndebelelt@gmail.com/`)
           //.then(res=>res.json())
           .then((res)=> {
               if (res.data !== undefined)
                   this.myData1 = res.data;
               console.log(res.data.data);
               this.setState({task2: res.data.data})

           })
           .catch((err)=>{
               console.log('error in initialization',err)
           })



   }

    secondSearch =()=>{
      axios(`http://localhost:9001/project/convertToKanbanBoard/611bb44d8aaa82090e1a9372`)
            .then((res)=>{
                if (res.data !== undefined )
                this.setState({task3: res.data.data.notStartedTasks})
              console.log(res.data.data.notStartedTasks);
            })
            .catch((err)=>{
                console.log('error in initialization',err)
            })


    }





    DialogOpen(args) {
        args.cancel = true;

    }


    render() {
          return (

                    <div>


                        <KanbanComponent id="kanban"  keyField="status"
                                         dataSource={this.state.task3} cardSettings={{contentField: "description", headerField: "TaskUniqiueID"}}
                                         swimlaneSettings={{ keyField: "projectName",textField: "projectName"}}

                                                 >
                            <ColumnsDirective>
                                <ColumnDirective headerText="Not Started" keyField="not started"/>
                                <ColumnDirective headerText="In Progress" keyField="inProgress"/>
                                <ColumnDirective headerText="Complete" keyField="complete"/>
                            </ColumnsDirective>
                        </KanbanComponent>
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

