import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import Stars from './Stars';
import Popup from './Popup';
import axios from '../api/axios';

const Review = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const appointment = location.state?.appointment;

    const [therapists, setTherapists] = useState([]);
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(0); // Initialize rating to 0
    const [message, setMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const getTherapistName = (therapistId) => {
        const therapist = therapists.find(t => t.massageTherapistUser.userId === therapistId);
        return therapist ? therapist.massageTherapistUser.userName : null;
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/appointment/feedback', {
                description,
                rating,
                appointmentId: appointment.id
            });

            if (response.data.statusCode === 'OK') {
                setMessage('Appointment reviewed successfully.');
                setShowPopup(true);

                await new Promise(resolve => setTimeout(resolve, 800));
                navigate('/appointment/client');
            } else {
                setMessage('Error reviewing appointment.');
            }
        } catch (err) {
            setMessage('An error occurred while reviewing the appointment.');
        }
        setShowPopup(true);
    };

    useEffect(() => {
        axios.get('/massage-therapist/get-all')
            .then(response => {
                setTherapists(response.data.result);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

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
                    <h2 className="mb-4">Review</h2>
                    <p>Please write a review for your appointment!</p>
                    <div>
                        <strong>Date:</strong> {appointment.date}
                    </div>
                    <div>
                        <strong>Time:</strong> {appointment.time}
                    </div>
                    <div>
                        <strong>Therapist:</strong> {getTherapistName(appointment.therapistUserId)}
                    </div>
                    <br />
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor="message">Review message</Form.Label>
                            <Form.Control
                                as="textarea"
                                id="message"
                                rows={4}
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                style={{ borderRadius: '5px', marginBottom: '10px' }}
                            />
                        </Form.Group>
                        <Stars
                            rating={rating}
                            setRating={setRating}
                        />
                        <br />
                        <Button type="submit" variant="primary" style={{ width: '100%', borderRadius: '5px' }}>
                            Send
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Review;
