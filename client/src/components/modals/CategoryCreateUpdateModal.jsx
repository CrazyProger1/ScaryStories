import React, {useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import CategoryForm from "../forms/CategoryForm";

const CategoryCreateUpdateModal = ({
                                       show,
                                       onClose,
                                       onSubmit,
                                       title,
                                       buttonText,
                                       defaultData,
                                       ...props
                                   }) => {

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
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CategoryForm
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

export default CategoryCreateUpdateModal;