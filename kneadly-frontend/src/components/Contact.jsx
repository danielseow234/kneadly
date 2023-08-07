import { Container, Row, Col, Button, Form } from 'react-bootstrap';

const Contact = () => {
    return (
        <Container style={{ marginTop: '10vh' }}>
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="mb-4">Contact Us</h2>
                    <Form>
                        <Form.Group>
                            <Form.Label htmlFor="name">Name</Form.Label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                style={{ borderRadius: '5px', marginBottom: '10px' }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="email">Email</Form.Label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                style={{ borderRadius: '5px', marginBottom: '10px' }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="message">Message</Form.Label>
                            <textarea
                                id="message"
                                rows="4"
                                className="form-control"
                                style={{ borderRadius: '5px', marginBottom: '10px' }}
                            ></textarea>
                        </Form.Group>
                        <Button variant="primary" style={{ width: '100%', borderRadius: '5px' }}>
                            Send
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Contact;