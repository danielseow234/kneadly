import { Container, Col, Row, ListGroup, ListGroupItem, Button } from "react-bootstrap"

const TherapistHome = (items) => {

    items = [
        {
            client: "John Doe",
            date: "2023-08-01",
            time: "10:00 AM",
        },
        {
            client: "Jane Doe",
            date: "2023-08-02",
            time: "11:00 AM",
        },
    ];

    return (
        <Container>
            <Row>
                <Col sm={12}>
                    <ListGroup>
                        {items?.map((item, index) => (
                            <ListGroupItem key={index}>
                                <div>
                                    <strong>{item.client}</strong>
                                    <p>{item.date} {item.time}</p>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <Button variant="primary" size="sm">View</Button>
                                    <Button variant="info" size="sm">Edit</Button>
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

export default TherapistHome;
