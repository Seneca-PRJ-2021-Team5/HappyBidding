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
        <div className="overview_main_pc">
            <div className="overview_logoArea_pc">
                <img src={logoPic}/>
            </div>
            <div className="overview_userProfileArea_pc">
            <label id="overview">Overview</label>
                <form action="" method="">
                <div>
                    <label className="title" id="currentMailA">Current Mailing Address</label><br/> 
                    <textarea className="input" id="inputAddress" disabled>Address INFO</textarea><br/>
                    <label className="updateLabel" id="updateMailA">Update Mailling Address</label>
                </div>
                <br/>
                <div>
                    <label className="title" id="firstN">First Name</label> 
                    <label className="nextTitle" id="lastName">Last Name</label><br/>
                    <input type="text" id="firstNameInput" className="input" value="FirstName"disabled/>
                    <input type="text" className="secondInput" id="lastNameInput" value="LastName" disabled/><br/>
                    <label id="updateLastN">Update Last Name</label>
                </div>
                <br/>
                <div>
                    <label className="title" id="userN">User Name</label>  
                    <label className="nextTitle" id="curretPass">Current Password</label><br/>
                    <input type="text" id="usernameInput" className="input" value="Username" disabled/>
                    <input id="passInput" type="password" className="secondInput" value="FirstName" disabled/><br/>
                    <label id="updateUsername">Update User Name</label> <label id="updatePass">Update Password</label>
                </div>
                <input type="button" id="button" className="signout_button_profile" onClick={handleSignout} value="Signout" />
                </form>
            </div>
        </div>
    );
}

 
export default OverviewPC;  