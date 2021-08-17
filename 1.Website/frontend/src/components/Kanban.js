import * as React from 'react'
import '../css/App.css';
import '../css/Kanban.css';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban';
import {MockData} from './MockData';
import {extend} from '@syncfusion/ej2-base';
class Kanban extends React.Component {

    constructor() {
        super(...arguments);
        this.data = extend([], MockData, null, true);
    }
    render() {
        return (<KanbanComponent id="root" keyField="Status" dataSource={this.data} cardSettings={{contentField: "Description", headerField: "Id"}} swimlaneSettings={{ keyField: "Assignee"}}>
                <ColumnsDirective>
                    <ColumnDirective headerText="Not Started" keyField="notStartedTasks"/>
                    <ColumnDirective headerText="In Progress" keyField="inProgressTasks"/>
                    <ColumnDirective headerText="Complete" keyField="completeTasks"/>
                </ColumnsDirective>
            </KanbanComponent>
        )
    }
}
export default Kanban;

