import React, {useEffect, useState} from 'react';
import {validateEmail, validatePassword} from "../../utils/validators/users";
import {Form} from "react-bootstrap";

const LoginForm = ({formData, onFormDataChange, onSetValidity, onSubmit, ...props}) => {
    const {login, password} = formData;
    const [errors, setErrors] = useState({
        login: "",
        password: ""
    });

    useEffect(
        () => {
            validate();
        },
        [formData]
    )

    const handleLoginChange = (e) =>
        onFormDataChange({
            ...formData,
            login: e.target.value
        })

    const handlePasswordChange = (e) =>
        onFormDataChange({
            ...formData,
            password: e.target.value
        })


    const validate = () => {
        let newErrors = {
            login: "",
            password: ""
        }
        if (!validateEmail(login))
            newErrors.login = "Email is not valid";


        if (!validatePassword(password))
            if (password.length < 8)
                newErrors.password = "Password should contain at least 8 chars"
            else
                newErrors.password = "Password should contain numbers, letters, upper case letters and symbols"


        setErrors(newErrors);

        if (onSetValidity)
            onSetValidity(!newErrors.login && !newErrors.password);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onSubmit)
            onSubmit();
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formLogin">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={login}
                    onChange={handleLoginChange}
                    isInvalid={!!errors.login}
                    isValid={!errors.login}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.login}
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