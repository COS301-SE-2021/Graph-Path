import React from 'react';
import '../css/popUpMessage.css'

function popUpMessage(props){
        return(props.trigger) ? (

            <div className="popUpContainer">
                {props.children}
            </div>
        ) : "";
}
export default popUpMessage;