/* Library */
import React, {useState} from 'react';              //read react
/* CSS */
import './css/payInfo.css';
/* Image */
import userPic from './img/userImage.png';
import cardPic from './img/creditCard.png';

//function component
function PayInfo(props){ 
    const [values, setValues] = useState({
        usertype: "",
        username: "",
        password: "",
        showError: false,
        eMessage: ""
    });



  //return page body
  //min-width: 768px => for PC
   return (
        <div class="profile_payInfo">
            <div class="userInfoArea">
                <img src={userPic} /><br/>
                <label>User Name</label><br/>
                <span>Edit Profile</span>
            </div>
            <div class="cardInfo">
                <label>Cards Saved </label> <span> Update payment information</span>
                <div class="cardInfo">
                    <img src={cardPic} />
                    <label class="number_title">card number</label>
                    <p class="cardNum">6698 1236 7899 3301</p>
                    <label class="expiry_title">expiry date</label>
                    <p class="expiryDate">22/07</p>
                </div>
            </div>
            <div class="transaction">
                <label class="title">Recent Auction Transactions </label><br/>
                <div>
                    <label>Today </label><br/>
                    <span id="purchasedItem">Car</span> <span id="purchasedPrice">CA$ 2345.12</span><br/>
                </div>
                <div>
                <br/><label>Yesterday </label> <br/>
                    <span id="purchasedItem">Bicycle</span> <span id="purchasedPrice">CA$ 3215.50</span>
                </div>
            </div>
        </div>
    
    );
}

 
export default PayInfo; 