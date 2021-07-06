import React from 'react';
import {useState} from 'react';
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




const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(auctionName, productName, status, payment, report) {
  return { auctionName, productName, status, payment, report };
}

const rows = [
  createData('Happy Racing', 'Ferrari 812 GTS', 'Done', 'Pay', 'Report'),
  createData('Happy Gaming', 'Sony PS5', 'Done', 'Pay', 'Report'),
  createData('Happy Reading', 'GOT Collection', 'Ongoing', 'Pay', 'Report'),
];

export default function UserManageAuctions(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    userInfo: props.location.state.userInfo
  })

  return (
    <Container fluid>
      <Row>
        <Col xs={3} className="SideBar2" >
          <SideBar ></SideBar>
        </Col>
        
        <Col>

            <UserInfo className="mt-4" lg ></UserInfo>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Auction Name</TableCell>
                    <TableCell align="right">Product Name</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {values.userInfo.manageAuction.map((auction) => (
                    <TableRow key={auction._id}>
                      <TableCell component="th" scope="row">
                        {auction.auctionName}
                      </TableCell>
                      <TableCell align="right">{auction.productName}</TableCell>
                      <TableCell align="right">{auction.auctionStatus}</TableCell>
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
    
    
  );
}
