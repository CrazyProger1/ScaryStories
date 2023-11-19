import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {observer, inject} from "mobx-react";
import {Link} from "react-router-dom";

const DefaultHeader = inject("uiStore")(observer(({uiStore, ...props}) => {
    const links = [
        {
            to: "/",
            eventKey: "/",
            children: "Home"
        },
        {
            to: "/categories",
            eventKey: "/categories",
            children: "Categories"
        },
        {
            to: "/",
            eventKey: "/",
            children: "Top Ranked"
        },
        {
            to: "/",
            eventKey: "/",
            children: "Random Story"
        },
        {
            to: "/about",
            eventKey: "/about",
            children: "About"
        }
    ]

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="me-auto" activeKey={uiStore.currentPage}
                     onSelect={eventKey => uiStore.setPage(eventKey)}>
                    {links.map(({eventKey, to, children}) =>
                        <Nav.Link
                            as={Link}
                            eventKey={eventKey}
                            to={to}>
                            {children}
                        </Nav.Link>
                    )}

                </Nav>
            </Container>
        </Navbar>
    );
}));

export default DefaultHeader;