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
                <div><label class="title" id="currentMailA">Current Mailing Address</label><br/> <textarea class="input" id="inputAddress" disabled>Address INFO</textarea><br/><label class="updateLabel" id="updateMailA">Update Mailling Address</label></div><br/>
                <div><label class="title" id="firstN">First Name</label> <label class="nextTitle" id="lastName">Last Name</label> <br/><input type="text" id="firstNameInput" class="input" value="FirstName"disabled/><input type="text" class="secondInput" id="lastNameInput" value="LastName" disabled/><br/><label id="updateLastN">Update Last Name</label></div><br/>
                <div><label class="title" id="userN">User Name</label>  <label class="nextTitle" id="curretPass">Current Password</label> <br/><input type="text" id="usernameInput" class="input" value="Username" disabled/><input id="passInput" type="password" class="secondInput" value="FirstName" disabled/><br/><label id="updateUsername">Update User Name</label> <label id="updatePass">Update Password</label></div>
                <input type="button" id="button" class="signout_button_profile" onClick={handleSignout} value="Signout" />
                </form>
            </div>
        </div>
    );
}

 
export default OverviewPC;  