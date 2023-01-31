import React from "react";

// Import head and link
import Head from "next/head";
import Link from "next/link";

// Import styles
import styles from "../../styles/Home.module.css";

// Import react-bootstrap components
import { Container, Row, Col, Card } from "react-bootstrap";

// Import react-icons
import { FaHamburger, FaInfoCircle, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";

const AboutPage: React.FC = () => {
    return (
        <>
            <Head>
                <title>About</title>
            </Head>
            <Container fluid className = {styles.brandContainer}>
                <Row>
                    <h1><FaHamburger/> Burpger</h1>
                </Row>
            </Container>
            <Container fluid className = {styles.pageHeaderContainer}>
                <h1><FaInfoCircle/> About Us</h1>
                <Row>
                    <Col md = {6}>
                        <p>Burpger is a burger app that can be used to manage food inventories, update inventories, add burgers to cart, order them, assign delivery to delivery persons and receive personalised email alerts about activities.</p>
                        <br/>
                        <p>Programming stack used are Next.js, CSS and Redux for the frontend, while the backend is created using Node.js (Express.js) and PostgreSQL. The frontend is deployed on Vercel while the backend is deployed on Render.</p>
                        <br/>
                        <p>Little bit about myself - I am a 20-year-old final-year engineering student who has a lot of interest in programming and specifically web development. I am currently learning React-native for app development.</p>
                    </Col>
                    <Col md = {6}>
                        <Card className = {styles.socialsCard}>
                            <Card.Body>
                                <Card.Title><IoShareSocialOutline/> Socials</Card.Title>
                                <hr/>
                                <Link 
                                    className = {styles.profileLinks}
                                    href = "https://github.com/chinmaykarmokar"
                                >
                                    <FaGithub/>
                                </Link>
                                <Link 
                                    className = {styles.profileLinks}
                                    href = "https://www.linkedin.com/in/chinmay-karmokar-b0042b174/"
                                >
                                    <FaLinkedin/> 
                                </Link>
                                <Link 
                                    className = {styles.profileLinks}
                                    href = "https://www.instagram.com/chinmay.js/"
                                >
                                    <FaInstagram/>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default AboutPage;