import React, {useEffect, useRef, useState} from "react";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {observer, inject} from "mobx-react";
import {Link} from "react-router-dom";
import useNavigateCustom from "../../hooks/useNavigateCustom";
import "../../styles/Header.css";
import AuthButton from "../buttons/AuthButton";


const DefaultHeader = inject("uiStore")(observer(({uiStore, ...props}) => {
    const navigate = useNavigateCustom();
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
            children: "Home"
        },
        {
            to: "/categories",
            children: "Categories"
        },
        // {
        //     to: "/category/topranked",
        //     children: "Top Ranked"
        // },
        {
            to: "/story/random",
            children: "Random Story"
        },
        {
            to: "/about",
            children: "About"
        }
    ]

    return (
        <div>
            <Navbar ref={headerRef} className="header" collapseOnSelect expand="lg"
                    style={{
                        top: visible ? '0' : `-${headerHeight}px`
                    }}>
                <Container>
                    <Navbar.Brand onClick={() => navigate("/")} className="brand">Scary Stories</Navbar.Brand>
                    <Nav className="me-auto">
                        {links.map(({to, children}) =>
                            <Nav.Link
                                onClick={() => navigate(to)}
                                style={uiStore.currentPage === to ? {color: "rgba(255, 255, 255, 1)"} : {}}
                                className="nav-link">
                                {children}
                            </Nav.Link>
                        )}
                    </Nav>
                    <AuthButton/>
                </Container>
            </Navbar>
            <div style={{
                height: headerHeight
            }}/>
        </div>
    );
}));

export default DefaultHeader;