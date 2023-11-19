import React, {useState} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import LoginModal from "../modals/LoginModal";
import RegistrationModal from "../modals/RegistrationModal";
import {inject, observer} from "mobx-react";
import LoginButton from "../buttons/header/LoginButton";
import ProfileButton from "../buttons/header/ProfileButton";
import "../../styles/Header.css";

const Header = inject("authStore")(observer(({authStore, ...props}) => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);
    const navigate = useNavigate()

    const handleLoginButtonClick = () =>
        setShowLoginModal(true);

    const handleProfileButtonClick = () =>
        navigate("/profile")


    const handleChangeMode = () => {
        let prev = showRegistrationModal.valueOf();
        setShowRegistrationModal(showLoginModal);
        setShowLoginModal(prev);
    }


    const handleLoginModalSubmit = (username, password) => {
        setShowLoginModal(false);
        authStore.login(username, password);
    }


    const handleRegistrationModalSubmit = (username, password) => {
        setShowRegistrationModal(false);
        authStore.register(username, password);
    }


    return (
        <div>
            <Navbar className="header-custom" bg="dark" data-bs-theme="dark" collapseOnSelect expand="lg">
                <Container>
                    <Navbar.Brand
                        className="brand-custom"
                        as={Link}
                        eventKey='/'
                        to='/'>Scary Stories
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link
                            as={Link}
                            eventKey='/'
                            to='/'>Home</Nav.Link>
                        <Nav.Link
                            as={Link}
                            eventKey='/categories'
                            to='/categories'>Categories</Nav.Link>
                        <Nav.Link
                            as={Link}
                            eventKey='/'
                            to='/'>Top Ranked</Nav.Link>
                        <Nav.Link
                            as={Link}
                            eventKey='/'
                            to='/'>Random Story</Nav.Link>
                        <Nav.Link
                            as={Link}
                            eventKey='/about'
                            to='/about'>About</Nav.Link>
                    </Nav>

                    {authStore.isAuthenticated ? (
                        <ProfileButton onClick={handleProfileButtonClick}/>
                    ) : (
                        <LoginButton onClick={handleLoginButtonClick}/>
                    )}


                </Container>
            </Navbar>
            <LoginModal
                show={showLoginModal}
                onChangeMode={handleChangeMode}
                onClose={() => setShowLoginModal(false)}
                onSubmit={handleLoginModalSubmit}
            />
            <RegistrationModal
                show={showRegistrationModal}
                onChangeMode={handleChangeMode}
                onClose={() => setShowRegistrationModal(false)}
                onSubmit={handleRegistrationModalSubmit}
            />
        </div>

    );
}));


export default Header;