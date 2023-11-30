import React, {useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import StoryForm from "../forms/StoryForm";


const StoryCreateUpdateModal = ({show, onClose, onSubmit, title, buttonText, defaultData, ...props}) => {
    const [formData, setFormData] = useState({})

    useEffect(
        _ => {
            setFormData({...defaultData});
        },
        [defaultData]
    )
    const [valid, setValid] = useState(false);

    const handleSubmit = () => {
        if (valid)
            onSubmit(formData);
    }

    return (
        <Modal size="lg" show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <StoryForm
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
                    {buttonText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default StoryCreateUpdateModal;