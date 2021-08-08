/* Library */
import React, {useEffect, useState} from 'react';              //read react
import { useMediaQuery } from "react-responsive";
import {Container, Row, Col} from 'react-bootstrap';
/* CSS */
import './css/reset.css'; 
import './css/synchAuction.css';
import './css/utility.css';
/* Component */
import LiveStreaming from './components/synchronousAuction/liveStreaming';
import Description from './components/synchronousAuction/description';
import TopBid from './components/synchronousAuction/topBid';
import Bid from './components/synchronousAuction/bid';
import Chat from './components/synchronousAuction/synchAuctionChat';

//function component
function SynchronousAuction(props){ 

    const [description, setDescription] = useState({
        product: {
            name: "",
            description: ""
        },
        title: "",
        description: ""
    })

    useEffect(() => {
        console.log("The props: " + props.auctionId)
        fetch(`http://localhost:5000/api/auctions/${props.location.state.auctionId}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
          setDescription({...description,
                product: {
                    name: data.auction.product.name,
                    description: data.auction.product.description
                },
                title: data.auction.title,
                description: data.auction.description
            })
        })
    })
    
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 767px)' })
    const [values, setValues] = useState({
        usertype: "",
        username: "", //props.location.state.username,
        password: "",
        showError: false,
        eMessage: ""
    });



  //return page body
  //min-width: 768px => for PC
  //{isTabletOrMobile? <ProfileMobile /> : < ProfilePC />}
   return (
       <div id="synchAuctionContainer">
        <Container>
            <Row>
                <Col md={3} class="test">  
                    <Description descriptionInfo={description}/>
                </Col>
                <Col id="liveStreamingContainer" class="test">
                    <Row>
                        <React.StrictMode>
                            <LiveStreaming />
                        </React.StrictMode>
                    </Row>
                    <Row><Chat /></Row>
                </Col>
                <Col md={3} class="test">
                    <Row><TopBid /></Row>
                    <Row><Bid /></Row>
                </Col>
            </Row>
        </Container>
        </div>
    );
}

 
export default SynchronousAuction; 