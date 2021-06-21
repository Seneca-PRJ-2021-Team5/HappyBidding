
import React, {useState} from 'react';              //read react
import Image from 'react-bootstrap/Image';

import firstPlace from '../../img/bidRanking/1stPlace.png';
import secondPlace from '../../img/bidRanking/2ndPlace.png';
import thirdPlace from '../../img/bidRanking/3rdPlace.png';
import otherPlace from '../../img/bidRanking/otherPlace.png';
import user1 from '../../img/testUser/user1.jpg';
import user2 from '../../img/testUser/user2.jpg';

function topBid(props){ 
    return(
            <React.Fragment>
            <div id="bidContainer">
                <h5>TOP 5 BIDDERS</h5>
                <div>
                    <div class="top-margin-3">
                        <img class="placePic" src={firstPlace} />
                        <Image class="userPic" width="8%" height="8%" src={user1} roundedCircle />
                        <span class="bidPrice">1st: CAD 144,000.00</span>
                    </div>
                    <div class="top-margin-3">
                        <img class="placePic" src={secondPlace} />
                        <Image class="userPic" width="8%" height="8%" src={user2} roundedCircle />
                        <span class="bidPrice">2nd: CAD 143,999.00</span>
                    </div>
                    <div class="top-margin-3">
                        <img class="placePic" src={thirdPlace} /> 
                        <Image class="userPic" width="8%" height="8%" src={user1} roundedCircle />
                        <span class="bidPrice">3rd: CAD 120,000.00</span>
                    </div>
                    <div class="top-margin-3">   
                        <img class="placePic" src={otherPlace} />
                        <Image class="userPic" width="8%" height="8%" src={user2} roundedCircle />
                        <span class="bidPrice">4th: CAD 90,000.00</span>
                    </div>
                    <div class="top-margin-3"> 
                        <img class="placePic" src={otherPlace} />
                        <Image class="userPic" width="8%" height="8%" src={user1} roundedCircle />
                        <span class="bidPrice">5th: CAD 89,000.00</span>
                    </div>
                </div>
            </div>
            </React.Fragment>
    );
}

export default topBid;