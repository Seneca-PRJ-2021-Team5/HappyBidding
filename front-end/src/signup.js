/* Library */
import React, {useState} from 'react'
import { useMediaQuery } from "react-responsive";
/* CSS */
import './css/signup.css'
/* Picture */
import signupPic from './img/signupPic.png';
import logoPic from './img/logo.png';


function Signup(props){
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 767px)' })
    //it is equals with this.state on function component 
    const [values, setValues] = useState({
        userName: "",
        phoneNumber: "",
        emailAddress: "",
        password: "",
        streetNumber: "",
        streetName: "",
        city: "",
        postalCode: "",
        country: ""
    });

    //when user input a value, this function change value on values
    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        setValues({ ...values, [name]: value });
    }

    //this function works to insert user info to MondoDB after user submit form
    //if inserting info is success, then redirect to login page.
    function handleSubmit(event){
        const userData = {
            address:{
                streetNumber: values.streetNumber,
                streetName: values.streetName,
                city: values.city,
                postalCode: values.postalCode,
                country: values.country
            },
            userName: values.userName,
            phoneNumber: values.phoneNumber,
            emailAddress: values.emailAddress,
            password: values.password,
        }
        console.log(`|${userData.userName}|`)
        console.log(`|${userData.password}|`)
        fetch('https://happybiddingserve.herokuapp.com/api/user', {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json()) 
        .then(json => {
            console.log(json)
            props.history.push("/login")
        })
        .catch(err => console.log(err));

        event.preventDefault();
    }

    return(
        <div id="signupContainer">
        <img id="signup_logo"  src={logoPic} alt="Happy Bidding Logo" />
            <div id="signup_formContainer">
            <div id="signup_leftSide">
            <h2>Sign up form</h2>

            <form onSubmit={handleSubmit}>
                <div class="cp_iptxt">
                <input type="text" placeholder="User Name" id="userName" name="userName" value={values.userName} onChange={handleChange}/>
                </div>
                <div class="cp_iptxt">
                <input type="text" placeholder="Phone Number" id="phoneNumber" name="phoneNumber" value={values.phoneNumber} onChange={handleChange}/>
                </div>
                <div class="cp_iptxt">
                <input type="email" id="email"  placeholder="Email" name="emailAddress" value={values.emailAddress} onChange={handleChange}/>
                </div>
                <div class="cp_iptxt">
                <input type="password" id="password" placeholder="Password" name="password" value={values.password} onChange={handleChange}/>
                </div>


                <div class="cp_iptxt">
                <input type="number" id="streetNumber" placeholder="Street Number" name="streetNumber" value={values.streetNumber} onChange={handleChange}/>
                </div>
                <div class="cp_iptxt">
                <input type="text" id="streetName" placeholder="Street Name" name="streetName" value={values.streetName} onChange={handleChange}/>
                </div>
                <div class="cp_iptxt">
                <input type="text" id="city" name="city" placeholder="City" value={values.city} onChange={handleChange}/>
                </div>
                <div class="cp_iptxt">
                <input type="text" id="postalCode" placeholder="Postal Code" name="postalCode" value={values.postalCode} onChange={handleChange}/>
                </div>
                <div class="cp_iptxt">
                <input type="text" id="country"  placeholder="Country" name="country" value={values.country} onChange={handleChange}/>
                </div>
                <br/>
                <input id="signup_sButton" type="submit" value="Submit"/>
            </form>
            </div>
            <div id="signup_rightSide">
                
            {isTabletOrMobile?null:<img id="signupPic" src={signupPic} alt="Happy Bidding signup" />}
            </div>
            </div>  
        </div>
        
    )
}

export default Signup