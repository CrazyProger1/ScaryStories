import React, {useEffect, useState} from 'react';
import {Form} from "react-bootstrap";
import {validateEmail, validatePassword} from "../../utils/validators/users";


const RegistrationForm = ({formData, onFormDataChange, onSetValidity, onSubmit, ...props}) => {
    const {login, nickname, password, passwordConfirmation} = formData;
    const [errors, setErrors] = useState({
        login: "",
        password: "",
        passwordConfirmation: "",
        nickname: ""
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


    const handleNicknameChange = (e) => {
        onFormDataChange({
            ...formData,
            nickname: e.target.value
        })
    }

    const handlePasswordChange = (e) =>
        onFormDataChange({
            ...formData,
            password: e.target.value
        })


    const handlePasswordConfirmationChange = (e) =>
        onFormDataChange({
            ...formData,
            passwordConfirmation: e.target.value
        })


    const validate = () => {
        let newErrors = {
            login: "",
            password: "",
            passwordConfirmation: "",
            nickname: ""
        }
        if (!validateEmail(login))
            newErrors.login = "Email is not valid";


        if (!validatePassword(password))
            if (password.length < 8)
                newErrors.password = "Password should contain at least 8 chars"
            else
                newErrors.password = "Password should contain numbers, letters, upper case letters and symbols"


        if (passwordConfirmation !== password)
            newErrors.passwordConfirmation = "Password mismatch"


        setErrors(newErrors);

        if (onSetValidity)
            onSetValidity(!newErrors.login && !newErrors.password && !newErrors.passwordConfirmation);
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

            <Form.Group controlId="formNickname">
                <Form.Label>Nickname</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nickname"
                    name="nickname"
                    value={nickname}
                    onChange={handleNicknameChange}
                    isInvalid={!!errors.nickname}
                    isValid={!errors.nickname}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.nickname}
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