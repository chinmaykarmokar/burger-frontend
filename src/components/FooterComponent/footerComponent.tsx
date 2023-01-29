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
                <h4><FaCopyright/> Copyright Burpger 2023 - Chinmay Karmokar</h4>
            </Container>
        </>
    )
}

export default Footer;