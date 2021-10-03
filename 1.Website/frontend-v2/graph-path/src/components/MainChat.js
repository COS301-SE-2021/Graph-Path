import React from 'react'
import {Container, Content, Header, List, Sidebar} from "rsuite";
import ChatRoom from "./Reusable/ChatRoom";


const project=["Project 1","Project 2","Project 3","Project 4","Project 4","Project 4","Project 4","Project 4","Project 4","Project 4","Project 4","Project 4","Project 4","Project 4","Project 4","Project 4","Project 4","Project 4","Project 4","Project 4","Project 4","Project 4","Project 4","Project 4","Project 4","Project 4","Project 4"];

class MainChat extends React.Component{
    render(){
        return(
            <Container id="main-chat-container" >
                <Sidebar id="side-bar-chat">

                    <List>
                        {project.map((item, index) => (
                            <List.Item key={index} index={index}>
                                {item}
                            </List.Item>
                        ))}
                    </List>

                </Sidebar>
                <Container>
                    <Header id="header-chat" >Graph Path Chat Room</Header>
                    <Content id="content-chat">
                        <section>
                            <ChatRoom user={this.props.user} />
                        </section>
                    </Content>
                </Container>
            </Container>
        )
    }
}
export default MainChat