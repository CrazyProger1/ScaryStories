import React, {useEffect, useRef, useState} from 'react';
import {Form} from "react-bootstrap";
import {validatePassword, validateUsername} from "../../utils/validators/user";


const RegistrationForm = (
    {
        username,
        password,
        passwordConfirmation,
        onChangeUsername,
        onChangePassword,
        onChangePasswordConfirmation,
        onSetValidity,
        onSubmit
    }) => {
    const formRef = useRef(null)

    useEffect(() => {
        if (onSetValidity)
            onSetValidity(validate())
    })

    const validate = () => formRef.current.checkValidity() && validateUsername(username) && validatePassword(password);


    const handleChange = () => {
        if (onSetValidity)
            onSetValidity(validate())
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        onSubmit();
    };

    return (
        <Form ref={formRef} noValidate validated={true} onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    required
                    autoFocus
                    type="email"
                    placeholder="Email"
                    value={username}
                    onChange={(e) => {
                        onChangeUsername(e.target.value);
                        handleChange();
                    }}
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        onChangePassword(e.target.value);
                        handleChange();
                    }}
                />
            </Form.Group>

            <Form.Group controlId="formBasicPasswordConfirmation">
                <Form.Label>Confirmation</Form.Label>
                <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                    value={passwordConfirmation}

                    onChange={(e) => {
                        onChangePasswordConfirmation(e.target.value)
                        handleChange();
                    }}
                />
            </Form.Group>
        </Form>
    );
};

export default RegistrationForm;