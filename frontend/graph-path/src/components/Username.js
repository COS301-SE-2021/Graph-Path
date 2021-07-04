import React from 'react' ;
import * as FaIcons from "react-icons/fa";
import '../css/common.css'

class Username extends React.Component{
    render(){
        const user = this.props.userEmail;
        return(
            <span className="userName" ><FaIcons.FaSmile id="smileIcon" /> Hi, {user.username} </span>
        )

    }
}
export default Username;