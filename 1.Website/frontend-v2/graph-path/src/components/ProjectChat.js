import React, {useRef, useState} from 'react'
import firebase from "firebase/compat";
import 'firebase/firestore';
import "../css/ProjectChat.css"
import SendIcon from '@rsuite/icons/Send';

import {useCollectionData} from "react-firebase-hooks/firestore";
import {Icon} from "rsuite";

firebase.initializeApp({
    apiKey: "AIzaSyBOHKBax9ECbhxK8qmdlwAGNbZ8gdq5heY",
    authDomain: "graph-path.firebaseapp.com",
    projectId: "graph-path",
    storageBucket: "graph-path.appspot.com",
    messagingSenderId: "1007642885720",
    appId: "1:1007642885720:web:9b9178abcaaf37433b542d",
    measurementId: "G-2WLJJYC0FS"
})

const firestore = firebase.firestore();

class ProjectChat extends React.Component{

    render(){
        console.log("here",this.props.project)
        return(
            <section>
                <ChatRoom user={this.props.user} />
            </section>
        )
    }
}

function ChatRoom(props){
    console.log("props chat", props.user)

    const dummy = useRef();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query, {idField: 'id'})

    const [formValue, setFormValue] = useState('');


    const sendMessage = async (e) => {
        e.preventDefault();

        const {email, picture} = props.user;

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            email,
            picture
        })

        setFormValue('');
        dummy.current.scrollIntoView({behavior: 'smooth'});
    }

        return (<div id="chat-room-div">
            <main>

                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} user={props.user} />)}

                <span ref={dummy}></span>

            </main>

            <form onSubmit={sendMessage}>

                <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Say something" />

                <button type="submit" disabled={!formValue}><Icon id="chat-icon" icon={'send'}/></button>

            </form>
            {/*<h1>Hello</h1>*/}
        </div>)

}

function ChatMessage(props) {
    const { textDate, text, email, picture } = props.message;
    console.log("time",textDate)

    const messageClass = email === props.user.email ? 'sent' : 'received';

    return (<div id="chat-room-div">
        <div className={`message ${messageClass}`}>
            <img src={picture} title={email} />
            {/*<p>{createdAt}</p>*/}
            <p>{text}</p>
        </div>
    </div>)
}
export default ProjectChat;