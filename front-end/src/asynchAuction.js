/* Library */
import React, {useEffect, useState} from 'react';              //read react
import {Container, Row, Col} from 'react-bootstrap';
/* CSS */
import './css/asynchAuction.css';
import './css/utility.css';
/* Component */
import Description from './components/synchronousAuction/description';
import TopBid from './components/synchronousAuction/topBid';
import Bid from './components/synchronousAuction/bid';
import TimeLimit from './components/asynchAuction/DisplayTimeLimit';


//function component
function AsynchronousAuction(props){ 
    const [values, setValues] = useState({
        usertype: "",
        username: "", //props.location.state.username,
        password: "",
        showError: false,
        eMessage: ""
    });

    const [description, setDescription] = useState({
        product: {
            name: "Porche Car",
            description: "Brand new porche!!!"
        },
        title: "Support local orphanages",
        description: "All procedes from winner, goes directly to supporting local orphanages"
    })

   return (
       <div id="asynchAuctionContainer">
        <Container>
            <Row>
                <Col md={8} class="test">  
                    <Description descriptionInfo={description}/>
                </Col>
                <Col md={4} class="test">
                    <React.StrictMode>
                        <Row class="top-margin-10">
                            <TimeLimit />
                        </Row>
                    </React.StrictMode>
                    <Row><TopBid /></Row>
                    <Row><Bid /></Row>
                </Col>
            </Row>
        </Container>
        </div>
    );
}

 
export default AsynchronousAuction; 