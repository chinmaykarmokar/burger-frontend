import React from "react";

// Import styles
import styles from "./deliveryPersonNavbar.module.css";

// Import components provided by react-bootstrap
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";

// Import react-icons
import { FaHamburger, FaRegUserCircle } from "react-icons/fa";

const DeliveryPersonNavbarComponent = ({ loggedInPerson }: any) => {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" className = {styles.mainCustomerNav}>
                <Container fluid>
                    <Navbar.Brand href="/deliveryPersonHome" className = {styles.brand}><FaHamburger/> Burpger | Delivery</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            {/* <Nav.Link href="/customerHome" className = {styles.navItems}>Home</Nav.Link> */}
                        </Nav>
                        <Nav>
                            {/* <Navbar.Text>{loggedInPerson}</Navbar.Text> */}
                            <Dropdown>
                                <Dropdown.Toggle className = {styles.logoutButton}>
                                    <FaRegUserCircle/> {loggedInPerson}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item>Log out</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default DeliveryPersonNavbarComponent;