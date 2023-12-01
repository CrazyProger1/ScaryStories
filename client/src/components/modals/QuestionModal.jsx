import React from 'react';
import {Button, Modal} from "react-bootstrap";

const QuestionModal = ({show, onClose, onContinue, title, message}) => {
    return (
        <Modal
            show={show}
            onHide={onClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{color: "red"}}>
                {message}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={onContinue}>
                    Continue
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default QuestionModal;