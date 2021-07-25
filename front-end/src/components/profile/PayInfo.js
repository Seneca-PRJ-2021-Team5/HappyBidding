/* Library */
import React, {useEffect, useState} from 'react';              //read react
import { withRouter } from 'react-router-dom';
import { Button, Container, Row, Col, Form, Image } from 'react-bootstrap'
/* CSS */
/* Image */
import cardPic from '../../img/creditCard.png';

//function component
function PayInfo(props){ 
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



   return (
        <React.Fragment>
            <Form>
                <h2 className="text-center" Style="margin-botton: 30px;">Credit Card Information</h2>
                <Row className="text-center mt-5">
                    <Col>
                        <Button className="btn btn-primary"  onClick={editOnClick} disabled={!disableEdit}>
                            Edit Card Information
                        </Button>
                    </Col>
                    <Col>
                        <Button className="btn btn-warning" type="submit" onClick={saveChanges} hidden={disableEdit}>
                            Save Changes
                        </Button>
                    </Col>
                </Row>
                <div  className="card-override">
                    <Row className="cardInfo_1 mb-3">
                        <Col xs={8}>
                            <p className="fs-5">
                                Card Number
                                <Form.Control size="sm"  name="cardNumber" type="text" placeholder="" value={userInfo.cardNumber} readOnly={disableEdit} onChange={handleChange}/>
                            </p>
                        </Col>
                        <Col>
                            <span className="card-logo"></span>
                        </Col>
                    </Row>
                    <Row className="cardInfo_2">
                        <Col>
                            <p className="fs-5">
                                Exipry date
                                <Form.Control  size="sm" name="expiryDate" type="text" placeholder="" value={userInfo.expiryDate} readOnly={disableEdit} onChange={handleChange}/>
                            </p>
                        </Col>

                    </Row>
                    <Row className="cardInfo_3">
                        <Col>
                            <p className="fs-5">
                                CVV <br/>
                                <Form.Control   size="sm" name="verificationNumber" type="password" placeholder="" value={userInfo.verificationNumber} readOnly={disableEdit} onChange={handleChange}/>
                            </p>
                        </Col>
                    </Row>
                </div>
            </Form>

            <div>
                <div className="d-flex justify-content-center fs-3">Recent Auction Transactions </div>
                <div className="row  justify-content-between">
                    <div className="col offset-md-2">
                        <label>Yesterday </label><br/>
                        <span className="purchasedItem_pc">Car</span><span className="purchasedPrice_pc">CA$ 2345.12</span><br/>
                    </div>
                    <div className="col  offset-md-2">
                        <label>Today</label><br/>
                        <span className="purchasedItem_pc">Bicycle</span><span className="purchasedPrice_pc">CA$ 3215.50</span>
                    </div>
                </div>
            </div>

        </React.Fragment>
    );
}

 
export default withRouter(PayInfo); 