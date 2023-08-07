import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import Stars from './Stars';
import axios from '../api/axios';

const Review = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // const appointmentId = location.state?.appointmentId;
    const appointment = {
        "id": 9,
        "date": "01/08/2025",
        "time": "10:00",
        "clientUserId": 2,
        "therapistUserId": 1,
        "therapistUserName": null,
        "isConfirmed": false,
        "feedbackMessage": null,
        "feedbackRating": null,
        "feedbackDate": null
    }

    const [therapists, setAllTherapists] = useState([]);
    const [description, setDescription] = useState();
    const [rating, setRating] = useState();
    const [feedbackDate, setFeed] = useState();

    const [message, setMessage] = useState();
    const [showPopup, setShowPopup] = useState(false);

    const getTherapistByUserId = (therapistId) => {
        const therapist = therapists?.find((therapist) => therapist.massageTherapistUser.userId === therapistId);
        return therapist ? therapist.massageTherapistUser.userName : null;
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({
            description: description,
            rating: rating,
            appointmentId: appointment.id
        })
        //     try {
        //         const response = await axios.post('/appointment/feedback' + appointmentId, {
        //             description: description,
        //             rating: rating,
        //             appointmentId: appointmentId
        //         });
        //         if (response.data.statusCode === "OK") {
        //             setMessage("Appointment updated successfully.");
        //             setShowPopup(true);

        //             await new Promise(resolve => setTimeout(resolve, 800));
        //             navigate('/appointment/client');
        //         } else {
        //             setMessage("Error updating appointment.");
        //         }
        //     } catch (err) {
        //         setMessage("An error occured while making appointment.");
        //     }
        //     setShowPopup(true);
    };

    useEffect(() => {
        axios.get('/massage-therapist/get-all')
            .then(response => {
                setAllTherapists(response.data.result);
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    return (
        <Container style={{ marginTop: '10vh' }}>
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
                        <strong>Therapist:</strong> {getTherapistByUserId(appointment.therapistUserId)}
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
}

export default Review;
