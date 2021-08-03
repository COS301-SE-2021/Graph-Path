import React from 'react';
import '../css/popUpMessage.css'

class popUpMessage extends React.Component{
    render() {
        const message = this.props.message;
        return(
            <span className="popUpContainer">
                <p>{message}</p>
            </span>
        )
    }
}
export default popUpMessage;