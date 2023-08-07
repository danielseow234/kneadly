import { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import Popup from './Popup';

const NewsletterGet = () => {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState();
    const [email, setEmail] = useState("");

    const handleClosePopup = () => {
        setShowPopup(false);
        setMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/newsletter/subscribe', {
                email: email
            });
            if (response.data.statusCode === "OK") {
                setMessage("Email received!");
                setShowPopup(true);

                await new Promise(resolve => setTimeout(resolve, 800));
                navigate('/');
            } else {
                setMessage("Error while sending email address.");
            }
        } catch (err) {
            setMessage("An error occured while submitting subscription.");
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
                    <p>Enter your email to receive newsletters!</p>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor="email">Email</Form.Label>
                            <input
                                required
                                type="email"
                                id="email"
                                className="form-control"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
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

export default NewsletterGet;