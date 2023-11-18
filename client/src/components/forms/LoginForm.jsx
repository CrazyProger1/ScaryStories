import React, {useEffect, useState} from 'react';
import {Form} from "react-bootstrap";
import {validateEmail} from "../../utils/validators/user";

const LoginForm = ({email, password, onChangeEmail, onChangePassword, onSetValidity, onSubmit}) => {
    const [errors, setErrors] = useState({
        email: ""
    });
    useEffect(() => {
        validate()
    })

    useEffect(() => validate(), [
        email
    ])

    const handleEmailChange = (e) =>
        onChangeEmail(e.target.value);

    const handlePasswordChange = (e) =>
        onChangePassword(e.target.value);


    const validate = () => {
        let newErrors = {
            email: ""
        }
        if (!validateEmail(email))
            newErrors.email = "Email is not valid";


        setErrors(newErrors);
        onSetValidity(!errors.email);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onSubmit();
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    isInvalid={!!errors.email}
                    isValid={!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.email}
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid">
                    Looks good!
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    isInvalid={!!errors.password}
                    isValid={!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.password}
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid">
                    Looks good!
                </Form.Control.Feedback>
            </Form.Group>
        </Form>
    );
};

export default LoginForm;