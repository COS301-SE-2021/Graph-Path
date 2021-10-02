import React from 'react'
import ChatRoom from "./Reusable/ChatRoom";

class ProjectChat extends React.Component{

    render(){
        console.log("here",this.props.project)
        return(
            <section>
                <ChatRoom project={this.props.project} user={this.props.user} />
            </section>
        )
    }
}
export default ProjectChat;