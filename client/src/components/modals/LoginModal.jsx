import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import LoginForm from "../forms/LoginForm";

const LoginModal = ({show, onClose, onSubmit, onChangeMode}) => {
    const [formData, setFormData] = useState({
        login: "",
        password: ""
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
                <LoginForm
                    formData={formData}
                    onFormDataChange={setFormData}
                    onSetValidity={setValid}
                    onSubmit={handleSubmit}
                />
                <Button
                    className="w-100 mt-3"
                    variant="primary"
                    onClick={handleSubmit}>
                    Sign In
                </Button>
            </Modal.Body>

            <Modal.Footer>
                Don't have account yet?
                <Button className="ml-0 mt-1" variant="link" onClick={onChangeMode}>Sign Up</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LoginModal;