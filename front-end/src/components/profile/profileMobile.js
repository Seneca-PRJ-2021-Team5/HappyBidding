import React, {useState} from 'react';
/* CSS */
import '../../css/utility.css';
import '../../css/profileMobile.css';

/* Component */
import SideMenu from './profileSideBar';
import OverViewMobile from './overviewMobile';
import PayInfoMobile from './payInfoMobile';

//function component
function ProfileMobile(props){ 
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
        <React.Fragment>
            <div class="profile_main">
                <OverViewMobile />
                <PayInfoMobile />
                <button type="button" class="signout_button_profile" onclick={handleSignout}>Sign Out</button>
            </div>
        </React.Fragment>
    );
}

 
export default ProfileMobile; 