
import React, {useState} from 'react';              //read react
import Image from 'react-bootstrap/Image';

import user1 from '../../img/testUser/user1.jpg';

function BidHistory(props){ 
    const [values, setValues] = useState({
        bidHistory: ""
    });

    const [counter, setCounter] = useState(0);
    const [newBid, setNewBid] = useState(0);
    const [bids, setBids] = useState({
        firstBid: 0,
        secondBid: 0,
        thirdBid: 0,
        fourthBid: 0,
        fifthBid: 0
    });

    // counter for bid
    var bidArray = Array(6);
    bidArray.fill(0.0);

    //sort by descending
    function compareFunc(a, b) {
        return b - a;
    }

    function sendBid(event){
        console.log(newBid);
        console.log(bidArray);
        var count  = counter;
        if(counter < 5){
            console.log(counter)
            bidArray[count]= newBid;
        }else{
            bidArray[5]=newBid;
        }

        if(counter >= 1){
            bidArray.sort(compareFunc)
        }

        setBids({ 
            firstBid: bidArray[0],
            secondBid: bidArray[1],
            thirdBid: bidArray[2],
            fourthBid: bidArray[3],
            fifthBid:bidArray[4] 
        });

        console.log(bidArray);
        setCounter(counter+1);
        console.log(counter);
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
                    CAD 144,000.00 <br/>
                    CAD 120,000.00 <br/>
                    CAD  90,000.00 <br/>
                    CAD  89,999.00 <br/>
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