import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import StoryAddingForm from "../forms/StoryAddingForm";


const StoryAddingModal = ({show, onClose, onSubmit, ...props}) => {
    const [formData, setFormData] = useState({
        name: "",
        story: "",
        pictureUrl: ""
    })
    const [valid, setValid] = useState(false);

    const handleSubmit = () => {
        if (valid)
            onSubmit(formData);
    }

    return (
        <Modal size="lg" show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Story</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <StoryAddingForm
                    formData={formData}
                    onFormDataChange={setFormData}
                    onSetValidity={setValid}
                    onSubmit={handleSubmit}
                />
            </Modal.Body>

            <Modal.Footer>
                <Button
                    className="w-100 mt-3"
                    variant="primary"
                    onClick={handleSubmit}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default StoryAddingModal;