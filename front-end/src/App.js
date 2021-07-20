import React from 'react'; //import react
import { useState, useEffect} from 'react'
//import react-router-dom to use BrowserRouter, route, switch to move page
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Jumbotron, Container} from 'react-bootstrap';


import Login from './login'; //import login.js 
import RecoveryAccount from './recoveryAccount'; //import RecoveryAccount.js 
import RecoveryCompleted from './recoveryCompleted'; 
import Signup from './signup';
import Profile from './profile';
import HomePage from './HomePage'
import UserManageAuction from './UserManageAuction'
import NotFound from './NotFound'
import SynchAuction from './synchAuction'
import CreateNewAuction from './CreateNewAuction'
import Notifications from './Notifications'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/navigationBar.css'
import './css/App.css'

function App (props){

  const [ userStatus, setUserStatus ] = useState(false);
  const [ userType, setUserType ] = useState("");

  const getUserLoginStatus=(type, loginState)=>
  {
    setUserStatus(true)
    setUserType(type)
  }

  const setLogOut=()=>
  {
    setUserStatus(false)
    setUserType("")
    sessionStorage.clear()
  }

  useEffect(() => {
    console.log(`--------> APP: userStatus changed to ${userStatus}`);
    
  }, [userStatus, userType]);

//class App extends React.Component {
    return(
      <>
        <BrowserRouter>
          {/* -------------------- START LINKS TO NAVBAR ---------------------- */}
          <Navbar bg="light" expand="lg" fixed="top">

            <LinkContainer to="/">
                <Navbar.Brand>
                  <h2>&#10084;HappyBidding</h2>
                </Navbar.Brand>
            </LinkContainer>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                  
                  <LinkContainer to="/">
                      <Nav.Link className="navButtons">HOME</Nav.Link>
                  </LinkContainer>

                  {sessionStorage.getItem('userStatus') == null && 
                  <React.Fragment>
                      <LinkContainer to="/login">
                          <Nav.Link className="navButtons">Login</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to="/signup">
                          <Nav.Link className="navButtons">SignUp</Nav.Link>
                      </LinkContainer>
                  </React.Fragment>}
                  
                  {sessionStorage.getItem('userStatus') != null && 
                  <React.Fragment>
                      <LinkContainer to={{
                          pathname: '/profile',
                          state: {username:""}
                      }}>
                          <Nav.Link className="navButtons">Profile</Nav.Link>
                      </LinkContainer>

                      <LinkContainer to={{
                          pathname: '/synchAuction',
                          state: {userName: sessionStorage.getItem("userName")}
                      }}>
                          <Nav.Link className="navButtons">Synch Auction</Nav.Link>
                      </LinkContainer>

                      <LinkContainer to='/logout'>
                          <Nav.Link className="navButtons">Logout</Nav.Link>
                      </LinkContainer>
                  </React.Fragment>}
                
                </Nav>
            </Navbar.Collapse>
            {sessionStorage.getItem('userStatus') != null &&
              <p className="navButtons">Welcome {sessionStorage.getItem("userName")}</p>
            }
          </Navbar>
          <br/><br/><br/>
          {/* -------------------- END LINKS TO NAVBAR ---------------------- */}
          
          {/* -------------------- START ROUTES OF NAVBAR ------------------- */}
          <Switch>
            <Route exact path="/" component={HomePage} />　
            {/* <Route exact path="/login" component={Login} /> */}
            <Route exact path="/login">
                <Login setUserLoginStatus={getUserLoginStatus}/>
            </Route>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/synchAuction" component={SynchAuction}/>
            <Route exact path="/userauction" component={UserManageAuction} />
            <Route exact path="/recoveryAccount" component={RecoveryAccount} />
            <Route exact path="/recoveryCompleted" component={RecoveryCompleted} />
            <Route exact path="/createNewAuction" component={CreateNewAuction} />
            <Route exact path="/notifications" component={Notifications} />
            <Route exact path="/logout">
                <HomePage userStatus={true} setLogOut={setLogOut}/>
            </Route>
            
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
        {/* -------------------- END ROUTES OF NAVBAR ------------------- */}

        {/* ------------------------ START FOOTER ----------------------- */}
        <Jumbotron className='jumbotron-override bg-dark text-white' fluid>
          <Container>
            <h1>Happy Bidding</h1>
            <p>
              -- Be the change that you want to see in the world --
            </p>
            <p>&copy; Copyright 2021, HappyBidding</p>
          </Container>
        </Jumbotron>
        {/* ------------------------- END FOOTER ------------------------ */}
      </>
    );
}
 
export default App;