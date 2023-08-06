import { useState, useEffect } from 'react';
import { useAuthUser } from 'react-auth-kit';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import axios from '../api/axios';
import Popup from './Popup';

const Profile = () => {
    const auth = useAuthUser();

    const [isEditing, setIsEditing] = useState();

    const [id, setId] = useState();
    const [fullName, setFullName] = useState();
    const [emailAddress, setEmailAddress] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [gender, setGender] = useState();
    const [role, setRole] = useState();

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState();

    const handleClosePopup = () => {
        setShowPopup(false);
        setMessage('');
    };

    useEffect(() => {
        axios.get('/user/' + auth().id)
            .then(response => {
                setId(response.data.result.id);
                setFullName(response.data.result.fullName);
                setEmailAddress(response.data.result.emailAddress);
                setPhoneNumber(response.data.result.phoneNumber);
                setGender(response.data.result.gender);
                setRole(response.data.result.role);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/user/update', {
                id: id,
                fullName: fullName,
                emailAddress: emailAddress,
                phoneNumber: phoneNumber,
                gender: gender,
                role: role
            });
            console.log(response)
            if (response.data.statusCode === 'OK') {
                setMessage("Saved successfully.");
            } else {
                setMessage("Error saving profile.");
            }
        } catch (err) {
            console.log('Error occurred:', err);
        }
        setIsEditing(false);
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
            <Row className="justify-content-center mt-5">
                <Col xs={12} style={{ display: 'flex', justifyContent: 'center', height: '70vh' }}>
                    <Col md={5}>
                        <div className="mt-3">
                            <h2>My profile</h2>
                        </div>
                        <img
                            src="/massage-no-text.png"
                            alt="Profile"
                            className="img-fluid rounded-circle text-center"
                            style={{ height: '60%' }}
                        />
                    </Col>
                    <Col md={5}>
                        <Form>
                            <Form.Group controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your name"
                                    readOnly={isEditing ? false : true}
                                    value={fullName}
                                    onChange={e => setFullName(e.target.value)}
                                />
                            </Form.Group>
                            <br />
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    readOnly={isEditing ? false : true}
                                    value={emailAddress}
                                    onChange={e => setEmailAddress(e.target.value)}
                                />
                            </Form.Group>
                            <br />
                            <Form.Group controlId="formBasicPhone">
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control
                                    type="tel"
                                    placeholder="Enter phone number"
                                    readOnly={isEditing ? false : true}
                                    value={phoneNumber}
                                    onChange={e => setPhoneNumber(e.target.value)}
                                />
                            </Form.Group>
                            <br />
                            <Form.Group controlId="formBasicGender">
                                <Form.Label>Gender</Form.Label>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Form.Check
                                        type="radio"
                                        label="Male"
                                        name="gender"
                                        value="MALE"
                                        id="maleRadio"
                                        checked={gender === 'MALE'}
                                        disabled={isEditing ? false : true}
                                        onChange={(e) => setGender(e.target.value)}
                                        style={{ marginRight: '1rem' }}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Female"
                                        name="gender"
                                        value="FEMALE"
                                        id="femaleRadio"
                                        disabled={isEditing ? false : true}
                                        checked={gender === 'FEMALE'}
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                </div>
                            </Form.Group>
                            <br />
                            <Form.Group controlId="formBasicRole">
                                <Form.Label>Role</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your role"
                                    readOnly="false"
                                    value={role}
                                />
                            </Form.Group>
                            <br />
                            {isEditing
                                ?
                                <Button variant="success" onClick={handleSaveClick}>
                                    Save Profile
                                </Button>
                                : <Button variant="primary" onClick={handleEditClick}>
                                    Edit Profile
                                </Button>
                            }
                        </Form>
                        {/* //     <>
                        //         <h4 className="mt-3">{fullName}</h4>
                        //         <p>Email Address: {emailAddress}</p>
                        //         <p>Phone Number: {phoneNumber}</p>
                        //         <p>Gender: {gender}</p>
                        //         <p>Role: {role}</p>
                        //         <Button variant="primary" onClick={handleEditClick}>
                        //             Edit Profile
                        //         </Button>
                        //     </> */}
                    </Col>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
