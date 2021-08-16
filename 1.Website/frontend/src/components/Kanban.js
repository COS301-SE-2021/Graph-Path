import React from 'react'
import '../css/Kanban.css'
import {KanbanComponent, ColumnsDirective, ColumnDirective} from '@syncfusion/ej2-react-kanban';

class Kanban extends React.Component{
   render(){
        return(
            <KanbanComponent id="kanban" keyField="Status">
                <ColumnsDirective>
                    <ColumnDirective headerText="To Do" />
                    <ColumnDirective headerText="In Progress" keyFiled="InProgressOpen"/>
                    <ColumnDirective headerText="Review" keyFiled="/Review"/>
                    <ColumnDirective headerText="Done" keyFiled="Close"/>
                </ColumnsDirective>

                </KanbanComponent>
        )

    }
}

export default Kanban;