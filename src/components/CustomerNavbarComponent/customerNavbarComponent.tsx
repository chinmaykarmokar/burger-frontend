import React, { useState, useEffect } from "react";

// Import router
import { useRouter } from "next/router";

// Import styles
import styles from "./customerNavbar.module.css";

// Import components provided by react-bootstrap
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";

// Import react-icons
import { FaHamburger, FaRegUserCircle } from "react-icons/fa";

const CustomerNavbarComponent = ({ loggedInPerson }: any) => {
    const router = useRouter();

    const logOutHandler = () => {
        localStorage?.removeItem("customer_token");
        router.push("/");
    }

    useEffect(() => {
        logOutHandler;
    },[])

    return (
        <>
            <Navbar collapseOnSelect expand="lg" className = {styles.mainCustomerNav}>
                <Container fluid>
                    <Navbar.Brand href="/customerHome" className = {styles.brand}><FaHamburger/> Burpger</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/customerHome" className = {styles.navItems}>Home</Nav.Link>
                            <Nav.Link href="/cart" className = {styles.navItems}>Go To Cart</Nav.Link>
                            <Nav.Link href="/getOrders" className = {styles.navItems}>Your Orders</Nav.Link>
                        </Nav>
                        <Nav>
                            {/* <Navbar.Text>{loggedInPerson}</Navbar.Text> */}
                            <Dropdown>
                                <Dropdown.Toggle className = {styles.logoutButton}>
                                    <FaRegUserCircle/> {loggedInPerson}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick = {logOutHandler}>Log out</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default CustomerNavbarComponent;