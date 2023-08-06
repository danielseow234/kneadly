import { Container, Row, Col, Button, Form } from 'react-bootstrap';

const SendPromotion = () => {
    return (
        <Container style={{ marginTop: '10vh' }}>
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="mb-4">Promotions</h2>
                    <p>Send email to all subscribed users!</p>
                    <Form>
                        <Form.Group>
                            <Form.Label htmlFor="email">Subject</Form.Label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                style={{ borderRadius: '5px', marginBottom: '10px' }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="message">Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                id="message"
                                rows={4}
                                style={{ borderRadius: '5px', marginBottom: '10px' }}
                            />
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

export default SendPromotion;