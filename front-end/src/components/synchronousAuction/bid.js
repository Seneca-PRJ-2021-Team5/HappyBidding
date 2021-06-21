
import React, {useState} from 'react';              //read react
import Image from 'react-bootstrap/Image';

import user1 from '../../img/testUser/user1.jpg';

function BidHistory(props){ 
    const [values, setValues] = useState({
        bidHistory: ""
    });


        //it change value when user input value
        function handleInputChange(event){
            const name = event.target.name;
            const value = event.target.value;
            setValues({ ...values, [name]: value });
        }
        function handleSubmit(event){
            console.log(values.username)
            console.log(values.password)
        }
        //it works if user click "Trouble logging in?"
        function handleClick(){
            props.history.push({
                pathname: '/recoveryAccount',
                //this.props.location.state.username on dashboard.js
                state: { username: values.username }
            });
        }

    return(
            <React.Fragment>
            <div>
                <h5 class="top-margin-10">
                    <Image class="userPic" width="8%" height="8%" src={user1} roundedCircle />
                    YOUR BID HISTORY
                </h5>
                <div id="top5thBidHistory">
                    CAD 144,000.00 <br/>
                    CAD 120,000.00 <br/>
                    CAD  90,000.00 <br/>
                    CAD  89,999.00 <br/>
                </div>
            </div>
            <form id="bidForm" class="input-group" onSubmit={handleSubmit}>
                <input type="text" class="form-control" placeholder="Enter your bid" />
                <div class="input-group-append">
                    <input class="btn btn-outline-info" type="submit" value="Bid" />
                </div>
                    </form>
            </React.Fragment>
    );
}

export default BidHistory;