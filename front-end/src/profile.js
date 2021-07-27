/* Library */
import React, {useEffect, useState} from 'react';              //read react

/* CSS */
import './css/profilePC.css';
import './css/overViewPC.css';
import './css/utility.css';
import './css/sideBar.css';

import './css/profileOverview.css';

/* Component */
import SideMenu from './components/profile/profileSideBar';
import PayInfo from './components/profile/PayInfo';
import OverView from './components/profile/Overview';
import {  Container, Row, Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';

//function component
function Profile(props){ 
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

    const [problemList, setProblemList] = useState([])
    const [allAuctions, setAuctions] = useState([])

    useEffect(() => {
        fetch(`https://happybiddingserve.herokuapp.com/api/user/profile?emailAddress=${sessionStorage.getItem("emailAddress")}&sessionId=${sessionStorage.getItem("sessionId")}`)
        .then((res) => {
            return res.json();
        }).then((data)=>{

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


        fetch(`https://happybiddingserve.herokuapp.com/api/auctions`)
        .then((res) => {
            return res.json();
        })
        .then((auctions)=>
        {
            setAuctions(auctions)
        })

        var local_problems = [];
        allAuctions.map(auction=>
        {
            if(auction.problemList.length)
            {
                auction.problemList.map(problem=>
                {
                    local_problems.push({
                        problemId: problem._id,
                        auctionId: auction._id,
                        auctionTitle: auction.title,
                        problemDescription: problem.problemDescription,
                        userFirstName: problem.userFirstName,
                        userLastName:  problem.userLastName,
                        userEmailAddress: problem.userEmailAddress
                    })
                })
                setProblemList(local_problems)
            }
        })


        return function cleanup() {
            console.log("CLEAN UP")
        };

    }, [userInfo.id])


    const updateAuctions=(updatedAuctionList)=>
    {
        setAuctions(updatedAuctionList)
    }


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

    if(sessionStorage.getItem("userName")){
    return (

            <Container fluid>
                <Row>
            {/* ---------------- SIDEBAR ------------------------- */}
                    <Col className="SideBar2" sm={2}>
                        <SideMenu 
                            userInfo={userInfo} 
                            problemList={problemList} 
                            updateAuctions={updateAuctions}
                            allAuctions={allAuctions}/>
                    </Col>

            {/* ---------------- OVERVIEW PROFILE ---------------- */}
                    <Col sm={6} className="mt-5">
                        <OverView  userInfo={userInfo} />
                    </Col>

            {/* ---------------- PAYMENT PROFILE ----------------- */}
                    <Col  sm={4}>
                        <PayInfo userInfo={userInfo} />
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
 