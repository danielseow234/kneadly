import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Container, Row, Col, Button } from 'react-bootstrap';
import axios from '../api/axios';
import Popup from './Popup';

const Therapists = () => {
    const [therapists, setTherapists] = useState();
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState();

    const handleClosePopup = () => {
        setShowPopup(false);
        setMessage('');
    };

    const handleShowMore = (email, number, gender) => {
        setMessage(
            <>
                <p><b>Email: </b>{email}</p>
                <p><b>Number: </b> {number}</p>
                <p><b>Gender: </b> {gender}</p>
            </>
        )
        setShowPopup(true);
    };

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
        <Container fluid>
            {showPopup && (
                <Popup
                    show={showPopup}
                    handleClose={handleClosePopup}
                    popupMessage={message}
                />
            )}
            <Row className="justify-content-center align-items-center" style={{ paddingTop: '5vh' }}>
                <Col xs={12} md={10} className="">
                    <div className="mt-3 text-center">
                        <h2>Our therapists</h2>
                    </div>
                    <Carousel fade>
                        {therapists?.map((therapist, index) => (
                            <Carousel.Item className="align-items-center" key={index} style={{ display: 'flex', justifyContent: 'center', height: '70vh' }}>
                                <Col md={5} style={{ padding: '2rem' }}>
                                    <img
                                        className="d-block w-100"
                                        style={{
                                            height: '50vh',
                                            width: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '5px',
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                        }}
                                        src={therapist.massageTherapistProfilePicture}
                                        alt="Therapist Profile"
                                    />
                                </Col>
                                <Col md={5} style={{ padding: '2rem' }}>
                                    <h4>{therapist.massageTherapistUser.userName} ★ {therapist.massageTherapistRating} ({therapist.massageTherapistNumberOfRatings})</h4>
                                    <p>{therapist.massageTherapistDescription}</p>
                                    <p>{therapist.massageTherapistStreetAddress}</p>
                                    <p>{therapist.massageTherapistCity}, {therapist.massageTherapistState}, {therapist.massageTherapistZipCode}</p>
                                    <Button variant="primary" style={{ marginRight: '1rem' }} onClick={() => handleShowMore(therapist.massageTherapistUser.userEmail, therapist.massageTherapistUser.userPhoneNumber, therapist.massageTherapistUser.userGender)}>More info</Button>
                                    <Link to="/appointment/edit">
                                        <Button variant="success">Book Now!</Button>
                                    </Link>
                                </Col>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Col>
            </Row>
        </Container >
    );
}

export default Therapists;