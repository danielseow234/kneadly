import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Popup from './Popup';
import axios from '../api/axios';

const Register = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState();

    const handleClosePopup = () => {
        setShowPopup(false);
        setMessage('');
    };
    
    const [fullName, setFullName] = useState();
    const [emailAddress, setEmailAddress] = useState();
    const [password, setPassword] = useState();
    const [cpassword, setCPassword] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [gender, setGender] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.match(passwordRegex)) {
            if (password === cpassword) {
                let response;
                try {
                    response = await axios.post('/user/register', {
                        fullName: fullName,
                        emailAddress: emailAddress,
                        password: password,
                        phoneNumber: phoneNumber,
                        gender: gender,
                    });
                    if (response.data.statusCode === "OK") {
                        setMessage("Registration successful.");
                    } else {
                        setMessage(response.data.message);
                    }
                } catch (err) {
                    console.log('Error occurred:', err);
                }
            } else {
                setMessage("Confirm password does not match the password.");
            }
        } else {
            setMessage("Password must be at least 8 characters long and contain at least one letter and one digit.");
        }
        setShowPopup(true);
    };

    return (
        <Container className="mt-5">
            {showPopup && (
                <Popup
                    show={showPopup}
                    handleClose={handleClosePopup}
                    popupMessage={message}
                />
            )}
            <h2 className="mb-4">Register</h2>
            <Form onSubmit={handleSubmit}>
                <Row md={4} style={{ height: "60vh" }}>
                    <Col md={4} style={{ height: "100%" }}>
                        <img
                            src="/massage-register.jpg"
                            alt="Massage"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '5px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            }}
                        />
                    </Col>
                    <Col md={8} className="align-items-center" style={{ backgroundColor: '#f5f5f5', borderRadius: '5px', padding: '6rem', height: "100%" }}>
                        <div className="form-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '30px', justifyContent: 'space-around', height: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Col md={5}>
                                    <Form.Group controlId="formBasicName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter your name"
                                            value={fullName}
                                            onChange={e => setFullName(e.target.value)}
                                        />
                                    </Form.Group>
                                    <br />
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            value={emailAddress}
                                            onChange={e => setEmailAddress(e.target.value)}
                                        />
                                    </Form.Group>
                                    <br />
                                    <Form.Group controlId="formBasicPhone">
                                        <Form.Label>Phone number</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            placeholder="Enter phone number"
                                            value={phoneNumber}
                                            onChange={e => setPhoneNumber(e.target.value)}
                                        />
                                    </Form.Group>
                                    <br />
                                    <Form.Group controlId="formBasicGender">
                                        <Form.Label>Gender</Form.Label>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <Form.Check
                                                type="radio"
                                                label="Male"
                                                name="gender"
                                                value="MALE"
                                                id="maleRadio"
                                                checked={gender === 'MALE'}
                                                onChange={(e) => setGender(e.target.value)}
                                                style={{ marginRight: '1rem' }}
                                            />
                                            <Form.Check
                                                type="radio"
                                                label="Female"
                                                name="gender"
                                                value="FEMALE"
                                                id="femaleRadio"
                                                checked={gender === 'FEMALE'}
                                                onChange={(e) => setGender(e.target.value)}
                                            />
                                        </div>
                                    </Form.Group>
                                    <br />
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                    </Form.Group>
                                    <br />
                                    <Form.Group controlId="formBasicConfirmPassword">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Confirm Password"
                                            value={cpassword}
                                            onChange={e => setCPassword(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </div>
                            <div>
                                <Button variant="primary" type="submit" className="w-100">
                                    Register
                                </Button>
                                <p className="mt-3 text-center">
                                    Already have an account? <Link to="/login">Sign in!</Link>
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default Register;
