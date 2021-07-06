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
import { Button, Container, Row, Col } from 'react-bootstrap';
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
        address: {
            city: "",
            country: "",
            postalCode: "",
            streetName: "",
            streetNumber: null,
        },
        currentSessionKey: "",
        emailAddress: "",
        manageAuction: [],
        password: "",
        phoneNumber: "",
        userName: "",
        userType: ""
    })

  useEffect(()=>{
    if(sessionStorage.getItem("emailAddress"))
    {
      console.log("USER MANAGE AUCTION PAGGGGGGGGGE")
      fetch(`https://happybiddingserve.herokuapp.com/api/user/profile?emailAddress=${sessionStorage.getItem("emailAddress")}&sessionId=${sessionStorage.getItem("sessionId")}`)
          .then((res) => {
              return res.json();
          }).then((data)=>{
              console.log(data)
              setUserInfo(data.user)
          })
    }
  },[])
  
  if(sessionStorage.getItem("userName")){
      return (
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
                        <TableRow key={auction._id}>
                          <TableCell component="th" scope="row" Style="font-size: 18px">
                            {auction.auctionName}
                          </TableCell>
                          <TableCell align="right" Style="font-size: 18px">{auction.productName}</TableCell>
                          <TableCell align="right" Style="font-size: 18px">{auction.auctionStatus}</TableCell>
                          <TableCell align="right"><Button variant="info">Pay Auction</Button></TableCell>
                          <TableCell align="right"><Button variant="danger">Report Problem</Button></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
              </TableContainer>
            </Col>
          </Row>

    </Container>
    )
  }
  else{
      return(<>{props.history.push('/login')}</>) 
  }
}

export default withRouter(UserManageAuctions);
