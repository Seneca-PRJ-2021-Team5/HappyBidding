/* Library */
import React, {useState} from 'react';              //read react
/* CSS */

/* Image */

//function component
function LiveStreaming(props){ 
    const [values, setValues] = useState({
        usertype: "",
        username: "",
        password: "",
        showError: false,
        eMessage: ""
    });



  //return page body
  //min-width: 768px => for PC
  //title will be auction name
  //src will get from db
   return (
       //560 315
        <div id="liveStreamingContainer">
            <iframe width="620" height="405" 
               src="https://www.youtube.com/embed/YzXoH8Lsetc" 
               title="YouTube video player" 
               frameborder="0" 
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
               allowfullscreen>
            </iframe>
        </div>
    );
}

 
export default LiveStreaming; 

