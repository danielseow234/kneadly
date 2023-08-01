import { useAuthUser } from 'react-auth-kit'
import { Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CustomNavbar from './CustomNavbar';

const Landing = () => {

    return (
        <section>
            <CustomNavbar />
            <div>
                <div style={{ height: '90vh' }}>
                    <div style={{ display: 'flex' }}>
                        <Col md={5}>
                            <h1>Welcome to Kneadly!</h1>
                            <p>We are dedicated to providing you with the ultimate massage experience. Whether you are looking for a relaxing massage to relieve stress or a therapeutic massage to improve your health, we have the perfect massage for you.

                                Our massage therapists are highly trained and experienced professionals who will tailor your massage to your individual needs. We offer a variety of massage styles, including Swedish massage, deep tissue massage, and hot stone massage. We also offer a variety of massage packages, so you can find the perfect package for your needs.

                                To book your massage, simply visit our website and select the massage type and package that you want. You can also book your massage by phone or email.

                                We look forward to seeing you soon!
                            </p>
                            <Link to="/bookings">bookings</Link>
                        </Col>
                        <Col md={5}>
                            test
                        </Col>
                    </div>
                </div>
                <div style={{ height: '90vh', backgroundColor: 'red' }}>
                    test
                </div>
            </div>
        </section>
    );
}

export default Landing