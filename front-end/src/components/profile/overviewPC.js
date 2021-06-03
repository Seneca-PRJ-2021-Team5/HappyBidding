/* Library */
import React, {useState} from 'react';              //read react
/* CSS */
import '../../css/overViewPC.css';
import '../../css/utility.css';
/* Image */
import logoPic from '../../img/logo.png';


//function component
function OverviewPC(props){ 
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
        <div class="overview_main_pc">
            <div class="overview_logoArea_pc">
                <img src={logoPic}/>
            </div>
            <div class="overview_userProfileArea_pc">
            <label>Overview</label>
                <form action="" method="">
                <div><label class="title">Current Mailing Address</label><br/> <textarea class="input" disabled>Address INFO</textarea><br/><label class="updateLabel">Update Mailling Address</label></div><br/>
                <div><label class="title">First Name</label> <label class="nextTitle">Last Name</label> <br/><input type="text" class="input" value="FirstName"disabled/><input type="text" class="secondInput" value="FirstName" disabled/><br/><label id="updateLabel">Update Name</label></div><br/>
                <div><label class="title">User Name</label>  <label class="nextTitle">Current Password</label> <br/><input type="text" class="input" value="FirstName" disabled/><input type="password" class="secondInput" value="FirstName" disabled/><br/><label id="updateLabel">Update User Name</label> <label id="nextUpdateLabel">Update Password</label></div>
                <input type="button" class="signout_button_profile" onClick={handleSignout} value="Signout" />
                </form>
            </div>
        </div>
    );
}

 
export default OverviewPC;  