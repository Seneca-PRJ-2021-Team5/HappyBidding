import React, {useState} from 'react';
/* Component */
import SideMenu from './profileSideBar';
import OverViewPC from './overviewPC';
import PayInfoPC from './payInfoPC';



//function component
function ProfilePC(props){ 
    const [values, setValues] = useState({
        usertype: "",
        username: "",
        password: "",
        showError: false,
        eMessage: ""
    });

    //it change value when user input value
    function handleInputChange(event){
        const name = event.target.name;
        const value = event.target.value;
        setValues({ ...values, [name]: value });
    }


  //return page body
  //min-width: 768px => for PC
   return (
        <React.Fragment>
            <div className="profile_sidebar"><SideMenu/></div>
            <div className="profile_main"><OverViewPC /></div>
            <div className="profile_side"><PayInfoPC /></div>
        </React.Fragment>
    );
}

 
export default ProfilePC; 