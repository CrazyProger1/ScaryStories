import React, {useState} from 'react';
import {Button, Nav, Stack} from "react-bootstrap";
import {inject, observer} from "mobx-react";
import useNavigateCustom from "../../hooks/useNavigateCustom";
import LoginModal from "../modals/LoginModal";
import RegistrationModal from "../modals/RegistrationModal";
import ErrorModal from "../modals/ErrorModal";

const AuthBlock = inject("authStore")(observer(({authStore, ...props}) => {
    const [authModalVisible, setAuthModalVisible] = useState(false);
    const [authModalType, setAuthModalType] = useState("login");

    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigateCustom();


    const showError = (message) => {
        setErrorModalVisible(true);
        setErrorMessage(message);
    }


    const handleAuthModalClose = () =>
        setAuthModalVisible(false);


    const handleAuthModalSubmit = (data) => {
        setAuthModalVisible(false);
        switch (authModalType) {
            case "login":
                authStore.loginUser(data.login, data.password).catch(error => {
                    if (error.response?.status === 400)
                        showError("Username or password is incorrect!");
                });
                break;
            case  "registration":
                authStore.registerUser(data.login, data.nickname, data.password).catch(error => {
                    if (error.response?.status === 400)
                        showError("User with such email or nickname already exists!");
                });
                break;
        }
    }

    const handleChangeMode = () =>
        setAuthModalType(authModalType === "login" ? "registration" : "login")


    const handleSignInButtonClick = () => {
        setAuthModalVisible(true);
        setAuthModalType("login")
    }

    const handleSignUpButtonClick = () => {
        setAuthModalVisible(true);
        setAuthModalType("registration")
    }

    const handleProfileButtonClick = () =>
        navigate("/profile")

    const handleLogoutButtonClick = () =>
        authStore.logoutUser();


    return (
        <Nav className="justify-content-end">
            {authStore.isAuthorized ?
                <Stack direction="horizontal" gap={2}>
                    <Button variant="dark" onClick={handleProfileButtonClick}>Profile</Button>
                    <Button variant="danger" onClick={handleLogoutButtonClick}>Logout</Button>
                </Stack> :

                <Stack direction="horizontal" gap={2}>
                    <Button variant="dark" onClick={handleSignInButtonClick}>Sign In</Button>
                    <Button variant="danger" onClick={handleSignUpButtonClick}>Sign Up</Button>
                </Stack>

            }
            <RegistrationModal
                show={authModalVisible && authModalType === "registration"}
                onClose={handleAuthModalClose}
                onSubmit={handleAuthModalSubmit}
                onChangeMode={handleChangeMode}
            />
            <LoginModal
                show={authModalVisible && authModalType === "login"}
                onClose={handleAuthModalClose}
                onSubmit={handleAuthModalSubmit}
                onChangeMode={handleChangeMode}
            />
            <ErrorModal
                show={errorModalVisible}
                onClose={_ => setErrorModalVisible(false)}
                title="Error"
                message={errorMessage}
            />
        </Nav>
    );
}));

export default AuthBlock;