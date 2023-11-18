import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import RegistrationForm from "../forms/RegistrationForm";

const RegistrationModal = ({show, onClose, onChangeMode, onSubmit, ...props}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [valid, setValid] = useState(false);

    const handleSubmit = () => {
        if (valid)
            onSubmit(email, password)
    }

    return (
        <div>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Registration</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RegistrationForm
                        email={email}
                        password={password}
                        passwordConfirmation={passwordConfirmation}
                        onChangeEmail={setEmail}
                        onChangePassword={setPassword}
                        onChangePasswordConfirmation={setPasswordConfirmation}
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
        </div>
    );
};

export default RegistrationModal;