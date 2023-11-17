import React from 'react';
import {Container, Nav, Navbar, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FaSignInAlt} from 'react-icons/fa';

const Header = () =>
    <div>
        <Navbar bg="dark" data-bs-theme="dark" collapseOnSelect expand="lg">
            <Container>
                <Navbar.Brand
                    as={Link}
                    eventKey='/'
                    to='/'>Scary Stories</Navbar.Brand>
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
                        <Button variant="outline-light">
                            <FaSignInAlt className="mr-2"/> Login
                        </Button>
                    </Nav>
                </Navbar>
            </Container>
        </Navbar>
    </div>


export default Header;