import { Container, Row, Col, Button, Form } from 'react-bootstrap';

const Promotion = () => {
    return (
        <Container style={{ marginTop: '10vh' }}>
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="mb-4">Promotions</h2>
                    <p>Enter your email to be notified of promotions!</p>
                    <Form>
                        <Form.Group>
                            <Form.Label htmlFor="email">Email</Form.Label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
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

export default Promotion;