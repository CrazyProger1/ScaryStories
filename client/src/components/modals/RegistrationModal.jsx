import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import RegistrationForm from "../forms/RegistrationForm";


const RegistrationModal = ({show, onClose, onSubmit, onChangeMode}) => {
    const [formData, setFormData] = useState({
        login: "",
        password: "",
        passwordConfirmation: ""
    })
    const [valid, setValid] = useState(false);

    const handleSubmit = () => {
        if (valid) {
            console.log('VALID');
            console.log(formData);
        }
    }
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Registration</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <RegistrationForm
                    formData={formData}
                    onFormDataChange={setFormData}
                    onSetValidity={setValid}
                    onSubmit={handleSubmit}
                />
                <Button
                    className="w-100 mt-3"
                    variant="primary"
                    onClick={handleSubmit}>
                    Sign Up
                </Button>
            </Modal.Body>

            <Modal.Footer>
                Already have an account?
                <Button className="ml-0 mt-1" variant="link" onClick={onChangeMode}>Sign In</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RegistrationModal;