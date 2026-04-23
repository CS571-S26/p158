import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import loginStatusContext from '../loginStatusContext';
import logo from '../assets/POS Logo3.svg';

function AppNavbar() {
  const loginStatus = useContext(loginStatusContext);

  return (
    <Navbar bg="light" variant="light" className="border-bottom border-danger">
      <Container>
        <Navbar.Brand as={NavLink} to="/listings">
          <img
            src={logo}
            alt="Part Out Shark"
            style={{ height: 60, objectFit: 'contain' }}
          />
        </Navbar.Brand>

        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/listings">Browse Listings</Nav.Link>
          <Nav.Link as={NavLink} to="/mylistings">My Listings</Nav.Link>
          <Nav.Link as={NavLink} to="/savedlistings">Saved Listings</Nav.Link>
          <Nav.Link as={NavLink} to="/about">About</Nav.Link>
        </Nav>
        <Nav>
          {loginStatus?.user ? (
            <>
              <Nav.Link as={NavLink} to="/accountpage">Account</Nav.Link>
              <Nav.Link onClick={() => loginStatus.setUser(null)}>Log Out</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={NavLink} to="/login">Log In</Nav.Link>
              <Nav.Link as={NavLink} to="/register">Sign Up</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;