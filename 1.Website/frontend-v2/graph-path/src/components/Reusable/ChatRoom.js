import React, {useRef, useState} from "react";
import {useCollectionData} from "react-firebase-hooks/firestore";
import firebase from "firebase/compat";
import {Icon} from "rsuite";
import 'firebase/firestore';

import "../../css/MainChat.css"
import "../../css/ProjectChat.css"


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

function ChatRoom(props){
    console.log("props chat", props.project)

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
            picture,
            projectId: props.project._id
        })

        setFormValue('');
        dummy.current.scrollIntoView({behavior: 'smooth'});
    }

    return (
        <div id="chat-room-div" className="main-chat-message">
            <main>

                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} user={props.user} project={props.project} />)}

                <span ref={dummy}></span>

            </main>

            <form onSubmit={sendMessage}>

                <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type a message" />

                <button type="submit" disabled={!formValue}><Icon id="chat-icon" icon={'send'}/></button>

            </form>
        {/*<h1>Hello</h1>*/}
        </div>
    )

}

function ChatMessage(props) {
    const { textDate, text, email, picture, projectId } = props.message;
    console.log("time",textDate)

    const messageClass = email === props.user.email ? 'sent' : 'received';

    return (
        props.project._id === projectId
        &&
            <div id="chat-message-div" className="main-chat-message">
                <div className={`message ${messageClass}`}>
                    <img src={picture} title={email} />
                    {/*<p>{createdAt}</p>*/}
                    <p>{text}</p>
                </div>
            </div>

    )
}

export default ChatRoom;