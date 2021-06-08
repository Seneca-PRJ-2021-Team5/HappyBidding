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
            <label id="overview">Overview</label>
                <form action="" method="">
                <div><label class="title" id="leftSide">Current Mailing Address</label><br/> <textarea class="input" id="leftInput" disabled>Address INFO</textarea><br/><label class="updateLabel" id="smallLeft">Update Mailling Address</label></div><br/>
                <div><label class="title" id="firstN">First Name</label> <label class="nextTitle" id="rightSide">Last Name</label> <br/><input type="text" id="rightInput" class="input" value="FirstName"disabled/><input type="text" class="secondInput" id="leftInput" value="FirstName" disabled/><br/><label id="updateLabel1">Update Last Name</label></div><br/>
                <div><label class="title" id="leftSide">User Name</label>  <label class="nextTitle" id="rightSide">Current Password</label> <br/><input type="text" id="leftInput" class="input" value="Username" disabled/><input type="password" class="secondInput" value="FirstName" disabled/><br/><label id="updateLabel2">Update User Name</label> <label id="nextUpdateLabel">Update Password</label></div>
                <input type="button" class="signout_button_profile" onClick={handleSignout} value="Signout" />
                </form>
            </div>
        </div>
    );
}

 
export default OverviewPC;  