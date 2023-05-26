import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation } from "react-router-dom";
import "./styles.css";

export default function MenuBar() {
  let location = useLocation();
  const isHomePage = location.pathname === '/';

  if (isHomePage) {
    return null; // Return null to not render the navigation bar on the home page
  }
  return (
    <>
    <Navbar fixed='top' className='nvbar'>
    <Container>
      <Navbar.Brand className='nvbar-logo' href="/labs">ZerinLabs</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link className='nvbar-link' href="/home">Home</Nav.Link>
        <Nav.Link className='nvbar-link' href="/medications">Medications</Nav.Link>
        <Nav.Link className='nvbar-link' href="/user">Account</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
  </>
  );
}