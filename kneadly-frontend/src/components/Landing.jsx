import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuthUser } from 'react-auth-kit'

const Landing = () => {
    const auth = useAuthUser();

    return (
        <Container style={{ marginTop: '10vh' }}>
            <Row>
                <Col className="d-flex align-items-center">
                    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '15vh' }}>
                        {auth()
                            ? auth().role === 'CLIENT'
                                ? <>
                                    <h1>Welcome back to Kneadly!</h1>
                                    <p>We are dedicated to providing you with the ultimate massage experience. Whether you are looking for a relaxing massage to relieve stress or a therapeutic massage to improve your health, we have the perfect massage for you.</p>
                                    <p>We look forward to seeing you soon!</p>
                                    <div className="d-flex justify-content-end">
                                        <Link to="/appointment/client">
                                            <Button variant="primary" style={{ marginLeft: '1rem' }}>My appointments</Button>
                                        </Link>
                                    </div>
                                </>
                                : <>
                                    <h1>Welcome back to Kneadly!</h1>
                                    <p>As one of our licensed therapists, please ensure to provide customers with the best experience you have to offer!</p>
                                    <div className="d-flex justify-content-end">
                                        <Link to="/appointment/therapist">
                                            <Button variant="primary" style={{ marginLeft: '1rem' }}>My appointments</Button>
                                        </Link>
                                    </div>
                                </>
                            : <>
                                <h1>Welcome to Kneadly!</h1>
                                <p>We are dedicated to providing you with the ultimate massage experience. Whether you are looking for a relaxing massage to relieve stress or a therapeutic massage to improve your health, we have the perfect massage for you.</p>
                                <p>We look forward to seeing you soon!</p>
                                <div className="d-flex justify-content-end">
                                    <Link to="/about">
                                        <Button variant="info">About us</Button>
                                    </Link>
                                    <Link to="/login">
                                        <Button variant="primary" style={{ marginLeft: '1rem' }}>Book Now</Button>
                                    </Link>
                                </div>
                            </>
                        }
                    </div>
                </Col>
                <Col>
                    <Image
                        src="/massage-landing-2.jpg"
                        alt="Landing"
                        style={{ width: '100%', height: '70vh', objectFit: 'cover', borderRadius: '1rem' }}
                    />
                </Col>
            </Row>
        </Container >
    );
}

export default Landing