import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import { useAuthUser } from 'react-auth-kit';
import { Container, Row, Col, Button } from 'react-bootstrap';

import BookingItem from './BookingItem';

import axios from '../api/axios';
const BOOKINGS_URL = '/bookings';

const Bookings = () => {
    const auth = useAuthUser();
    const [bookings, setBookings] = useState([]);

    const handleCreateBooking = () => {
        // Implement your create booking functionality here
        // This function will be triggered when the "Create Booking" button is clicked
        // You can redirect the user to a page for creating a new booking
    };

    useEffect(() => {
        axios.get(BOOKINGS_URL)
            .then(response => {
                setBookings(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <Container>
            <h2>My Bookings</h2>
            <Row>
                {bookings?.map(booking => (
                    <Col md={4} key={booking.id}>
                        <BookingItem booking={booking} />
                    </Col>
                ))}
            </Row>
            <Link to="/bookingedit">
                <Button variant="success">Create new booking</Button>
            </Link>
        </Container>
    );
}

export default Bookings;