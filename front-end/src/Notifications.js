import React from 'react';
import SideBar from './components/profile/profileSideBar';
import {useState, useEffect} from 'react';
import { Table, Button, Container, Row, Col, Modal, Form } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

const Notifications= (props)=>
{
    const [problemList, setProblemList] = useState([])

    const [allAuctions, setAuctions] = useState([])
    const [allUsers, setUsers] = useState([])

    useEffect(() => 
    {
        setProblemList(props.history.location.state.problemList)
        console.log(problemList)

        return function cleanup() {
            console.log("CLEAN UP")
        };
        
        ///////////////////////////////////////////////////////////////////////////////////
        // TODO: Still need to work on the code to make data to be dinamic
        // - Meaning that the user should be able to see changed in the notifications list
        // in the auctioneer manage auction page
        // - In case the user changes his/her information, then the table in the 
        // auctioneer manage auction should update the user information as well...
        ///////////////////////////////////////////////////////////////////////////////////

        // The route still need to be protected
        // fetch(`https://happybiddingserve.herokuapp.com/api/users`) 
        // .then((res) => {
        //     return res.json();
        // })
        // .then((users)=>
        // {
        //     setUsers(users)
        // })


        // The route still need to be protected
        // fetch(`https://happybiddingserve.herokuapp.com/api/auctions`)
        // .then((res) => {
        //     return res.json();
        // })
        // .then((auctions)=>
        // {
        //     setAuctions(auctions)
        // })

        // var local_problems = [];
        // allAuctions.map(auction=>
        // {
        //     if(auction.problemList.length)
        //     {
        //         auction.problemList.map(problem=>
        //         {
        //             let userFound = allUsers.find((user) => user._id === problem.userId )

        //             if(userFound)
        //             {
        //                 local_problems.push({
        //                     auctionId: auction._id,
        //                     auctionTitle: auction.title,
        //                     problemDescription: problem.problemDescription,
        //                     userFirstName: userFound.firstName,
        //                     userLastName: userFound.lastName,
        //                     userEmailAddress: userFound.emailAddress
        //                 })

        //             }

                        
        //         })

        //     }
        // })

        // console.log(local_problems)
        // setProblemList(local_problems)

    },[])


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
                                return (<tr key={problem.arrayIdentifier}>
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