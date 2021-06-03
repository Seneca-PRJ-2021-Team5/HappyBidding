/* Library */
import React, {useState} from 'react';              //read react
/* CSS */
import '../../css/payInfoMobile.css';

//function component
function PayInfoMobile(props){ 
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
        <div class="profile_payInfo_mobile">
            <button class="editBtn" type="button" onclick="">Edit Credit Card Information</button>
            <div class='cardInfo_mobile b-radius'>
                <label>Card Number</label><br/><span>xxxx xxxx xxxx xxxx </span><br/>
                <label>Expiry Date</label><br/><span>07/22</span><br/>
            </div>
            <div class="transaction_mobile b-radius">
                <label class="title">Recent Auction Transactions </label><br/>
                <div>
                    <label>Today </label><br/>
                    <span class="purchasedItem_mobile">Car</span> <span class="purchasedPrice_pc">CA$ 2345.12</span><br/>
                </div>
                <div>
                    <br/><label>Yesterday </label> <br/>
                    <span class="purchasedItem_mobile">Bicycle</span> <span class="purchasedPrice_pc">CA$ 3215.50</span>
                </div>
            </div>
        </div>
    
    );
}

 
export default PayInfoMobile; 