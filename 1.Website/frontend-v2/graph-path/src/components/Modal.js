import  React from 'react' ;
import {Calendar} from "rsuite";

class Modal extends React.Component{
    render() {
        return(
            <div data-testid="calendar-div-id">
            <Calendar bordered />
            </div>
        )
    }
}

export default Modal;