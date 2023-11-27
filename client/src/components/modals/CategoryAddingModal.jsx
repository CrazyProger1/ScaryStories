import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import CategoryAddingForm from "../forms/CategoryAddingForm";

const CategoryAddingModal = ({show, onClose, onSubmit, ...props}) => {
    const [formData, setFormData] = useState({
        name: "",
        pictureUrl: ""
    })
    const [valid, setValid] = useState(false);

    const handleSubmit = () => {
        if (valid)
            onSubmit(formData);
    }
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CategoryAddingForm
                    formData={formData}
                    onFormDataChange={setFormData}
                    onSetValidity={setValid}
                    onSubmit={handleSubmit}
                />
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="primary"
                    onClick={handleSubmit}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CategoryAddingModal;