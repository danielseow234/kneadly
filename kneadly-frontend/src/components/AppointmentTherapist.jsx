import { useState, useEffect } from "react";
import { Container, Col, Row, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { useAuthUser } from 'react-auth-kit'
import axios from '../api/axios';

const AppointmentTherapist = () => {
    const auth = useAuthUser();

    const [confirmed, setConfirmed] = useState([]);
    const [unconfirmed, setUnconfirmed] = useState([]);

    const dummy = [
        {
            "AQEBeXmIvaO+fLJ9XMMq9RwFGA1HNAmkwbA8k+KG7GAlAhY3RMXTDNyHAZOAnOfNsI0FqasXHKXD6dQp3IlGqdvdW84Il9kLHZO7t7r8r+rdY4IGx/zHIaRJZxQR/BMhKT/MeWLAlOiiNUcFzNNKCdMWKXvBYpqY1Edj56UxxGPBQUfdZCi1bVAiesAXdR6fapzRYZiGjktVFyd4cK4fTxhe/qePJs8HHON5qEdyn4CfU7yPkxD2FNd8T09X49I0u/TG+c3igjt5R8GNVqbRCrS95acwzInRHZ5jhUys3sasRY2rxLVMMDP9aL1fsUYPkRF0B6YxiYw7NUpomjI6HyaCnHAcLLxlJLzaEscWlC/qS6pdmqyxns2L9vM0YbjRapSHswaY64OkG9XN1nvRMMCPjA==": {
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
        }]

    useEffect(() => {
        // axios.get('/appointment/confirmed/therapist/' + auth()?.id)
        //     .then(response => {
        //         setConfirmed(response.data)
        //         console.log(response.data)
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
        // axios.get('/appointment/unconfirmed/therapist/' + auth()?.id)
        //     .then(response => {
        //         setUnconfirmed(response.data.result)
        //         console.log(response.data.result)
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
    }, []);

    return (
        <Container style={{ marginTop: '10vh' }}>
            <Row>
                <Col md={12}>
                    <h2 className="mb-4">My appointments</h2>
                    Confirmed
                    <ListGroup>
                        {dummy.map((item, index) => {
                            console.log(item["AQEBeXmIvaO+fLJ9XMMq9RwFGA1HNAmkwbA8k+KG7GAlAhY3RMXTDNyHAZOAnOfNsI0FqasXHKXD6dQp3IlGqdvdW84Il9kLHZO7t7r8r+rdY4IGx/zHIaRJZxQR/BMhKT/MeWLAlOiiNUcFzNNKCdMWKXvBYpqY1Edj56UxxGPBQUfdZCi1bVAiesAXdR6fapzRYZiGjktVFyd4cK4fTxhe/qePJs8HHON5qEdyn4CfU7yPkxD2FNd8T09X49I0u/TG+c3igjt5R8GNVqbRCrS95acwzInRHZ5jhUys3sasRY2rxLVMMDP9aL1fsUYPkRF0B6YxiYw7NUpomjI6HyaCnHAcLLxlJLzaEscWlC/qS6pdmqyxns2L9vM0YbjRapSHswaY64OkG9XN1nvRMMCPjA=="])
                        })}
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
                        {unconfirmed && unconfirmed?.map((item, index) => (
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
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}

export default AppointmentTherapist;
