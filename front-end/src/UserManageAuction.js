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
import PaymentIntegration from './components/payment/PaymentIntegration';
import { Button, Container, Row, Col, Modal, Form, InputGroup } from 'react-bootstrap';
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
  const [changesSelectedAuction, setChangesAuction] = useState({
    _id:"",
    title: "",
    auctCategory:"",
    description:"",
    startDate:"",
    endDate:"",
    price:0,
    productName:"",
    productDescription:"",
    status: ""
  })

  const [showReportProblem, setShowReport] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showEditAuctionForm, setShowEditAuction] = useState(false)

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
    console.log(userInfo.manageAuction)

    console.log("ALL AUCTIONS:")
    console.log(props.location.state.allAuctions)

    return function cleanup() {
        console.log("CLEAN UP")
    };

  }, [userInfo.id])

  const handleChange =(event) =>{
    setDescription(event.target.value);
  }

  const handleAuctionChange=(event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setChangesAuction({...changesSelectedAuction, [name]: value });
  }

  const closeReportProblem =() => 
  {
    setShowReport(false)
    setDescription("")
  }

  const closeConfirmDeletion =() => 
  {
    setShowConfirm(false)
  }

  const closeEditAuction =() => 
  {
    setShowEditAuction(false)
  }

  const showReportProblemForm=(auctionSelected) =>
  {
    setSelectedAuction(auctionSelected.auctionId)
    setShowReport(true)
  }

  const showConfirmDeletion=(auctionSelected)=>
  {
    setSelectedAuction(auctionSelected)
    setShowConfirm(true)
  }

  const showEditAuction=(auctionSelected)=>
  {
    console.log(auctionSelected)

    setChangesAuction({...changesSelectedAuction,
      _id: auctionSelected._id,
      title: auctionSelected.title,
      auctCategory: auctionSelected.auctCategory,
      description: auctionSelected.description,
      startDate: auctionSelected.startDate.replace(/T.*/gi, ''),
      endDate: auctionSelected.endDate.replace(/T.*/gi, ''),
      price: auctionSelected.price,
      productName: auctionSelected.product.name,
      productDescription: auctionSelected.product.description,
      status: auctionSelected.status

    })
    setShowEditAuction(true)
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

  const confirmDeletion = () =>
  {
    console.log("SELECTED AUTION:")
    console.log(selectedAuction)
    fetch(`https://happybiddingserve.herokuapp.com/api/auctioneer/deleteAuction/${selectedAuction._id}`, { method: 'DELETE' })
    props.location.state.allAuctions.splice(props.location.state.allAuctions.findIndex(auction => auction._id == selectedAuction.auctionId), 1)
    closeConfirmDeletion()
  }

  const saveAuctionChanges = ()=>
  {
    setChangesAuction({...changesSelectedAuction,
      startDate: new Date(changesSelectedAuction.startDate),
      endDate: new Date(changesSelectedAuction.endDate)
    })
    
    fetch(`https://happybiddingserve.herokuapp.com/api/auction/${changesSelectedAuction._id}`, {
      method: "POST",
      body: JSON.stringify(changesSelectedAuction),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    closeEditAuction()
  }
  
  if(sessionStorage.getItem("userName")){
      return (
        <>
          {/* ------------------------- REPORT A PROBLEM POPUP ---------------------------------------------- */}
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
                  <Button variant="primary" onClick={()=>{reportTheProblem()}}>
                    Send 
                  </Button>
                  <Button variant="secondary" onClick={closeReportProblem}>
                      Close
                  </Button>
              </Modal.Footer>
          </Modal>

          {/* --------------------- DELETE AUCTION POPUP -------------------------------------------------- */}
          <Modal show={showConfirm} centered size="lg">
              <Modal.Header>
                  <Modal.Title>Confirm Deletion</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h3>Are you sure you want to delete the following auction?</h3>
                <h2>{selectedAuction.auctionName}</h2>
              </Modal.Body>
              <Modal.Footer>
                  <Button variant="danger" onClick={()=>{confirmDeletion()}}>
                    Delete Permanently
                  </Button>
                  <Button variant="secondary" onClick={closeConfirmDeletion}>
                    Close
                  </Button>
              </Modal.Footer>
          </Modal>

          {/* --------------------- EDIT AUCTION POPUP -------------------------------------------------- */}
          <Modal show={showEditAuctionForm} onHide={closeEditAuction} centered size="lg">
              <Modal.Header closeButton>
                  <Modal.Title>Edit Auction</Modal.Title>
              </Modal.Header>
              <Modal.Body>

                <Container>
                    <Form onSubmit={saveAuctionChanges}>
                        <Row>
                            <h3>Auction Detail</h3>
                            <Col>
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control name="productName" type="text" value={changesSelectedAuction.productName} onChange={handleAuctionChange} />
                            </Col>
    
                            <Col>
                                <Form.Label>Product Description</Form.Label>
                                <Form.Control name="productDescription" type="text" value={changesSelectedAuction.productDescription} onChange={handleAuctionChange} />
                            </Col>
                        </Row>
                        <Row>
                            <h3>Auction's Details</h3>
                            <Col>
                                <Form.Label>Auction's Title</Form.Label>
                                <Form.Control name="title" type="text" value={changesSelectedAuction.title} onChange={handleAuctionChange} />
                                <Form.Label>Auction's Start Date</Form.Label>
                                <Form.Control name="startDate" type="date" defaultValue={changesSelectedAuction.startDate} onChange={handleAuctionChange} />
                                <Form.Label>Auction's Status</Form.Label>
                                <Form.Control name="status" as="select" defaultValue={changesSelectedAuction.status} onChange={handleAuctionChange}>
                                    <option>Choose...</option>
                                    <option>Ongoing</option>
                                    <option>Done</option>
                                </Form.Control>
                            </Col>
                            <Col>
                                <Form.Label>Auction's Category</Form.Label>
                                <Form.Control name="category" as="select" defaultValue={changesSelectedAuction.auctCategory} onChange={handleAuctionChange}>
                                    <option>Choose...</option>
                                    <option>Technology</option>
                                    <option>Entertainment</option>
                                    <option>Studies</option>
                                    <option>Charity</option>
                                    <option>Cuisine</option>
                                    <option>Amenities</option>
                                    <option>Games</option>
                                    <option>Housing</option>
                                    <option>Food</option>
                                    <option>University</option>
                                    <option>Donation</option>
                                </Form.Control> 
                                <Form.Label>Auction's End Date</Form.Label>
                                <Form.Control name="endDate" type="date" defaultValue={changesSelectedAuction.endDate} onChange={handleAuctionChange} />
                            </Col>
    
                            <Col>
                                <Form.Label>Auction's Description</Form.Label>
                                <Form.Control name="description" type="text" value={changesSelectedAuction.description} onChange={handleAuctionChange} />
                                <Form.Label>Auction's Initial Price</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control type="number" min="0" step="1" name="price" aria-label="Amount (to the nearest dollar)" value={changesSelectedAuction.price} onChange={handleAuctionChange} />
                                    <InputGroup.Append>
                                        <InputGroup.Text>.00</InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Col>
    
                        </Row>

                    </Form>
                </Container>

              </Modal.Body>
              <Modal.Footer>
                  <Button variant="primary" onClick={saveAuctionChanges}>
                      Save Changes
                  </Button>
                  <Button variant="secondary" onClick={closeEditAuction}>
                      Close
                  </Button>
              </Modal.Footer>
          </Modal> 

          {/* ----------------------------------------------------------------------- */}


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
                        
                        { sessionStorage.getItem('userType') === "user" && userInfo.manageAuction.map((auction) => (
                          <TableRow key={auction.auctionId}>
                            <TableCell component="th" scope="row" Style="font-size: 18px">
                              {auction.auctionName}
                            </TableCell>
                            <TableCell align="right" Style="font-size: 18px">{auction.productName}</TableCell>
                            <TableCell align="right" Style="font-size: 18px">{auction.auctionStatus}</TableCell>
                              <React.Fragment>
                                {/* <TableCell align="right"><Button variant="info">Pay Auction</Button></TableCell> */}
                                <TableCell align="right">{(auction.auctionStatus == "Done") ? <PaymentIntegration auctionId={auction.auctionId}/> : <Button>Join auction</Button>}</TableCell>
                                <TableCell align="right"><Button variant="danger" onClick={()=>showReportProblemForm(auction)}>Report Problem</Button></TableCell>
                              </React.Fragment>
                          </TableRow>
                        ))
                        }
                        {sessionStorage.getItem('userType') === "auctioneer" && props.location.state.allAuctions.map((auction) => (
                          <TableRow key={auction._id}>
                            <TableCell component="th" scope="row" Style="font-size: 18px">
                              {auction.title}
                            </TableCell>
                            <TableCell align="right" Style="font-size: 18px">{auction.product.name}</TableCell>
                            <TableCell align="right" Style="font-size: 18px">{auction.status}</TableCell>
                            <React.Fragment>
                                <TableCell align="right"><Button variant="warning" onClick={()=>showEditAuction(auction)}>  Edit  </Button></TableCell>
                                <TableCell align="right"><Button variant="danger" onClick={()=>showConfirmDeletion(auction)}>  Delete  </Button></TableCell>
                            </React.Fragment>
                          </TableRow>
                        ))
                        }

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
