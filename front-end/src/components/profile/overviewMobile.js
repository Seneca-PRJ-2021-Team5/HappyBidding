/* Library */
import React, {useState} from 'react';              //read react
/* CSS */
import '../../css/overViewMobile.css';
/* Image */
import userPic from '../..//img/userImage.png';


//function component
function OverviewMobile(props){ 
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
        <div class="overview_main_mobile">
            <img src={userPic} /><br/>
            <label id="userName_label">User Name</label><br/>
            <div class="overview_userProfileArea_mobile">
                <button  class="editBtn" type="button" onclick="">Edit User Information</button>
                <div class='userInfo b-radius'>
                    <label>Current Mailing Address</label><br/><span>Address INFO </span><br/>
                    <label>First Name</label><br/><span>Joe</span><br/>
                    <label>Last Name</label><br/><span>Doe</span><br/>
                    <label>Current Password</label><br/><input type="password" class="secondInput" value="FirstName" disabled/><br/>
                </div>
                
            </div>
        </div>
    );
}

 
export default OverviewMobile;  