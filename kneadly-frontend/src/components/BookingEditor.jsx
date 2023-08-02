import { Form, Button, Container, Row, Col } from "react-bootstrap";

// need to get a full list of all massage therapists

const BookingEditor = () => {
    return (
        <Container>
            <Row md={4} style={{ height: "60vh" }}>
                <Col md={6}>
                    <Form>
                        <Form.Group>
                            <Form.Label htmlFor="massageTherapist">Massage Therapist</Form.Label>
                            <Form.Control
                                type="dropdown"
                                name="massageTherapist"
                                id="massageTherapist"
                            // value={this.state.massageTherapist}
                            // onChange={(e) => this.setState({ massageTherapist: e.target.value })}
                            />
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Label htmlFor="date">Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                id="date"
                            // value={this.state.date}
                            // onChange={(e) => this.setState({ date: e.target.value })}
                            />
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Label htmlFor="time">Time</Form.Label>
                            <Form.Control
                                type="time"
                                name="time"
                                id="time"
                            // value={this.state.time}
                            // onChange={(e) => this.setState({ time: e.target.value })}
                            />
                        </Form.Group>
                        <br />
                        <Button type="submit">Book Massage</Button>
                    </Form>
                </Col>
                <Col md={6}>
                    {/* Add any content for the second column */}
                </Col>
            </Row>
        </Container>
    );
}

export default BookingEditor;
