import { useState } from "react";
import { useSignIn } from "react-auth-kit";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Popup from './Popup';
import axios from '../api/axios';

const Login = () => {
    const signIn = useSignIn();
    const navigate = useNavigate();

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState();

    const handleClosePopup = () => {
        setShowPopup(false);
        setMessage('');
    };

    const [emailAddress, setEmailAddress] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response1 = await axios.post('/user/login', { emailAddress: emailAddress, password: password });
            if (response1.data.statusCode === "OK") {
                const response2 = await axios.get('/user/' + response1.data.result);
                if (response2.data.statusCode === "OK") {
                    signIn({
                        token: response1.data.result,
                        expiresIn: 3600,
                        authState: {
                            id: response1.data.result,
                            role: response2.data.result.role
                        }
                    });
                    setMessage("Login Successful!");
                    setShowPopup(true);

                    await new Promise(resolve => setTimeout(resolve, 900));
                    navigate('/');
                } else {
                    setMessage(response2.data.message);
                }
            } else {
                setMessage(response1.data.message);
            }
        } catch (err) {
            console.log(err);
            setMessage("Error signing in.");
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
            <h2 className="mb-4">Login</h2>
            <Row md={4} style={{ height: "60vh" }}>
                <Col md={4} style={{ height: "100%" }}>
                    <img
                        src="/massage-login-2.jpg"
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
                <Col md={8} className="align-items-center justify-content-center" style={{ backgroundColor: '#f5f5f5', borderRadius: '5px', padding: '40px' }}>
                    <Col md={8} className="form-wrapper  mx-auto" style={{ display: 'flex', flexDirection: 'column', gap: '30px', justifyContent: 'space-around', height: '100%' }}>
                        <Form onSubmit={handleSubmit}>
                            <div>
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
                            </div>
                            <div>
                                <Button variant="primary" type="submit" className="w-100">
                                    Login
                                </Button>
                                <p className="mt-3 text-center">
                                    Don't have an account? <Link to="/register">Sign up!</Link>
                                </p>
                            </div>
                        </Form>
                    </Col>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
