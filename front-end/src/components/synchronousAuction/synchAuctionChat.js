
import React, {useState, useEffect} from 'react';              //read react
import socketIOClient from "socket.io-client";

import Messages from './Messages/messages';

const ENDPOINT = "http://localhost:5000"

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
            setMessages([...messages, m.text]);
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
                    {messages.map((message, i) => <p id={i}>{message}</p>)}
                </div>
                <form id="chatForm" class="input-group" onSubmit={handleSubmit}>
                    <input type="text" class="form-control" placeholder="Text to chat" value={message} onChange={({ target: { value } }) => setMessage(value)} />
                    <div class="input-group-append">
                        <input class="btn btn-outline-info" type="submit" value="Send" onClick={e => sendMessage(e)} />
                    </div>
                </form>
            </React.Fragment>
    );
}

export default SynchAuctionChat;