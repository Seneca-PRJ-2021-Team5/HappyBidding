/* Library */
import React, {useState} from 'react';              //read react
/* CSS */
import './css/overView.css';
/* Image */
import logoPic from './img/logo.png';
import biddingPic from './img/bidding.png';


//function component
function Overview(props){ 
    const [values, setValues] = useState({
        usertype: "",
        username: "",
        password: "",
        showError: false,
        eMessage: ""
    });

    function handleSignout(){
        props.history.push('/login');
    }
  //return page body
  //min-width: 768px => for PC
   return (
        <div class="overview_main">
            <div class="overview_logoArea">
                <img src={logoPic}/>
            </div>
            <div class="overview_userProfileArea">
            <label>Overview</label>
                <form action="" method="">
                <div><label id="title">Current Mailing Address</label><br/> <textarea id="input" disabled>Address INFO</textarea><br/><label id="updateLabel">Update Mailling Address</label></div><br/>
                <div><label id="title">First Name</label> <label id="nextTitle">Last Name</label> <br/><input type="text" id="input" value="FirstName"disabled/><input type="text" id="secondInput" value="FirstName" disabled/><br/><label id="updateLabel">Update Name</label></div><br/>
                <div><label id="title">User Name</label>  <label id="nextTitle">Current Password</label> <br/><input type="text" id="input" value="FirstName" disabled/><input type="password" id="secondInput" value="FirstName" disabled/><br/><label id="updateLabel">Update User Name</label> <label id="nextUpdateLabel">Update Password</label></div>
                <input type="button" class="overview_sbutton" onClick={handleSignout} value="Signout" />
                </form>
            </div>
        </div>
    );
}

 
export default Overview;  