import React from 'react';
import {useState, useStyles, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SideBar from './components/profile/profileSideBar';
import { Button, Container, Row, Col, Modal, Form } from 'react-bootstrap';
import './css/sideBar.css'
import UserInfo from './components/profile/userInfo';
import { propTypes } from 'react-bootstrap/esm/Image';
import { withRouter } from 'react-router-dom';



function UserManageAuctions(props) 
{

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const classes = useStyles();
  
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
    manageAuction: [],
    cardNumber: "",
    cardType: "",
    expiryDate: "",
    nameOnCard: "",
    userEmail: "",
    verificationNumber: "",
    showError: false,
    eMessage: ""
  })

  const [problemDescription, setDescription] = useState("")
  const [selectedAuction, setSelectedAuction] = useState("")
  const [showReportProblem, setShow] = useState(false)

  useEffect(() => {
    fetch(`https://happybiddingserve.herokuapp.com/api/user/profile?emailAddress=${sessionStorage.getItem("emailAddress")}&sessionId=${sessionStorage.getItem("sessionId")}`)
    .then((res) => {
        return res.json();
    }).then((data)=>{
        console.log("USER MANAGE AUCTION!!!!!")
        console.log(data.user._id)
        //setValues({...values, userInfo: data.user, paymentInfo: data.creditCard})
        // console.log(props.location.state.userInfo.userType)
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
            manageAuction: data.user.manageAuction,
            cardNumber: data.creditCard.cardNumber,
            cardType: data.creditCard.cardType,
            expiryDate: data.creditCard.expiryDate,
            nameOnCard: data.creditCard.nameOnCard,
            verificationNumber: data.creditCard.verificationNumber,
            userType: data.user.userType
        })
    })
    console.log("USER INFO DATA FROM MANAGE AUCTION:")
    console.log(userInfo)
    return function cleanup() {
        console.log("CLEAN UP")
    };

}, [userInfo.id])

const handleChange =(event) =>{
  setDescription(event.target.value);
}

const closeReportProblem =() => 
{
    setShow(false)
    setDescription("")
}

const showReportProblemForm=(auctionSelected) =>
{
  setSelectedAuction(auctionSelected.auctionId)
  setShow(true)
}

const reportTheProblem =() =>
{
  fetch(`https://happybiddingserve.herokuapp.com/api/user/reportProblem/${selectedAuction}`, {
    method: "POST",
    body: JSON.stringify({
      userInfo: userInfo,
      problemDescription: problemDescription
    }),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  closeReportProblem()
  
}
  
  if(sessionStorage.getItem("userName")){
      return (
        <>
          <Modal show={showReportProblem} onHide={closeReportProblem} centered size="lg">
              <Modal.Header closeButton>
                  <Modal.Title>Describe Your Problem</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Row className="">
                    <Col>
                      <Form.Control name="problemDescription" type="text" placeholder="Type your problem" value={problemDescription} onChange={handleChange}/>
                    </Col>
                  </Row>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                  <Button variant="secondary" onClick={closeReportProblem}>
                      Close
                  </Button>
                  <Button variant="primary" onClick={()=>{reportTheProblem()}}>
                    Report The Problem
                  </Button>
              </Modal.Footer>
          </Modal>

          <Container fluid>
            <Row>
              <Col xs={3} className="SideBar2" >
                <SideBar ></SideBar>
              </Col>
              
              <Col className="p-0">
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell><h4>AUCTION NAME</h4></TableCell>
                          <TableCell align="right"><h4>PRODUCT NAME</h4></TableCell>
                          <TableCell align="right"><h4>STATUS</h4></TableCell>
                          <TableCell align="right"></TableCell>
                          <TableCell align="right"></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {userInfo.manageAuction.map((auction) => (
                          <TableRow key={auction.auctionId}>
                            <TableCell component="th" scope="row" Style="font-size: 18px">
                              {auction.auctionName}
                            </TableCell>
                            <TableCell align="right" Style="font-size: 18px">{auction.productName}</TableCell>
                            <TableCell align="right" Style="font-size: 18px">{auction.auctionStatus}</TableCell>
                            { sessionStorage.getItem('userType') === "user" &&
                              <React.Fragment>
                                <TableCell align="right"><Button variant="info">Pay Auction</Button></TableCell>
                                <TableCell align="right"><Button variant="danger" onClick={()=>showReportProblemForm(auction)}>Report Problem</Button></TableCell>
                              </React.Fragment>
                            }
                            { sessionStorage.getItem('userType') === "auctioneer" &&
                              <React.Fragment>
                                <TableCell align="right"><Button variant="warning">  Edit  </Button></TableCell>
                                <TableCell align="right"><Button variant="danger" onClick={()=>showReportProblemForm(auction)}>  Delete  </Button></TableCell>
                              </React.Fragment>
                            }
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                </TableContainer>
              </Col>
            </Row>

      </Container>
    </>
    )
  }
  else{
      return(<>{props.history.push('/login')}</>) 
  }
}

export default withRouter(UserManageAuctions);
