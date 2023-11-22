import React, {useState} from 'react';
import {Button, Nav, Stack} from "react-bootstrap";
import {inject, observer} from "mobx-react";
import useNavigateCustom from "../../hooks/useNavigateCustom";
import LoginModal from "../modals/LoginModal";
import RegistrationModal from "../modals/RegistrationModal";

const AuthButton = inject("authStore")(observer(({authStore, ...props}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState("login");
    const navigate = useNavigateCustom();


    const handleModalClose = () =>
        setModalVisible(false);


    const handleModalSubmit = (data) => {
        setModalVisible(false);
        switch (modalType) {
            case "login":
                authStore.login(data.login, data.password);
                break;
            case  "registration":
                authStore.register(data.login, data.nickname, data.password);
                break;
        }
    }

    const handleChangeMode = () =>
        setModalType(modalType === "login" ? "registration" : "login")


    const handleSignInButtonClick = () => {
        setModalVisible(true);
        setModalType("login")
    }

    const handleSignUpButtonClick = () => {
        setModalVisible(true);
        setModalType("registration")
    }

    const handleProfileButtonClick = () =>
        navigate("/profile")

    const handleLogoutButtonClick = () =>
        authStore.logout();


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
                show={modalVisible && modalType === "registration"}
                onClose={handleModalClose}
                onSubmit={handleModalSubmit}
                onChangeMode={handleChangeMode}
            />
            <LoginModal
                show={modalVisible && modalType === "login"}
                onClose={handleModalClose}
                onSubmit={handleModalSubmit}
                onChangeMode={handleChangeMode}
            />

        </Nav>
    );
}));

export default AuthButton;