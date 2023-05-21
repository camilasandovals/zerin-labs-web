import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import "./styles.css";

export default function MenuBar() {
  return (
    <>
    <Navbar className='navbar'>
    <Container>
      <Navbar.Brand className='navbar-logo' href="/">ZerinLabs</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link className='navbar-link' href="/home">Home</Nav.Link>
        <Nav.Link className='navbar-link' href="/medications">Medications</Nav.Link>
        <Nav.Link className='navbar-link' href="/user">Account</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
  </>
  );
}