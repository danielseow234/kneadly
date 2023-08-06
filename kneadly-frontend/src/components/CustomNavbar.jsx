import { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuthUser, useSignOut } from 'react-auth-kit'
import Popup from './Popup';

const CustomNavbar = () => {
    const auth = useAuthUser();
    const signOut = useSignOut();
    const navigate = useNavigate();

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState();

    const handleClosePopup = () => {
        setShowPopup(false);
        setMessage('');
    };

    const navLinkStyle = {
        backgroundColor: 'lg',
        padding: '5px 15px',
        margin: '5px',
    };

    const handleLogout = async () => {
        setMessage('Logging out...');
        setShowPopup(true);
        await new Promise(resolve => setTimeout(resolve, 800));

        signOut();
        window.location.reload();
        navigate('/');
    };

    return (
        <Navbar
            bg="light"
            expand="lg"
            style={{
                height: '10vh',
                width: '100%',
                paddingInline: '8vw',
                position: 'sticky',
                top: '0',
                zIndex: '100',
                fontSize: '1.2rem',
            }}
        >
            {showPopup && (
                <Popup
                    show={showPopup}
                    handleClose={handleClosePopup}
                    popupMessage={message}
                />
            )}
            <Navbar.Brand as={Link} to="/" style={{ height: '100%' }}>
                <img
                    src="/kneadly-logo.png"
                    alt="Kneadly Logo"
                    style={{ width: 'auto', height: '100%' }}
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {auth()
                        ? auth().role === 'CLIENT'
                            ? <>
                                <Nav.Link as={Link} to="/" style={navLinkStyle}>
                                    Home
                                </Nav.Link>
                                <Nav.Link as={Link} to="/appointment/client" style={navLinkStyle}>
                                    Appointments
                                </Nav.Link>
                                <Nav.Link as={Link} to="/about" style={navLinkStyle}>
                                    About
                                </Nav.Link>
                                <Nav.Link as={Link} to="/therapists" style={navLinkStyle}>
                                    Our therapists
                                </Nav.Link>
                                <Nav.Link as={Link} to="/promotion/receive" style={navLinkStyle}>
                                    Promotions
                                </Nav.Link>
                            </>
                            : <>
                                <Nav.Link as={Link} to="/appointment/therapist" style={navLinkStyle}>
                                    Appointments
                                </Nav.Link>
                                <Nav.Link as={Link} to="/promotion/send" style={navLinkStyle}>
                                    Newsletter
                                </Nav.Link>
                            </>
                        : <>
                            <Nav.Link as={Link} to="/" style={navLinkStyle}>
                                Home
                            </Nav.Link>
                            <Nav.Link as={Link} to="/about" style={navLinkStyle}>
                                About
                            </Nav.Link>
                            <Nav.Link as={Link} to="/therapists" style={navLinkStyle}>
                                Our therapists
                            </Nav.Link>
                            <Nav.Link as={Link} to="/promotion/receive" style={navLinkStyle}>
                                Promotions
                            </Nav.Link>
                        </>
                    }
                </Nav>
                <Nav className="ms-auto">
                    {!auth() && <>
                        <Nav.Link as={Link} to="/login" style={navLinkStyle}>
                            Login
                        </Nav.Link>
                        <Nav.Link as={Link} to="/register" style={navLinkStyle}>
                            Register
                        </Nav.Link>
                    </>}
                    {auth() && <>
                        <Nav.Link as={Link} to="/profile" style={navLinkStyle}>
                            Profile
                        </Nav.Link>
                        <Nav.Link style={navLinkStyle} onClick={handleLogout}>
                            Logout
                        </Nav.Link>
                    </>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default CustomNavbar;