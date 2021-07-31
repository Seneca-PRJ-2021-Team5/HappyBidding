
import React, {useState} from 'react';              //read react
import Image from 'react-bootstrap/Image';

import user1 from '../../img/testUser/user1.jpg';

function BidHistory(props){ 
    const [values, setValues] = useState({
        bidHistory: ""
    });
    const [bidArray, setBidArray] = useState([]);
    const [newBid, setNewBid] = useState(0);

    function sendBid(event){
        setBidArray([...bidArray, parseFloat(newBid) ])  
        bidArray.sort();
        console.log(bidArray)
    }
    
    function handleFakeSubmit(event){
        event.preventDefault();
        console.log("TEST")
    }


    return(
            <React.Fragment>
            <div>
                <h5 class="top-margin-10">
                    <Image class="userPic" width="8%" height="8%" src={user1} roundedCircle />
                    YOUR BID HISTORY
                </h5>
                <div id="top5thBidHistory">
                    {bidArray[bidArray.length-1]} <br/>
                    {bidArray[bidArray.length-2]}  <br/>
                    {bidArray[bidArray.length-3]} <br/>
                    {bidArray[bidArray.length-4]}  <br/>
                </div>
            </div>
            <form id="bidForm" className="input-group" onSubmit={handleFakeSubmit}>
                <input type="number" className="form-control" value={newBid} onChange={e => setNewBid(e.target.value)} placeholder="Enter your bid" />
                <div className="input-group-append">
                    <input className="btn btn-outline-info" type="submit" value="Bid" onClick={e => sendBid(e)}  />
                </div>
            </form>
            </React.Fragment>
    );
}

export default BidHistory;