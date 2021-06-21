
import React, {useState} from 'react';              //read react

function SynchAuctionChat(props){ 

        function handleSubmit(event){
            console.log("TEST")
        }

    return(
            <React.Fragment>
            <div id="chatScreen">

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