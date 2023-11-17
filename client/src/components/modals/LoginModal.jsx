import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import LoginForm from "../forms/LoginForm";


const LoginModal = ({show, onClose, onChangeMode, onSubmit, ...props}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [valid, setValid] = useState(false);


    const handleSubmit = () => {
        if (valid)
            onSubmit(email, password)
    }

    return (
        <div>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoginForm
                        username={email}
                        password={password}
                        onChangeUsername={setEmail}
                        onChangePassword={setPassword}
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
                    Don't have an account yet?
                    <Button className="ml-0 mt-1" variant="link" onClick={onChangeMode}>Sign Up</Button>
                </Modal.Footer>
            </Modal>
        </div>

    );

}


export default LoginModal;