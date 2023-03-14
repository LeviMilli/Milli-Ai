import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.css'

import NavDropdown from 'react-bootstrap/NavDropdown';
import { useEffect, useState, useContext } from "react";


function CollapsibleExample() {

const [user, setUser] = useState(true);

function  handleLogOut(){
    console.log("hey")
}

  return (
    <Navbar id='blackNav' collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand id='mainHover' style={{"color" : "#f7931a"}} href="/">Milli Ai</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">

          </Nav>
          {user ? (     
          <Nav className='links'>
            <Nav.Link style={{"color" : "#90EE90"}} href="/">ChatBot</Nav.Link>

          </Nav>
            ) : (          
          <Nav>
            <Nav.Link style={{"color" : "#90EE90"}} href="/signin">Login</Nav.Link>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
            <Nav.Link href="/sentiment">Market Sentiment</Nav.Link>
            <Nav.Link href="/news">News</Nav.Link>

          </Nav>
          ) }

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;