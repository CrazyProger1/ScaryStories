import React from 'react';
import {Button, Modal} from "react-bootstrap";

const ErrorModal = ({show, onClose, title, message}) => {
    return (
        <Modal
            show={show}
            onHide={onClose}
        >
            <Modal.Header closeButton>
                <Modal.Title >{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{color: "red"}}>
                {message}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ErrorModal;