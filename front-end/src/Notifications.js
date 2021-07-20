import React from 'react';
import SideBar from './components/profile/profileSideBar';
import {useState, useEffect} from 'react';
import { Table, Button, Container, Row, Col, Modal, Form } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

const Notifications= ()=>
{
    const [problemList, setProblemList] = useState([{}])

    useEffect(() => {
        fetch(`https://happybiddingserve.herokuapp.com/api/auctions`)
        .then((res) => {
            return res.json();
        }).then((auctions)=>{
            console.log("AUCTIONS WITH NOTIFICATIONS:")
            
            if(auctions != null)
            {
                let auctionsWithProblems = auctions.filter(auction=> auction.problemList.length > 0)

                if(auctionsWithProblems.length > 0)
                {
                    auctionsWithProblems.map(auction=>
                    {
                        let auctionId = auction._id
                        let auctionTitle = auction.title

                        console.log(auctionId, auctionTitle)

                        console.log("PROBLEM LIST, ONE BY ONE:")
                        auction.problemList.map(problem=>
                        {
                            console.log(problem)

                            setProblemList([...problemList, {
                                auctionTitle: auctionTitle,
                                auctionId: auctionId,
                                userFirstName: problem.userFirstName,
                                userLastName: problem.userLastName,
                                userEmailAddress: problem.userEmailAddress,
                                problemDescription: problem.problemDescription,
                                reportDate: problem.reportDate
                            }])
                        })
                    })

                }

            }
        })
        console.log("PROBLEM LIST UPDATED:")
        console.log(problemList)

        return function cleanup() {
            console.log("CLEAN UP")
        };

    },[problemList.length])

    if(sessionStorage.getItem("userName")){
        return (
            <Container fluid>
                <Row>
                <Col xs={3} className="SideBar2" >
                    <SideBar ></SideBar>
                </Col>
                
                <Col className="p-0">
                    <Table responsive="sm">
                        <thead>
                            <tr>
                                <th><h4>Auction Title</h4></th>
                                <th><h4>Problem Description</h4></th>
                                <th><h4>User Full Name</h4></th>
                                <th><h4></h4></th>
                            </tr>
                        </thead>
                        <tbody>

                            {problemList.map(problem=>{
                                // console.log(problem)
                                (<tr key={problem.auctionId}>
                                    <td>{problem.auctionTitle}</td>
                                    <td>{problem.problemDescription}</td>
                                    <td>{problem.userFirstName} {problem.userLastName}</td>
                                    <td><Button variant="info">Reply Problem</Button></td>
                                </tr>)
                            })}

                        </tbody>
                    </Table>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default withRouter(Notifications);