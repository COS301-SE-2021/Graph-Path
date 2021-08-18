import * as React from 'react'
import '../css/App.css';
import '../css/Kanban.css';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban';
import {MockData} from './MockData';
import {extend} from '@syncfusion/ej2-base';


class Kanban extends React.Component {


    constructor(props) {
        super(...arguments);
        this.data = extend([], MockData, null, true);
       // super(props);
        this.myData1=[];
        this.myData2=[];
        this.nyData3=[];
        this.state={
            loading: true,
            task1: null,
            task2: null,
            task3: []
        }
    }
  /* componentDidMount() {
    this.firstSearch();

    this.secondSearch();
   }

   firstSearch =()=>{
       fetch(`http://localhost:9001/project/getAllProjectsByUserEmail/${this.props.userEmail}`)
           .then(res=>res.json())
           .then((res)=> {
               if (res.data !== undefined)
                   this.myData1 = res.data;
               console.log(res);
               this.setState({task1: res.data})
           })
           .catch((err)=>{
               console.log('error in initialization',err)
           })
   }

    secondSearch =()=>{
        fetch(`http://localhost:9001/project/convertToKanbanBoard/611bb44d8aaa82090e1a9372`)
            .then(res=>res.json())
            .then((res)=>{
                if (res.data !== undefined )
                    this.myData2 =  res.data ;
                console.log(res);
                this.setState({task2: res.data})
                console.log(this.state.task2);
            })
            .catch((err)=>{
                console.log('error in initialization',err)
            })

        this.myData3= [this.state.task2.notStartedTasks, this.state.task2.inProgressTasks,this.state.task3.completeTasks];
        console.log(this.myData3);
    }
*/



/*
    data1=new DataManager({
        link: "http://localhost:9001/project/getAllProjectsByUserEmail/mndebelelt@gmail.com",
        adaptor: new ODataAdaptor
    })
    //console.log(this.data1)

    data2=new DataManager({
        link: "http://localhost:9001/project/convertToKanbanBoard/611bb44d8aaa82090e1a9372",
        adaptor: new ODataAdaptor
    })
    //console.log(this.data2)

*/
    DialogOpen(args) {
        args.cancel = true;

    }


    render() {
        return (

                    <div>
                        <KanbanComponent id="root"  keyField="Status" dataSource={this.data} cardSettings={{contentField: "Description", headerField: "Id"}} swimlaneSettings={{ keyField: "Project"}} dialogOpen={this.DialogOpen.bind(this)}>
                            <ColumnsDirective>
                                <ColumnDirective headerText="Not Started" keyField="notStartedTasks"/>
                                <ColumnDirective headerText="In Progress" keyField="inProgressTasks"/>
                                <ColumnDirective headerText="Complete" keyField="completeTasks"/>
                            </ColumnsDirective>
                        </KanbanComponent>
                    </div>

        )
    }
}
export default Kanban;

