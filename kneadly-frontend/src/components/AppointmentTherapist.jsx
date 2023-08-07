import React, { useState, useEffect } from "react";
import { Container, Col, Row, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { useAuthUser } from 'react-auth-kit'
import axios from '../api/axios';
import Popup from './Popup';

const AppointmentTherapist = () => {
    const auth = useAuthUser();

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState();

    const handleClosePopup = () => {
        setShowPopup(false);
        setMessage('');
    };

    const [confirmed, setConfirmed] = useState([]);
    const [unconfirmed, setUnconfirmed] = useState([]);

    const convertTo12HourFormat = (timeString) => {
        const [hours, minutes] = timeString?.split(':');
        let period = 'AM';

        let hour = parseInt(hours, 10);
        if (hour === 0) {
            hour = 12;
        } else if (hour === 12) {
            period = 'PM';
        } else if (hour > 12) {
            hour -= 12;
            period = 'PM';
        }

        const formattedTime = `${hour}:${minutes} ${period}`;
        return formattedTime;
    };

    const handleConfirmAppointment = async (id) => {
        const response = await axios.post('/appointment/confirm', {
            id: id,
            therapistUserId: auth().id,
            receiptHandle: "string"
        });
        if (response.data.statusCode === "OK") {
            setMessage("Appointment successfully confirmed.");
            setShowPopup(true);

            await new Promise(resolve => setTimeout(resolve, 900));
            window.location.reload();
        } else {
            setMessage("Unable to confirm appointment.");
        }
    };

    const handleDeleteAppointment = async (id) => {
        const response = await axios.delete('/appointment/' + id);
        if (response.data.statusCode === "OK") {
            setMessage("Appointment successfully rejected.");
            setShowPopup(true);

            await new Promise(resolve => setTimeout(resolve, 900));
            window.location.reload();
        } else {
            setMessage("Unable to reject appointment.");
        }
        setShowPopup(true);
    };

    const handleShowReview = async (id) => {
        const response = await axios.get('/appointment/' + id);
        if (response.data.statusCode === "OK") {
            console.log(response.data.result)
            setMessage(
                response.data.result.feedbackDate
                    ? <div>
                        <p>
                            <strong>Feedback Message:</strong> {response.data.result.feedbackMessage}
                        </p>
                        <p>
                            <strong>Feedback Rating:</strong> {response.data.result.feedbackRating}
                        </p>
                        <p>
                            <strong>Feedback Date:</strong> {response.data.result.feedbackDate}
                        </p>
                    </div>
                    : <>There is no review yet!</>
            );
        } else {
            setMessage("Unable to get review.");
        }
        setShowPopup(true);
    }

    useEffect(() => {
        axios.get('/appointment/unconfirmed/therapist/' + auth()?.id)
            .then(response => {
                setUnconfirmed(response.data.result)
            })
            .catch(error => {
                console.log(error);
            });
        axios.get('/appointment/confirmed/therapist/' + auth()?.id)
            .then(response => {
                setConfirmed(response.data.result)
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
            <Row style={{ justifyContent: 'center' }}>
                <Col md={8}>
                    <h2 className="mb-4">My appointments</h2>
                    <h3 style={{ fontSize: '1.5rem', color: 'red' }}>Unconfirmed</h3>
                    <ListGroup>
                        {unconfirmed.length > 0
                            ? unconfirmed?.map((item, index) => (
                                <ListGroupItem key={index} style={{ height: '5rem', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>Client ID: {item.clientUserId}</div>
                                    <div>
                                        <strong>{item.client}</strong>
                                        <p style={{ margin: '0' }}>{item.date} {convertTo12HourFormat(item.time)}</p>
                                    </div>
                                    <div className="d-flex justify-content-end" style={{ height: '2.5rem' }}>
                                        <Button variant="primary" size="md" style={{ marginRight: '0.5rem' }} onClick={() => handleConfirmAppointment(item.id)}>Confirm</Button>
                                        <Button variant="danger" size="md" onClick={() => handleDeleteAppointment(item.id)}>Reject</Button>
                                    </div>
                                </ListGroupItem>
                            ))
                            : <ListGroupItem style={{
                                height: '5rem',
                                padding: '1rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                None
                            </ListGroupItem>
                        }
                    </ListGroup>
                    <br />
                    <h3 style={{ fontSize: '1.5rem', color: 'green' }}>Confirmed</h3>
                    <ListGroup>
                        {confirmed.length > 0
                            ? confirmed.map((item, index) => (
                                <ListGroupItem key={index} style={{ height: '5rem', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <strong>{item.clientUserId}</strong>
                                        <p style={{ margin: '0' }}>{item.date} {item.time}</p>
                                    </div>
                                    <div className="d-flex justify-content-end" style={{ height: '2.5rem' }}>
                                        <Button variant="primary" size="md" style={{ marginRight: '0.5rem' }} onClick={() => handleShowReview(item.id)}>View review</Button>
                                    </div>
                                </ListGroupItem>
                            ))
                            : <ListGroupItem style={{
                                height: '5rem',
                                padding: '1rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                None
                            </ListGroupItem>
                        }
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}

export default AppointmentTherapist;
