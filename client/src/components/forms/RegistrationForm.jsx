import React, {useEffect, useState} from 'react';
import {Form} from "react-bootstrap";
import {validatePassword, validateEmail} from "../../utils/validators/user";


const RegistrationForm = (
    {
        email,
        password,
        passwordConfirmation,
        onChangeEmail,
        onChangePassword,
        onChangePasswordConfirmation,
        onSetValidity,
        onSubmit
    }) => {

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        passwordConfirmation: ""
    });
    useEffect(() => {
        validate()
    })

    useEffect(() => validate(), [
        email,
        password,
        passwordConfirmation
    ])

    const handleEmailChange = (e) =>
        onChangeEmail(e.target.value);

    const handlePasswordChange = (e) =>
        onChangePassword(e.target.value);


    const handlePasswordConfirmationChange = (e) =>
        onChangePasswordConfirmation(e.target.value);


    const validate = () => {
        let newErrors = {
            email: "",
            password: "",
            passwordConfirmation: ""
        }
        if (!validateEmail(email))
            newErrors.email = "Email is not valid";


        if (!validatePassword(password))
            if (password.length < 8)
                newErrors.password = "Password should contain at least 8 chars"
            else
                newErrors.password = "Password should contain numbers, letters, upper case letters and symbols"


        if (passwordConfirmation !== password)
            newErrors.passwordConfirmation = "Password mismatch"


        setErrors(newErrors);
        onSetValidity(!errors.email && !errors.password && !errors.passwordConfirmation);
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

            <Form.Group controlId="formPasswordConfirmation">
                <Form.Label>Confirmation</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password-confirmation"
                    value={passwordConfirmation}
                    onChange={handlePasswordConfirmationChange}
                    isInvalid={!!errors.passwordConfirmation}
                    isValid={!errors.passwordConfirmation}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.passwordConfirmation}
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid">
                    Looks good!
                </Form.Control.Feedback>
            </Form.Group>
        </Form>
    );
};

export default RegistrationForm;