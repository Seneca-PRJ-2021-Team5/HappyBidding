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

   return (
       <div id="asynchAuctionContainer">
        <Container>
            <Row>
                <Col md={8} class="test">  
                    <Description />
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