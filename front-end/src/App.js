import React from 'react'; //import react
import { useState, useEffect} from 'react'
//import react-router-dom to use BrowserRouter, route, switch to move page
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav } from 'react-bootstrap';


import Login from './login'; //import login.js 
import RecoveryAccount from './recoveryAccount'; //import RecoveryAccount.js 
import Signup from './signup';
import Profile from './profile';
import HomePage from './HomePage'
import UserManageAuction from './UserManageAuction'
import NotFound from './NotFound'
import SynchAuction from './synchAuction'
import 'bootstrap/dist/css/bootstrap.min.css';

function App (props){

  const [ userStatus, setUserStatus ] = useState(false);
  const [ userType, setUserType ] = useState("");
  const [ values, setValues ] = useState({});

  const getUserLoginStatus=(type, loginState)=>
  {
    setUserStatus(true)
    setUserType(type)
    setValues(loginState)
  }

  const setLogOut=()=>
  {
    setUserStatus(false)
    setUserType("")
  }

  useEffect(() => {
    console.log(`--------> APP: userStatus changed to ${userStatus}`);
    
  }, [userStatus, userType]);

//class App extends React.Component {
    return(
      <>
        <BrowserRouter>
          {/* -------------------- START LINKS TO NAVBAR ---------------------- */}
          <Navbar bg="light" expand="lg">
            <LinkContainer to="/">
                <Navbar.Brand>&#10084;HappyBidding</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                
                    <LinkContainer to="/">
                        <Nav.Link>HOME</Nav.Link>
                    </LinkContainer>

                {!userStatus && <React.Fragment>
                    <LinkContainer to="/login">
                        <Nav.Link>Login</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/signup">
                        <Nav.Link>SignUp</Nav.Link>
                    </LinkContainer>
                </React.Fragment>}
                
                {userStatus && <React.Fragment>
                    <LinkContainer to={{
                        pathname: '/profile',
                        state: {username:""}
                    }}>
                        <Nav.Link>Profile</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/logout'>
                        <Nav.Link>Logout</Nav.Link>
                    </LinkContainer>
                </React.Fragment>}
                
                </Nav>
            </Navbar.Collapse>
          </Navbar>
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
            <Route exact path="/logout">
                <HomePage userStatus={true} setLogOut={setLogOut}/>
            </Route>
            
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
        {/* -------------------- END ROUTES OF NAVBAR ------------------- */}
      </>
    );
}
 
export default App;