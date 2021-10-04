import React, {useRef, useState} from "react";
import {useCollectionData} from "react-firebase-hooks/firestore";
import firebase from "firebase/compat";
import {Button, Icon} from "rsuite";
import 'firebase/firestore';
import "../../css/ProjectChat.css"
import PropTypes from "prop-types";


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
    const query = messagesRef.orderBy('createdAt').limit(2000);

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
            projectId: props.project._id,
            textId:  10 + (Math.random() * (10000 - 100))
        })

        setFormValue('');
        dummy.current.scrollIntoView({behavior: 'smooth'});

    }

    const deleteAllChats = async (projId)=>{
        const snapshot = await firestore
            .collection("messages")
            .limit(2000)
            .where("projectId","==",projId)
            .get();

            const doc = snapshot.docs;
           for (let x =0;x<doc.length;x++){
               await doc[x].ref.delete()
           }

    }

    return (
        <>
            <div id="chat-room-div" className="main-chat-message">
                {
                    props.project.projectOwner === props.user.email ?
                        <Button id="btn-delete" onClick={() => deleteAllChats(props.project._id)} title="Delete all chats" ><Icon id="trash-icon" icon={'trash-o'}/> </Button>
                        :
                        ""
                }

                <main>

                    {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} user={props.user} project={props.project} />)}

                    <span ref={dummy}></span>

                </main>

                <form onSubmit={sendMessage}>

                    <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type a message" />

                    <button type="submit" disabled={!formValue}><Icon id="chat-icon" icon={'send'}/></button>

                </form>
            </div>
        </>
    )

}

function ChatMessage(props) {
    const {  text, email, picture, projectId,textId } = props.message;

    const messageClass = email === props.user.email ? 'sent' : 'received';

    const deleteSingleChat= async (text)=>{
        console.log("text",text)
        const snapshot = await firestore
            .collection("messages")
            .limit(2000)
            .where("textId","==",text)
            .where('email',"==", props.user.email)
            .where('projectId','==',props.project._id)
            .get();

        const doc = snapshot.docs;
        console.log("doc",doc)
        for (let x =0;x<doc.length;x++){
            await doc[x].ref.delete()
        }
    }

    return (
        props.project._id === projectId
        &&
            <div id="chat-message-div" className="main-chat-message">
                <div onDoubleClick={()=>deleteSingleChat(textId)}>
                    <div className={`message ${messageClass}`}>
                        <img src={picture} title={email} alt="icon" />
                        <p>{text}</p>
                    </div>

                </div>

            </div>

    )
}

ChatRoom.propTypes = {
    project : PropTypes.object.isRequired,
    user:PropTypes.object.isRequired
}

export default ChatRoom;