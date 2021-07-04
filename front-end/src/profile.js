/* Library */
import React, {useEffect, useState} from 'react';              //read react
import { useMediaQuery } from "react-responsive";
import Cookies from 'js-cookie'; //using js-cookie to save the cookies
/* CSS */
import './css/profilePC.css';
import './css/overViewPC.css';
import './css/utility.css';
//import './css/reset.css'; //reset browser's default css
/* Component */
import ProfilePC from './components/profile/profilePC';
import ProfileMobile from './components/profile/profileMobile';

import SideMenu from './components/profile/profileSideBar';
import logoPic from './img/logo.png';
import userPic from './img/userImage.png';
import cardPic from './img/creditCard.png';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap'

//function component
function Profile(props){ 
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 767px)' })

    const [disableEdit, setDisableEdit] = useState(true)
    const [values, setValues] = useState({
        userType: "",
        userName: props.location.state.username,
        password: "",
        showError: false,
        eMessage: ""
    });

    /*
    useEffect(() => {
        fetch(`https://happybiddingserve.herokuapp.com/api/user/profile?emailAddress=${values.username}`)
        .then((res) => {
            return res.json();
        }).then((data)=>{
            console.log("PROFILE PAGGGGGGGGGE")
            console.log(data)
            setValues({...values, userType: data.userType, userName: data.userName, password: data.password})
        })
    },[values.userName])
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
        // <div className="profile">
        //     <h1>{console.log(values.username)}</h1>{isTabletOrMobile? <ProfileMobile userInfo={values}/> : < ProfilePC userInfo={values}/>}
        // </div>
        <Container>
            <Row>
        {/* ---------------- SIDEBAR ------------------------- */}
                <Col Style="border:solid red 1px">
                    <SideMenu/>
                </Col>

        {/* ---------------- OVERVIEW PROFILE ---------------- */}
                <Col Style="border:solid black 1px">
                    <div className="overview_logoArea_pc">
                        <img src={logoPic}/>
                    </div>
                    <h2>Overview</h2>
                    <Form>
                        <Row>
                            <h4>Current Mailing Address</h4>
                            <Form.Group controlId="userAddress">
                                <Form.Control type="text" placeholder="" value="" readOnly={disableEdit} />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Col>
                                <h4>First Name</h4>
                                <Form.Control type="text" placeholder="" value="" readOnly={disableEdit}/>
                            </Col>
                            <Col>
                                <h4>Last Name</h4>
                                <Form.Control type="text" placeholder="" value="" readOnly={disableEdit}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <h4>Login User Name</h4>
                                <Form.Control type="text" placeholder="" value={values.userName} readOnly={disableEdit}/>
                            </Col>
                            <Col>
                                <h4>Current Password</h4>
                                <Form.Control type="password" placeholder="" value={values.password} readOnly={disableEdit}/>
                            </Col>
                        </Row>

                        <Button variant="primary" type="submit">
                            Edit Profile
                        </Button>
                    </Form>

                </Col>

        {/* ---------------- PAYMENT PROFILE ----------------- */}
                <Col Style="border:solid purple 1px">
                    <img src={userPic} /><br/>
                    <label>User Name</label><br/>
                    <span>Edit Profile</span>

                    <label>Cards Saved </label> <span> Update payment information</span>
                    
                    <img src={cardPic} />
                    <label className="number_title">card number</label>
                    <p className="cardNum">6698 1236 7899 3301</p>
                    <label className="expiry_title">expiry date</label>
                    <p className="expiryDate">22/07</p>

                    <label className="title">Recent Auction Transactions </label><br/>
                    <div>
                        <label>Today </label><br/>
                        <span className="purchasedItem_pc">Car</span><span className="purchasedPrice_pc">CA$ 2345.12</span><br/>
                    </div>
                    <div>
                        <label>Yesterday </label><br/>
                        <span className="purchasedItem_pc">Bicycle</span><span className="purchasedPrice_pc">CA$ 3215.50</span>
                    </div>

                </Col>
            </Row>
        </Container>
    );
}

export default Profile; 

// Code from the other components
/* <div className="profile">

    <h1>{console.log(values.username)}</h1>{isTabletOrMobile? <ProfileMobile userInfo={values}/> : < ProfilePC userInfo={values}/>}
</div> */
{/* <div className="profile_sidebar">
                <SideMenu/>
            </div>

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
                    </form>
                </div>
            </div> 

            <div class="profile_payInfo">
                <div class="userInfoArea_pc">
                    <img src={userPic} /><br/>
                    <label>User Name</label><br/>
                    <span>Edit Profile</span>
                </div>

                <div class="cardInfo_pc">
                    <label>Cards Saved </label> <span> Update payment information</span>
                    <div class="cardInfo">
                        <img src={cardPic} />
                        <label class="number_title">card number</label>
                        <p class="cardNum">6698 1236 7899 3301</p>
                        <label class="expiry_title">expiry date</label>
                        <p class="expiryDate">22/07</p>
                    </div>
                </div>

                <div class="transaction_pc">
                    <label class="title">Recent Auction Transactions </label><br/>
                    <div>
                        <label>Today </label><br/>
                        <span class="purchasedItem_pc">Car</span> <span class="purchasedPrice_pc">CA$ 2345.12</span><br/>
                    </div>
                    <div>
                    <br/><label>Yesterday </label> <br/>
                        <span class="purchasedItem_pc">Bicycle</span> <span class="purchasedPrice_pc">CA$ 3215.50</span>
                    </div>
                </div>
            </div>
        
        
        
        
        */}
 