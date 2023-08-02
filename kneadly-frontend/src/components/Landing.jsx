import { useRef } from 'react'
import { useAuthUser } from 'react-auth-kit'
import { Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import About from './About';
import Contact from './Contact';

const Landing = () => {
    const ref = useRef(null);

    const handleScroll = () => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section>
            <div style={{ height: '90vh' }}>
                <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                    <Col style={{
                        padding: '2rem',
                        textAlign: 'justify',
                    }}>
                        <h1>Welcome to Kneadly!</h1>
                        <p>We are dedicated to providing you with the ultimate massage experience. Whether you are looking for a relaxing massage to relieve stress or a therapeutic massage to improve your health, we have the perfect massage for you.</p>
                        <p>We look forward to seeing you soon!</p>
                        <div className="d-flex justify-content-end">
                            <Link to="/about">
                                <Button variant="info">About us</Button>
                            </Link>
                            <Link to="/bookings">
                                <Button variant="primary" style={{ marginLeft: '1rem' }}>Book Now</Button>
                            </Link>
                        </div>
                    </Col>
                    <Col style={{
                        height: '100%',
                        padding: '2rem',
                    }}>
                        <img
                            src="/massage-landing-2.jpg"
                            alt="Massage"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '5px'
                            }}
                        />
                    </Col>
                </div>
            </div>
        </section>
    );
}

export default Landing