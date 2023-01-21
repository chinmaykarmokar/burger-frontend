import React from "react";

// Import styles
import styles from "./footer.module.css";


// Import react-bootstrap components
import { Container } from "react-bootstrap";

// Import react-icons
import { FaCopyright } from "react-icons/fa";

const Footer: React.FC = () => {
    return (
        <>
            <Container fluid className = {styles.footer}>
                <h4><FaCopyright/> Copyright Burpger Chinmay Karmokar 2023</h4>
            </Container>
        </>
    )
}

export default Footer;