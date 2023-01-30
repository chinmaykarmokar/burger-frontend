import React from "react";

// Import styles
import styles from "./loader.module.css";

// Import react-bootstrap components
import { Container } from "react-bootstrap";

// Import react-icons
import { FaHamburger } from "react-icons/fa";

const LoaderComponent: React.FC = () => {
    return (
        // <Container fluid className = {styles.loaderContainer}>
        <Container fluid className = {styles.loaderContainer}>
            <FaHamburger className = {styles.actualLoader}/>
        </Container>
        // </Container>
    )
}

export default LoaderComponent;