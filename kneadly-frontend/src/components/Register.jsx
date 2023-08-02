import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from '../api/axios';

const Register = () => {
    return (
        <Container className="mt-5">
            <h2 className="mb-4">Register</h2>
            <Form>
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
                    <Col md={8} className="align-items-center" style={{ backgroundColor: '#f5f5f5', borderRadius: '5px', padding: '40px', height: "100%" }}>
                        <div className="form-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '30px', justifyContent: 'space-around', height: '100%' }}>
                            <div style={{ display: 'flex', gap: '30px' }}>
                                <Col md={5}>
                                    <Form.Group controlId="formBasicName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter your name" />
                                    </Form.Group>
                                    <br />
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" />
                                    </Form.Group>
                                    <br />
                                    <Form.Group controlId="formBasicPhone">
                                        <Form.Label>Phone number</Form.Label>
                                        <Form.Control type="tel" placeholder="Enter phone number" />
                                    </Form.Group>
                                    <br />
                                    <Form.Group controlId="formBasicGender">
                                        <Form.Label>Gender</Form.Label>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <Form.Check type="radio" label="Male" name="gender" value="male" id="maleRadio" />
                                            <Form.Check type="radio" label="Female" name="gender" value="female" id="femaleRadio" />
                                            <Form.Check type="radio" label="Other" name="gender" value="other" id="otherRadio" />
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col md={5}>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" />
                                    </Form.Group>
                                    <br />
                                    <Form.Group controlId="formBasicConfirmPassword">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control type="password" placeholder="Confirm Password" />
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
