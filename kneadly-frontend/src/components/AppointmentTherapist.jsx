import { useState, useEffect } from "react";
import { Container, Col, Row, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { useAuthUser } from 'react-auth-kit'
import axios from '../api/axios';

const AppointmentTherapist = () => {
    const auth = useAuthUser();

    const [confirmed, setConfirmed] = useState([]);
    const [unconfirmed, setUnconfirmed] = useState([]);

    useEffect(() => {
        axios.get('/appointment/confirmed/therapist/' + auth()?.id)
            .then(response => {
                setConfirmed(response.data.result)
                console.log(response.data.result)
            })
            .catch(error => {
                console.log(error);
            });
        axios.get('/appointment/unconfirmed/therapist/' + auth()?.id)
            .then(response => {
                setUnconfirmed(response.data.result)
                console.log(response.data.result)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <Container style={{ marginTop: '10vh' }}>
            <Row>
                <Col md={12}>
                    <h2 className="mb-4">My appointments</h2>
                    Confirmed
                    <ListGroup>
                        {confirmed?.map((item, index) => (
                            <ListGroupItem key={index} style={{ height: '5rem', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <strong>{item.clientUserId}</strong>
                                    <p style={{ margin: '0' }}>{item.date} {item.time}</p>
                                </div>
                                {/* <div className="d-flex justify-content-end" style={{ height: '2rem' }}>
                                    <Button variant="primary" size="sm" style={{ marginRight: '0.5rem' }}>Confirm</Button>
                                    <Button variant="info" size="sm" style={{ marginRight: '0.5rem' }}>Edit</Button>
                                    <Button variant="danger" size="sm">Delete</Button>
                                </div> */}
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                    Unconfirmed
                    <ListGroup>
                        {/* {unconfirmed?.map((item, index) => (
                            <ListGroupItem key={index} style={{ height: '5rem', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <strong>{item.client}</strong>
                                    <p style={{ margin: '0' }}>{item.date} {item.time}</p>
                                </div>
                                <div className="d-flex justify-content-end" style={{ height: '2rem' }}>
                                    <Button variant="primary" size="sm" style={{ marginRight: '0.5rem' }}>Confirm</Button>
                                    <Button variant="info" size="sm" style={{ marginRight: '0.5rem' }}>Edit</Button>
                                    <Button variant="danger" size="sm">Delete</Button>
                                </div>
                            </ListGroupItem>
                        ))} */}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}

export default AppointmentTherapist;
