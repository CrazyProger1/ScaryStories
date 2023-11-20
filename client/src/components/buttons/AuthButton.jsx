import React, {useState} from 'react';
import {Button, Nav} from "react-bootstrap";
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
                authStore.login(data.username, data.password);
                break;
            case  "registration":
                authStore.register(data.username, data.password);
                break;
        }
    }

    const handleChangeMode = () =>
        setModalType(modalType === "login" ? "registration" : "login")


    const handleLoginButtonClick = () => {
        setModalVisible(true);
        setModalType("login")
    }

    const handleProfileButtonClick = () =>
        navigate("/profile")

    return (
        <Nav className="justify-content-end">
            {authStore.isAuthorized ?
                <Button variant="link" onClick={handleProfileButtonClick}>Profile</Button> :
                <Button variant="link" onClick={handleLoginButtonClick}>Login</Button>
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