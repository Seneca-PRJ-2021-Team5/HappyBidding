/* Library */
import React, {useEffect, useState} from 'react';              //read react
import { useMediaQuery } from "react-responsive";
import Cookies from 'js-cookie'; //using js-cookie to save the cookies
/* CSS */
import './css/profilePC.css';
import './css/reset.css'; //reset browser's default css
/* Component */
import ProfilePC from './components/profile/profilePC';
import ProfileMobile from './components/profile/profileMobile';

//function component
function Profile(props){ 
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 767px)' })
    const [values, setValues] = useState({
        usertype: "",
        username: "", //props.location.state.username,
        password: "",
        showError: false,
        eMessage: ""
    });


    fetch(`https://happybiddingserve.herokuapp.com/api/user/profile?emailAddress=${values.username}`)
    .then((res) => {
        return res.json();
    }).then((data)=>{
        console.log(data)
        Cookies.set('userName', data.user);
    })

    /*
    useEffect(() => {
              //https://happybiddingserve.herokuapp.com/api/user/profile?emailAddress=AGAIN@gmail.com
        fetch(`https://happybiddingserve.herokuapp.com/api/user/profile?emailAddress=${values.username}`)
        .then((res) => {
            return res.json();
        }).then((data)=>{
            console.log("PROFILE PAGGGGGGGGGE")
            console.log(data)
        })
    },[values.username])
    */

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
            <h1>{console.log(values.username)}</h1>{isTabletOrMobile? <ProfileMobile /> : < ProfilePC />}
        </div>
    );
}

 
export default Profile; 