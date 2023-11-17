import React, {useState} from 'react';
import {Container, Nav, Navbar, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FaSignInAlt} from 'react-icons/fa';
import LoginModal from "../modals/LoginModal";
import RegistrationModal from "../modals/RegistrationModal";

const Header = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);

    const handleLoginButtonClick = () =>
        setShowLoginModal(true);


    const handleChangeMode = () => {
        let prev = showRegistrationModal.valueOf();
        setShowRegistrationModal(showLoginModal);
        setShowLoginModal(prev);
    }

    // login modal
    const handleLoginModalSubmit = (username, password) =>
        setShowLoginModal(false);


    // registration modal
    const handleRegistrationModalSubmit = (username, password) =>
        setShowRegistrationModal(false);

    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark" collapseOnSelect expand="lg">
                <Container>
                    <Navbar.Brand
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
                            eventKey='/about'
                            to='/about'>About</Nav.Link>
                    </Nav>
                    <Navbar id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="ml-auto">
                            <Button variant="outline-light" onClick={handleLoginButtonClick}>
                                <FaSignInAlt className="mr-2"/> Login
                            </Button>
                        </Nav>
                    </Navbar>
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
};


export default Header;