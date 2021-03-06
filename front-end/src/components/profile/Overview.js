/* Library */
import React, {useEffect, useState} from 'react';              //read react
import { Button, Container, Row, Col, Form, Image } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';
/* CSS */
import '../../css/overViewPC.css';
import '../../css/utility.css';
/* Image */
import userPic from '../../img/userImage.png';

//function component
function Overview(props){
    const [disableEdit, setDisableEdit] = useState(true)

    const [userInfo, setUserInfo] = useState({
        id: "",
        city: "",
        country: "",
        postalCode: "",
        streetName: "",
        streetNumber: null,
        currentSessionKey: "",
        emailAddress: "",
        manageAuction: [],
        password: "",
        phoneNumber: "",
        userName: "",
        firstName: "",
        lastName: "",
        userType: "",
        cardNumber: "",
        cardType: "",
        expiryDate: "",
        nameOnCard: "",
        userEmail: "",
        verificationNumber: "",
        showError: false,
        eMessage: ""
    })

    const [values, setValues] = useState({
        usertype: "",
        username: "",
        password: "",
        showError: false,
        eMessage: ""
    });

    useEffect(() => {
        fetch(`https://happybiddingserve.herokuapp.com/api/user/profile?emailAddress=${sessionStorage.getItem("emailAddress")}&sessionId=${sessionStorage.getItem("sessionId")}`)
        .then((res) => {
            return res.json();
        }).then((data)=>{
            console.log("Over view")
            console.log(data.user._id)

            setUserInfo({...userInfo,
                id: data.user._id,
                streetName: data.user.address.streetName,
                streetNumber: data.user.address.streetNumber,
                city: data.user.address.city,
                postalCode: data.user.address.postalCode,
                country: data.user.address.country,
                firstName: data.user.firstName,
                lastName: data.user.lastName,
                emailAddress: data.user.emailAddress,
                password: data.user.password,
                cardNumber: data.creditCard.cardNumber,
                cardType: data.creditCard.cardType,
                expiryDate: data.creditCard.expiryDate,
                nameOnCard: data.creditCard.nameOnCard,
                verificationNumber: data.creditCard.verificationNumber,
                userType: data.user.userType
            })
        })
        console.log("USER INFO DATA:")
        console.log(userInfo)
        return function cleanup() {
            console.log("CLEAN UP")
        };

    }, [userInfo.id])

    
    function editOnClick()
    {
        setDisableEdit((disableEdit)=>!disableEdit)
    }

    const handleChange =(event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setUserInfo({ ...userInfo, [name]: value });
    }

    
    function saveChanges(event)
    {   
        fetch('https://happybiddingserve.herokuapp.com/api/user/update', {
            method: "POST",
            body: JSON.stringify(userInfo),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        setDisableEdit((disableEdit)=>!disableEdit)
        event.preventDefault();
    }

    function handleSignout(){
        props.history.push('/login');
    }

  //return page body
  //min-width: 768px => for PC
   return (
        <React.Fragment>
            <Form>
                <h2 className="text-center" Style="margin-botton: 30px;">Profile Overview</h2>
                <Image className="image-center" width={180} height={180} Style="" src={userPic}/>
                <br/>
                            
                <Row className="text-center">
                    <Col>
                        <label>{userInfo.firstName} {userInfo.lastName}</label><br/>
                        <Button variant="primary" onClick={editOnClick} disabled={!disableEdit}>
                            Edit Profile
                        </Button>
                    </Col>
                </Row>

                <Row className="profileOverviewRow">
                    <h4>Current Mailing Address</h4>
                    <Col Style="margin-top: 30px;">
                        <h4>Street Name</h4>
                            <Form.Control name="streetName" type="text" placeholder="" value={userInfo.streetName} readOnly={disableEdit} onChange={handleChange}/>
                    </Col>
                                
                </Row>
                <Row className="profileOverviewRow">
                    <Col>
                        <h4>Street Number</h4>
                        <Form.Control name="streetNumber" type="text" placeholder="" value={userInfo.streetNumber} readOnly={disableEdit} onChange={handleChange}/>
                    </Col>
                    <Col>
                        <h4>City</h4>
                        <Form.Control name="city" type="text" placeholder="" value={userInfo.city} readOnly={disableEdit} onChange={handleChange}/>
                    </Col>
                    <Col>
                        <h4>Postal Code</h4>
                        <Form.Control name="postalCode" type="text" placeholder="" value={userInfo.postalCode} readOnly={disableEdit} onChange={handleChange}/>
                    </Col>
                    <Col>
                        <h4>Country</h4>
                        <Form.Control name="country" type="text" placeholder="" value={userInfo.country} readOnly={disableEdit} onChange={handleChange}/>
                    </Col>
                </Row>

                <Row className="profileOverviewRow">
                    <Col>
                        <h4>First Name</h4>
                        <Form.Control name="firstName" type="text" placeholder="" value={userInfo.firstName} readOnly={disableEdit} onChange={handleChange}/>
                    </Col>
                    <Col>
                        <h4>Last Name</h4>
                        <Form.Control name="lastName" type="text" placeholder="" value={userInfo.lastName} readOnly={disableEdit} onChange={handleChange}/>
                    </Col>
                </Row>

                <Row className="profileOverviewRow">
                    <Col>
                        <h4>Email</h4>
                        <Form.Control name="emailAddress" type="email" placeholder="" value={userInfo.emailAddress} readOnly={disableEdit} onChange={handleChange}/>
                    </Col>
                    <Col>
                        <h4>Current Password</h4>
                        <Form.Control name="password" type="password" placeholder="" value={userInfo.password} readOnly={disableEdit} onChange={handleChange}/>
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
        </React.Fragment>
    );
}

 
export default withRouter(Overview);  