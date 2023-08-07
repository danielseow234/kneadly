import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import axios from '../api/axios';
import Popup from './Popup';

const NewsletterSend = () => {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState();
    const [topic, setTopic] = useState("");
    const [body, setBody] = useState("");

    const handleClosePopup = () => {
        setShowPopup(false);
        setMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/newsletter/send', {
                topic: topic,
                message: body
            });
            if (response.data.statusCode === "OK") {
                setMessage("Newsletter sent successfully!");
                setShowPopup(true);

                await new Promise(resolve => setTimeout(resolve, 800));
                navigate('/');
            } else {
                setMessage("Error while sending newsletter.");
            }
        } catch (err) {
            setMessage("An error occured while making newsletter.");
        }
        setShowPopup(true);
    };

    return (
        <Container style={{ marginTop: '10vh' }}>
            {showPopup && (
                <Popup
                    show={showPopup}
                    handleClose={handleClosePopup}
                    popupMessage={message}
                />
            )}
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="mb-4">Newsletters</h2>
                    <p>Send email to all subscribed users!</p>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor="email">Subject</Form.Label>
                            <input
                                required
                                type="email"
                                id="email"
                                className="form-control"
                                value={topic}
                                onChange={e => setTopic(e.target.value)}
                                style={{ borderRadius: '5px', marginBottom: '10px' }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="message">Message</Form.Label>
                            <Form.Control
                                required
                                as="textarea"
                                id="message"
                                rows={4}
                                value={body}
                                onChange={e => setBody(e.target.value)}
                                style={{ borderRadius: '5px', marginBottom: '10px' }}
                            />
                        </Form.Group>
                        <Button type='submit' variant="primary" style={{ width: '100%', borderRadius: '5px' }}>
                            Send
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default NewsletterSend;