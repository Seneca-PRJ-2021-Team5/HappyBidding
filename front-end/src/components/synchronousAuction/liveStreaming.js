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
            <div class="embed-responsive embed-responsive-4by3">
                <iframe width="100%" height="360px" class="embed-responsive-item" src="https://www.youtube.com/embed/yNE9t567_lY" allowfullscreen></iframe>
            </div>
    );
}

 
export default LiveStreaming; 

