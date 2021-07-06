/* Library */
import React, {useEffect, useState} from 'react';              //read react
import { useMediaQuery } from "react-responsive";

/* CSS */
//import './css/reset.css'; //reset browser's default css
import './css/profilePC.css';
import './css/overViewPC.css';
import './css/utility.css';
import './css/sideBar.css';

import './css/profileOverview.css';

/* Component */
import SideMenu from './components/profile/profileSideBar';
import userPic from './img/userImage.png';
import { Button, Container, Row, Col, Form, Image } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';

//function component
function Profile(props){ 
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 767px)' })

    const [disableEdit, setDisableEdit] = useState(true)

    const [values, setValues] = useState({
        userInfo: {
            address: {
                city: "",
                country: "",
                postalCode: "",
                streetName: "",
                streetNumber: null,
            },
            currentSessionKey: "",
            emailAddress: "",
            manageAuction: [],
            password: "",
            phoneNumber: "",
            userName: "",
            userType: ""
        },
        paymentInfo: {
            cardNumber: null,
            cardType: "",
            expiryDate: "",
            nameOnCard: "",
            userEmail: "",
            verificationNumber: null
        },
        showError: false,
        eMessage: ""
    });

    useEffect(() => {
        fetch(`https://happybiddingserve.herokuapp.com/api/user/profile?emailAddress=${sessionStorage.getItem("emailAddress")}&sessionId=${sessionStorage.getItem("sessionId")}`)
        .then((res) => {
            return res.json();
        }).then((data)=>{
            console.log("PROFILE PAGGGGGGGGGE")
            console.log(data)
            setValues({...values, userInfo: data.user, paymentInfo: data.creditCard})
        })
        return function cleanup() {
            console.log("CLEAN UP")
        };
    },[])

    function editOnClick()
    {
        console.log("AAAAAAAAAAHHHHHHH!!!!!")
        setDisableEdit((disableEdit)=>!disableEdit)
    }

    
    function saveChanges(event)
    {   
        // NEED TO US
        // fetch('https://happybiddingserve.herokuapp.com/api/user', {
        //     method: "POST",
        //     body: JSON.stringify(userData),
        //     headers: {"Content-type": "application/json; charset=UTF-8"}
        // })
        setDisableEdit((disableEdit)=>!disableEdit)
        event.preventDefault();
    }

    if(sessionStorage.getItem("userName")){
    return (

            <Container fluid>
                <Row>
            {/* ---------------- SIDEBAR ------------------------- */}
                    <Col className="SideBar2" sm={2}>
                        <SideMenu userInfo={values.userInfo}/>
                    </Col>

            {/* ---------------- OVERVIEW PROFILE ---------------- */}
                    <Col sm={6} className="mt-5">
                        {/* <div className="overview_logoArea_pc">
                            <img src={logoPic}/>
                        </div> */}
                        <Form>
                            <h2 className="text-center" Style="margin-botton: 30px;">Profile Overview</h2>
                            <Image className="image-center" width={180} height={180} Style="" src={userPic}/>
                            <br/>
                            <Row className="text-center">
                                <Col>
                                    <label>{values.userInfo.userName}</label><br/>
                                    <Button variant="primary" onClick={editOnClick} disabled={!disableEdit}>
                                        Edit Profile
                                    </Button>
                                </Col>
                            </Row>

                            <Row className="profileOverviewRow">
                                <h4>Current Mailing Address</h4>
                                <Col Style="margin-top: 30px;">
                                    <h4>Street Name</h4>
                                    <Form.Control name="streetName" type="text" placeholder="" value={values.userInfo.address.streetName} readOnly={disableEdit} />
                                </Col>
                                
                            </Row>

                            <Row className="profileOverviewRow">
                                <Col>
                                    <h4>Street Number</h4>
                                    <Form.Control name="streetNumber" type="text" placeholder="" value={values.userInfo.address.streetNumber} readOnly={disableEdit} />
                                </Col>
                                <Col>
                                    <h4>City</h4>
                                    <Form.Control name="city" type="text" placeholder="" value={values.userInfo.address.city} readOnly={disableEdit} />
                                </Col>
                                <Col>
                                    <h4>Postal Code</h4>
                                    <Form.Control name="postalCode" type="text" placeholder="" value={values.userInfo.address.postalCode} readOnly={disableEdit} />
                                </Col>
                                <Col>
                                    <h4>Country</h4>
                                    <Form.Control name="country" type="text" placeholder="" value={values.userInfo.address.country} readOnly={disableEdit} />
                                </Col>
                            </Row>

                            <Row className="profileOverviewRow">
                                <Col>
                                    <h4>First Name</h4>
                                    <Form.Control name="firstName" type="text" placeholder="" value={values.userInfo.userName} readOnly={disableEdit}/>
                                </Col>
                                <Col>
                                    <h4>Last Name</h4>
                                    <Form.Control name="lastName" type="text" placeholder="" value="" readOnly={disableEdit}/>
                                </Col>
                            </Row>

                            <Row className="profileOverviewRow">
                                <Col>
                                    <h4>Email</h4>
                                    <Form.Control name="emailAddress" type="email" placeholder="" value={values.userInfo.emailAddress} readOnly={disableEdit}/>
                                </Col>
                                <Col>
                                    <h4>Current Password</h4>
                                    <Form.Control name="password" type="password" placeholder="" value={values.userInfo.password} readOnly={disableEdit}/>
                                </Col>
                            </Row>

                            <Row className="profileOverviewRow">
                                <Col>
                                    <Button variant="warning" type="submit" onClick={saveChanges} hidden={disableEdit}>
                                        Save Changes
                                    </Button>
                                </Col>
                                <br/>
                                <br/>
                            </Row>

                        </Form>

                    </Col>

            {/* ---------------- PAYMENT PROFILE ----------------- */}
                    <Col  sm={4}>

                        <span>Edit Profile</span>

                        <label>Cards Saved </label> <span>Update payment information</span>
                        
                        <div className="card-override">
                            <div className="card-logo">.</div>
                            <div>
                                <label className="number_title">card number</label>
                                <p className="cardNum">{values.paymentInfo.cardNumber}</p>
                                <label className="expiry_title">expiry date</label>
                                <p className="expiryDate">{values.paymentInfo.expiryDate}</p>
                                <label className="">CVV</label>
                                <p className="">{values.paymentInfo.verificationNumber}</p>
                            </div>
                        </div>

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
        )
    }
    else{
        return(<>{props.history.push('/login')}</>) 
    }
}

export default withRouter(Profile); 
 