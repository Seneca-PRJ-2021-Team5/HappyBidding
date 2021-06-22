
import React, {useState, useEffect} from 'react';              //read react
import socketIOClient from "socket.io-client";

import Messages from './Messages/messages';

const ENDPOINT = "http://localhost:5000"

function SynchAuctionChat(props){ 

    const [response, setResponse] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
    }, []);

    function handleSubmit(event){
        console.log("TEST")
    }

    return(
            <React.Fragment>
            <div id="chatScreen">
                <Messages messages={messages}/>
            </div>
            <form id="chatForm" class="input-group" onSubmit={handleSubmit}>
                <input type="text" class="form-control" placeholder="Text to chat" />
                <div class="input-group-append">
                    <input class="btn btn-outline-info" type="submit" value="Send" />
                </div>
                    </form>
            </React.Fragment>
    );
}

export default SynchAuctionChat;