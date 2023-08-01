import { Navbar, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';

const CustomNavbar = () => {
    return (
        <Navbar bg="light" expand="lg" style={{ height: '10vh', width: '100%', paddingInline: '8vw', position: 'sticky', top: '0', zIndex: '100'}}>
            <Navbar.Brand as={Link} to="/" style={{ height: '100%' }} >
                <img src="/kneadly-logo.png" alt="Kneadly Logo" style={{ width: 'auto', height: '100%' }}/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/about">About</Nav.Link>
                    <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default CustomNavbar;