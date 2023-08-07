import React, { useState, useEffect } from "react";
import { Card, ListGroup, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { formatDateToString, formatTimeToString } from '../Handlers';
import Popup from './Popup';
import axios from '../api/axios';

const AppointmentItem = ({ appointment }) => {
    const [therapists, setTherapists] = useState();
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState();

    const handleClosePopup = () => {
        setShowPopup(false);
        setMessage('');
    };

    const [fixed, setFixed] = useState(appointment.isConfirmed);
    const navigate = useNavigate();

    const getUserNameByTherapistId = (therapistId) => {
        const therapist = therapists?.find((therapist) => therapist.massageTherapistUser.userId === therapistId);
        return therapist ? therapist.massageTherapistUser.userName : null;
    };

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

    const createDateFromArray = (dateArray) => {
        const year = dateArray[0];
        const month = dateArray[1];
        const day = dateArray[2];

        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedDay = day < 10 ? `0${day}` : day;

        const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
        return formattedDate;
    }

    const handleEditAppointment = () => {
        navigate('/appointment/edit', { state: { appointment: appointment } });
    };

    const handleReviewAppointment = () => {
        navigate('/review', { state: { appointment: appointment } });
    };

    const handleDeleteAppointment = async () => {
        const response = await axios.delete('/appointment/' + appointment.id);
        if (response.data.statusCode === "OK") {
            setMessage("Appointment successfully cancelled.");
            setShowPopup(true);

            await new Promise(resolve => setTimeout(resolve, 900));
            window.location.reload();
        } else {
            setMessage("Unable to cancel appointment.");
        }
        setShowPopup(true);
    };

    const handleShowReview = (appointment) => {
        setMessage(
            <div>
                <p>
                    <strong>Feedback Message:</strong> {appointment.feedbackMessage}
                </p>
                <p>
                    <strong>Feedback Rating:</strong> {appointment.feedbackRating}
                </p>
                <p>
                    <strong>Feedback Date:</strong> {createDateFromArray(appointment.feedbackDate)}
                </p>
            </div>
        );
        setShowPopup(true);
    }

    useEffect(() => {
        axios.get('/massage-therapist/get-all')
            .then(response => {
                setTherapists(response.data.result)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <Card style={{ marginBottom: '1rem' }}>
            {showPopup && (
                <Popup
                    show={showPopup}
                    handleClose={handleClosePopup}
                    popupMessage={message}
                />
            )}
            <Card.Header>Appointment ID: {appointment.id}</Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item>Therapist: {getUserNameByTherapistId(appointment.therapistUserId)}</ListGroup.Item>
                <ListGroup.Item>Date: {appointment.date}</ListGroup.Item>
                <ListGroup.Item>Time: {convertTo12HourFormat(appointment.time)}</ListGroup.Item>
            </ListGroup>
            <Card.Footer>
                {appointment.isConfirmed === false
                    ?
                    <>
                        <Button variant="primary" style={{ marginRight: '1rem' }} onClick={handleEditAppointment}>Edit</Button>
                        <Button variant="danger" onClick={handleDeleteAppointment}>Cancel</Button>
                    </>

                    : appointment.feedbackMessage
                        ? <>
                            <Button variant="primary" onClick={() => handleShowReview(appointment)}>View review</Button>
                        </>
                        : <>
                            <Button variant="primary" onClick={handleReviewAppointment}>Review</Button>
                        </>
                }
            </Card.Footer>
        </Card>
    );
};

export default AppointmentItem;
