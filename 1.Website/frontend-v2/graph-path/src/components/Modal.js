import  React from 'react' ;
import {Calendar} from "rsuite";
import {Sigma,EdgeShapes,NodeShapes,DragNodes,RelativeSize,RandomizeNodePositions} from 'react-sigma' ;

class Modal extends React.Component{
    render() {
        return(
            <>
            <Calendar bordered />
            </>
        )
    }
}

export default Modal;