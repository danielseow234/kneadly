import { Button, Modal } from 'react-bootstrap';

const Popup = ({ show, handleClose, popupMessage }) => {
    return (
        <>
            <Modal show={show} onHide={handleClose} style={{ marginTop: '6rem' }}>
                <Modal.Header closeButton>
                    <Modal.Title>Message</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    {popupMessage}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Popup;
