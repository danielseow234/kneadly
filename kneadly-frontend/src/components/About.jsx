import { Container, Row, Col, Image } from "react-bootstrap";

const About = () => {
    return (
        <Container style={{ marginTop: '10vh' }}>
            <Row>
                <Col>
                    <Image
                        src="/massage-about.jpg"
                        alt="About Us"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '5px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    />
                </Col>
                <Col className="d-flex align-items-center" style={{ flexDirection: 'row' }}>
                    <div style={{ marginLeft: '1rem', paddingBottom: '15vh' }}>
                        <h2>Kneadly</h2>
                        <p>
                            Kneadly is a massage therapy company that provides the ultimate massage experience. We offer a variety of massages to suit your needs, whether you are looking for a relaxing massage to relieve stress or a therapeutic massage to improve your health.
                        </p>
                        <p>
                            We are dedicated to providing our clients with the best possible massage experience. Our massage therapists are highly trained and experienced, and they use only the highest quality massage oils and lotions. We also offer a variety of massage packages to fit your budget.
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default About;
