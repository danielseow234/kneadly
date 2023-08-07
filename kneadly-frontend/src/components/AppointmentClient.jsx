import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useAuthUser } from 'react-auth-kit';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AppointmentItem from './AppointmentItem';
import axios from '../api/axios';

const AppointmentClient = () => {
    const auth = useAuthUser();
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('/appointment/client/' + auth().id);
                setAppointments(response.data.result);
            } catch (error) {
                console.log(error);
            }
        };

        fetchAppointments();
    }, []);

    return (
        <Container style={{ marginTop: '10vh' }}>
            <h2 className="mb-4">My Appointments</h2>
            <Row>
                {appointments.map(appointment => (
                    <Col md={4} key={appointment.id}>
                        <AppointmentItem appointment={appointment} />
                    </Col>
                ))}
            </Row>
            <div style={{ marginTop: '20px' }}>
                <Link to="/appointment/edit">
                    <Button variant="success">Create new appointment</Button>
                </Link>
            </div>
        </Container>
    );
}

export default AppointmentClient;