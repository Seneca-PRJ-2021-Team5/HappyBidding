/* Library */
import React, {useState} from 'react';              //read react
import { useMediaQuery } from "react-responsive";
/* CSS */
import './css/profilePC.css';
import './css/reset.css'; //reset browser's default css
/* Component */
import ProfilePC from './components/profile/profilePC';
import ProfileMobile from './components/profile/profileMobile';

//function component
function AuctioneerProfile(props){ 
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 767px)' })
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
  //{isTabletOrMobile? <ProfileMobile /> : < ProfilePC />}
   return (
        <div class="profile">
            {isTabletOrMobile? <ProfileMobile /> : < ProfilePC />}
        </div>
    );
}

 
export default AuctioneerProfile; 