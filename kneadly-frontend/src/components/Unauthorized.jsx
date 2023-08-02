import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';

const Unauthorized = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <Container fluid style={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Row>
                <Col className="text-center">
                    <h1 style={{ fontSize: '3rem', marginBottom: '20px', color: '#f44336' }}>Oops!</h1>
                    <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>Sorry, you are not authorized to view this data.</p>
                    <Button variant="primary" style={{ fontSize: '1.2rem' }} onClick={handleGoBack}>Go Back</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Unauthorized;
