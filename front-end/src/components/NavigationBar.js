import React from 'react';   
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav } from 'react-bootstrap';

const NavigationBar =()=>
{
    return(
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

                <React.Fragment>
                    <LinkContainer to="/login">
                        <Nav.Link>Login</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/signup">
                        <Nav.Link>SignUp</Nav.Link>
                    </LinkContainer>
                </React.Fragment>
                
                    <React.Fragment>
                    <LinkContainer to={{
                        pathname: '/profile',
                        state: {username:""}
                    }}>
                        <Nav.Link>Profile</Nav.Link>
                    </LinkContainer>
                </React.Fragment>
                
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        
    )
}

export default NavigationBar;