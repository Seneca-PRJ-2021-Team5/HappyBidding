
import React, {useState, useEffect} from 'react';  //read react
import { MessageList } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:5000" // the host that the server is running on

let socket;

function SynchAuctionChat(props){ 

    const [response, setResponse] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket = socketIOClient(ENDPOINT);
    }, [ENDPOINT]);

    useEffect(() => {
        socket.on('message', m => {
            m.date = new Date(m.date);
            setMessages([...messages, m]);
        });
    }, [messages]);

    function handleSubmit(event){
        console.log("TEST")
    }

    const sendMessage = (event) => {
        event.preventDefault();
    
        if(message) {
          socket.emit('sendMessage', message, () => setMessage(""));
        }
    }

    return(
            <React.Fragment>
                <div id="chatScreen">
                    <MessageList
                        toBottomHeight={'100%'}
                        lockable={true}
                        dataSource={messages} />
                </div>
                <div id="chatForm">
                    <form class="input-group" onSubmit={handleSubmit}>
                        <input type="text" class="form-control" placeholder="Text to chat" value={message} onChange={({ target: { value } }) => setMessage(value)}/>
                        <div class="input-group-append">
                            <input class="btn btn-outline-info" type="submit" value="Send" onClick={e => sendMessage(e)} />
                        </div>
                    </form>
                </div>
            </React.Fragment>
    );
}

export default SynchAuctionChat;