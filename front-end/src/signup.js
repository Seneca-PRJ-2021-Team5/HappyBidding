/* Library */
import React, {useState} from 'react'
import { useMediaQuery } from "react-responsive";
import { Alert, Modal, Button } from 'react-bootstrap'
/* CSS */
import './css/signup.css'
/* Picture */
import signupPic from './img/signupPic.png';
import logoPic from './img/logo.png';


function Signup(props){
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 767px)' })
    //it is equals with this.state on function component 
    const [errorMessage, setError]=useState()
    const [showError, setShow] = useState(false);
    const [values, setValues] = useState({
        userName: "",
        firstName: "",
        lastName: "",
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
    function handleSubmit(event)
    {
        var isOk = true
        if(!values.userName) {
            setError("User Name Required");
            setShow(true)
            isOk = false
        } 
        else if(!values.firstName) {
            setError("First Name Required");
            setShow(true)
            isOk = false
        } 
        else if(!values.lastName) {
            setError("Last Name Required");
            setShow(true)
            isOk = false
        } 
        else if(!values.phoneNumber) {
            setError("Phone Number Required");
            setShow(true)
            isOk = false
        } 
        else if(!values.emailAddress) {
            setError("Email Required");
            setShow(true)
            isOk = false
        } 
        else if(!values.password) {
            setError("Password Required");
            setShow(true)
            isOk = false
        } 
        else if(!values.streetNumber) {
            setError("Street number cannot be blank");
            setShow(true)
            isOk = false
        } 
        else if(!values.streetName) {
            setError("Street name cannot be blank");
            setShow(true)
            isOk = false
        } 
        else if(!values.city) {
            setError("City name is required");
            setShow(true)
            isOk = false
        } 
        else if(!values.postalCode) {
            setError("Postal code is required");
            setShow(true)
            isOk = false
        } 
        else if(!values.country) {
            setError("Country is required");
            setShow(true)
            isOk = false
        }

        if(isOk)
        {
            const regex = "[{}<>!~*%$]"

            if(values.userName.search(regex) != -1 || 
            values.firstName.search(regex) != -1 || 
            values.lastName.search(regex) != -1 || 
            values.phoneNumber.search(regex) != -1 || 
            values.emailAddress.search(regex) != -1 || 
            values.password.search(regex) != -1 || 
            values.streetNumber.search(regex) != -1 || 
            values.streetName.search(regex) != -1 ||
            values.city.search(regex) != -1 || 
            values.postalCode.search(regex) != -1 || 
            values.country.search(regex) != -1)
            {
                setError("Characters not allowed: {}<>!~*%$");
                setShow(true)
                isOk = false
            }
            else
            {
                const userData = {
                    address:{
                        streetNumber: values.streetNumber,
                        streetName: values.streetName,
                        city: values.city,
                        postalCode: values.postalCode,
                        country: values.country
                    },
                    userName: values.userName,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    phoneNumber: values.phoneNumber,
                    emailAddress: values.emailAddress,
                    password: values.password,
                }
    
                fetch('https://happybiddingserve.herokuapp.com/api/user', {
                    method: "POST",
                    body: JSON.stringify(userData),
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                })
                .then(response => response.json()) 
                .then(data => {
                    if(data.message.includes("SUCCESSFULLY")){
                        console.log(data)
                        props.history.push("/login")
                    }
                    else {
                        console.log(data)
                        setError(data.message);
                        setShow(true)
                    }
                })
                .catch(err => console.log(err));
            }
        }

        event.preventDefault();
    }

    const closeErrorMEssage =() => 
    {
        setShow(false)
        setError("")
    }

    return(
        <>
            <div id="signupContainer">

                <Modal show={showError} onHide={closeErrorMEssage}>
                    <Modal.Header closeButton>
                        <Modal.Title>Error Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{errorMessage}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeErrorMEssage}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <img id="signup_logo"  src={logoPic} alt="Happy Bidding Logo" />
                <div id="signup_formContainer">
                    <div id="signup_leftSide">
                        <h2>Sign up form</h2>

                        <form onSubmit={handleSubmit}>
                            <div class="cp_iptxt">
                                <input type="text" placeholder="Usre Name" name="userName" value={values.userName} onChange={handleChange}/>
                            </div>
                            <div class="cp_iptxt">
                                <input type="text" placeholder="First Name" name="firstName" value={values.firstName} onChange={handleChange}/>
                            </div>
                            <div class="cp_iptxt">
                                <input type="text" placeholder="Last Name" name="lastName" value={values.lastName} onChange={handleChange}/>
                            </div>

                            <div class="cp_iptxt">
                                <input type="text" placeholder="Phone Number" name="phoneNumber" value={values.phoneNumber} onChange={handleChange}/>
                            </div>
                            <div class="cp_iptxt">
                                <input type="email"  placeholder="Email" name="emailAddress" value={values.emailAddress} onChange={handleChange}/>
                            </div>
                            <div class="cp_iptxt">
                                <input type="password" placeholder="Password" name="password" value={values.password} onChange={handleChange}/>
                            </div>


                            <div class="cp_iptxt">
                                <input type="number" placeholder="Street Number" name="streetNumber" value={values.streetNumber} onChange={handleChange}/>
                            </div>
                            <div class="cp_iptxt">
                                <input type="text" placeholder="Street Name" name="streetName" value={values.streetName} onChange={handleChange}/>
                            </div>
                            <div class="cp_iptxt">
                                <input type="text" name="city" placeholder="City" value={values.city} onChange={handleChange}/>
                            </div>
                            <div class="cp_iptxt">
                                <input type="text" placeholder="Postal Code" name="postalCode" value={values.postalCode} onChange={handleChange}/>
                            </div>
                            <div class="cp_iptxt">
                                <input type="text"  placeholder="Country" name="country" value={values.country} onChange={handleChange}/>
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
       </> 
    )
}

export default Signup