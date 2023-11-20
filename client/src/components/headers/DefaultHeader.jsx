import React, {useEffect, useRef, useState} from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {observer, inject} from "mobx-react";
import {Link, useNavigate} from "react-router-dom";
import "../../styles/Header.css";

const DefaultHeader = inject("uiStore")(observer(({uiStore, ...props}) => {
    const navigate = useNavigate();
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [headerHeight, setHeaderHeight] = useState(0);
    const headerRef = useRef(null);

    useEffect(() => {
        setHeaderHeight(headerRef.current ? headerRef.current.clientHeight : 0);
    }, [headerRef])

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        const isScrolledDown = prevScrollPos < currentScrollPos;

        setVisible(!isScrolledDown);
        setPrevScrollPos(currentScrollPos);
    };


    const handleResize = () =>
        setHeaderHeight(headerRef.current ? headerRef.current.clientHeight : 0);


    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

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
            to: "/category/topranked",
            eventKey: "/stories/topranked",
            children: "Top Ranked"
        },
        {
            to: "/story/random",
            eventKey: "/story/random",
            children: "Random Story"
        },
        {
            to: "/about",
            eventKey: "/about",
            children: "About"
        }
    ]

    return (
        <div>


            <Navbar ref={headerRef} className="header" bg="dark" data-bs-theme="dark" collapseOnSelect expand="lg"
                    style={{
                        top: visible ? '0' : `-${headerHeight}px`
                    }}>
                <Container>
                    <Navbar.Brand onClick={() => {
                        navigate("/");
                        uiStore.setPage("/");
                    }} className="brand">Scary Stories</Navbar.Brand>
                    <Nav className="me-auto" activeKey={uiStore.currentPage}
                         onSelect={eventKey => uiStore.setPage(eventKey)}>
                        {links.map(({eventKey, to, children}) =>
                            <Nav.Link
                                className="nav-link"
                                as={Link}
                                eventKey={eventKey}
                                to={to}>
                                {children}
                            </Nav.Link>
                        )}
                    </Nav>
                </Container>
            </Navbar>
            <div style={{
                height: headerHeight
            }}/>
        </div>

    );
}));

export default DefaultHeader;