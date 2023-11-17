import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";

const RegistrationModal = ({show, onClose, onChangeMode, onSubmit, ...props}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Registration</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                    <Button
                        className="w-100 mt-3"
                        variant="primary"
                        onClick={() => onSubmit(email, password)}>
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