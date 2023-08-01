import React from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';

const BookingItem = ({ booking }) => {
    const handleEditBooking = () => {
        // Implement your edit booking functionality here
        // This function will be triggered when the "Edit Booking" button is clicked
        // You can redirect the user to an edit page or show a modal for editing the booking details
    };
    
    const handleDeleteBooking = () => {
        // Implement your edit booking functionality here
        // This function will be triggered when the "Edit Booking" button is clicked
        // You can redirect the user to an edit page or show a modal for editing the booking details
    };

    return (
        <Card>
            <Card.Header>{booking.date}</Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item>Massage Type: {booking.type}</ListGroup.Item>
                <ListGroup.Item>Therapist: {booking.therapist}</ListGroup.Item>
                <ListGroup.Item>Date: {booking.date}</ListGroup.Item>
                <ListGroup.Item>Time: {booking.time}</ListGroup.Item>
                {/* Add more booking details here */}
            </ListGroup>
            <Card.Footer>
                <Button variant="primary" onClick={handleEditBooking}>Edit Booking</Button>
                <Button variant="danger" onClick={handleDeleteBooking}>Delete Booking</Button>
            </Card.Footer>
        </Card>
    );
};

export default BookingItem;
