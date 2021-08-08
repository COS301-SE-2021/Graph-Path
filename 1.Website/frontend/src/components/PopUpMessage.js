import React from 'react';
import '../css/PopUpMessage.css'
import * as IoIcons from "react-icons/io5";


class PopUpMessage extends React.Component{
    render() {
        const popUpText = this.props.text
        return(
            <div  className="popUpContainer">
              <IoIcons.IoNotificationsCircleOutline className="notificationIcon" />  <p>{popUpText}</p>
            </div>
        )
    }
}
export default PopUpMessage;