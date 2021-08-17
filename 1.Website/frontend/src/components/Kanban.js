// import * as React from 'react'
// import '../css/App.css';
// import '../css/Kanban.css';
// import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
// import {MockData} from './MockData';
// import { extend } from '@syncfusion/ej2-base';
// class Kanban extends React.Component {
//
//     MockData: Object[] = [
//         {
//             Status: 'ToDo',
//             Description: 'Fix Bugs',
//             Assignee: 'Naane'
//         },
//         {
//             Status: 'ToDo',
//             Description: 'Work on Graph ',
//             Assignee: 'Naane'
//         },
//         {
//             Status: 'Done',
//             Description: 'Something',
//             Assignee: 'Baster'
//         },
//         {
//             Status: 'InProgress',
//             Description: 'Fix the UI issues',
//             Assignee: 'Mvhali'
//         },
//         {
//             Status: 'Review',
//             Description: 'Fix the issues reported by the customer.',
//             Assignee: 'Monareng'
//         },
//         {
//             Status: 'Done',
//             Description: 'Make the Kanban board and Link to database.',
//             Assignee: 'Mndebele'
//         },
//         {
//             Status: 'Validate',
//             Description: 'Work on bugs',
//             Assignee: 'Baster'
//         }
//     ];
//
//     constructor() {
//         super(...arguments);
//         this.data = extend([], MockData, null, true);
//     }
//     render() {
//         return (
//             <KanbanComponent id="root" keyField="Status" dataSource={this.data} cardSettings={{ contentField: "Description", headerField: "Id" }} swimlaneSettings={{ keyField: "Assignee" }}>
//                 <ColumnsDirective>
//                     <ColumnDirective headerText="To Do" keyField="ToDo"/>
//                     <ColumnDirective headerText="In Progress" keyField="InProgress"/>
//                     <ColumnDirective headerText="Review" keyField="Review"/>
//                     <ColumnDirective headerText="Done" keyField="Done"/>
//                 </ColumnsDirective>
//             </KanbanComponent>
//         )
//     }
// }
// export default Kanban;