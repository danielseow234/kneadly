import { Container, Row, Col, Header, Image } from "react-bootstrap";

const About = () => {
    return (
        <Container>
            <h1>About Us</h1>
            <Row>
                <Col>
                    <Image
                        src="https://via.placeholder.com/150x150"
                        alt="About Us"
                        style={{ width: '100%', height: '70vh', objectFit: 'cover' }}
                    />
                </Col>
                <Col>
                    <h2>Kneadly</h2>
                    <p>
                        Kneadly is a massage therapy company that provides the ultimate massage experience. We offer a variety of massages to suit your needs, whether you are looking for a relaxing massage to relieve stress or a therapeutic massage to improve your health.
                    </p>
                    <p>
                        We are dedicated to providing our clients with the best possible massage experience. Our massage therapists are highly trained and experienced, and they use only the highest quality massage oils and lotions. We also offer a variety of massage packages to fit your budget.
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

export default About;
