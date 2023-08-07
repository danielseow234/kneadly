import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthUser } from 'react-auth-kit'
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Popup from './Popup';
import axios from '../api/axios';

const Editor = () => {
    const auth = useAuthUser();
    const location = useLocation();
    const navigate = useNavigate();
    const appointment = location.state?.appointment;

    const convertDateFormat = (dateString) => {
        const parts = dateString?.split('/');
        if (parts?.length !== 3) {
            return null; // Invalid date format
        }

        const [day, month, year] = parts;
        const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        return formattedDate;
    };

    const generateTimeOptions = () => {
        const options = [];
        for (let hour = 9; hour <= 17; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                let period = 'AM';
                let hour12 = hour;

                if (hour === 12) {
                    period = 'PM';
                } else if (hour > 12) {
                    hour12 = hour - 12;
                    period = 'PM';
                }

                const timeValue = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
                const timeDisplay = `${String(hour12).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${period}`;
                options.push(
                    <option key={timeValue} value={timeValue}>
                        {timeDisplay}
                    </option>
                );
            }
        }
        return options;
    };

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState();

    const [id, setId] = useState(appointment?.id);
    const [date, setDate] = useState(convertDateFormat(appointment?.date));
    const [time, setTime] = useState(appointment?.time);
    const [therapist, setTherapist] = useState(appointment?.therapistUserId);
    const [allTherapists, setAllTherapists] = useState();

    const handleClosePopup = () => {
        setShowPopup(false);
        setMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!appointment) {
            try {
                const response = await axios.post('/appointment/create', {
                    date: date,
                    time: time,
                    clientUserId: auth().id,
                    therapistUserId: therapist,
                });
                if (response.data.statusCode === "OK") {
                    setMessage("Appointment made successfully.");
                    setShowPopup(true);

                    await new Promise(resolve => setTimeout(resolve, 800));
                    navigate('/appointment/client');
                } else {
                    setMessage("Error making appointment.");
                }
            } catch (err) {
                setMessage("An error occured while making appointment.");
            }
        } else {
            try {
                const response = await axios.put('/appointment/' + id, {
                    id: id,
                    date: date,
                    time: time,
                    clientUserId: auth().id,
                    therapistUserId: therapist,
                    therapistUserName: "",
                    isConfirmed: false,
                    feedbackMessage: "",
                    feedbackRating: 0,
                    feedbackDate: ""
                });
                if (response.data.statusCode === "OK") {
                    setMessage("Appointment updated successfully.");
                    setShowPopup(true);

                    await new Promise(resolve => setTimeout(resolve, 800));
                    navigate('/appointment/client');
                } else {
                    setMessage("Error updating appointment.");
                }
            } catch (err) {
                setMessage("An error occured while making appointment.");
            }
        }
        setShowPopup(true);
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
            {showPopup && (
                <Popup
                    show={showPopup}
                    handleClose={handleClosePopup}
                    popupMessage={message}
                />
            )}
            <Row className="justify-content-center">
                <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor="therapist">Massage Therapist</Form.Label>
                            <Form.Select
                                name="therapist"
                                id="therapist"
                                value={therapist}
                                required
                                onChange={e => setTherapist(e.target.value)}
                            >
                                <option value="test">Select a massage therapist</option>
                                {allTherapists?.map(
                                    therapist => <option key={therapist.massageTherapistUser.userId} value={therapist.massageTherapistUser.userId}>{therapist.massageTherapistUser.userName}</option>)
                                }
                            </Form.Select>
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Label htmlFor="date">Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                id="date"
                                required
                                value={date}
                                onChange={e => setDate(e.target.value)}
                            />
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Label htmlFor="time">Time</Form.Label>
                            <Form.Select
                                name="time"
                                id="time"
                                required
                                value={time}
                                onChange={e => setTime(e.target.value)}
                            >
                                <option value="">Select a time</option>
                                {generateTimeOptions()}
                            </Form.Select>
                        </Form.Group>
                        <br />
                        <Button type="submit">Book Massage</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Editor;
