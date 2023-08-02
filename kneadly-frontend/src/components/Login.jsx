import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from '../api/axios';

const LOGIN_URL = '/login';

const handleSubmit = async (e) => {
    e.preventDefault();
    let response
    try {
        response = await axios.get(LOGIN_URL);
    } catch (err) {
        console.log(err);
    }
    console.log(response.data);
};

const Login = () => {
    return (
        <Container className="mt-5">
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
                <Col md={8} className="align-items-center" style={{ backgroundColor: '#f5f5f5', borderRadius: '5px', padding: '40px' }}>
                    <div className="form-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '30px', justifyContent: 'space-around', height: '100%' }}>
                        <div>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                            <br />
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                        </div>
                        <div>
                            <Button variant="primary" type="submit" className="w-100">
                                Login
                            </Button>
                            <p className="mt-3 text-center">
                                Don't have an account? <Link to="/register">Sign up!</Link>
                            </p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
