import React from "react";

// Import router
import { useRouter } from "next/router";

// Import hooks
import { useState, useEffect } from "react";

// Import hooks provided by react-redux
import { useSelector, useDispatch } from "react-redux";

// Import axios
import axios from "axios";

// Import actions
import { customerLogin } from "../../state/actions/customerActions";

// Import styles
import styles from "./customerLogin.module.css";

// Import react-bootstrap components
import { Container, Row, Col, Form, Button } from "react-bootstrap";

// Import react-icons
import { FaSignature, FaHamburger } from "react-icons/fa";
import { RiLoginCircleFill } from "react-icons/ri";

const CustomerLoginComponent: React.FC = () => {
    const dispatch = useDispatch();

    const router = useRouter();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const changeEmailHandler = (event: any) => {
        setEmail(event.target.value);
    }

    const changePasswordHandler = (event: any) => {
        setPassword(event.target.value);
    }

    const loginDetails = {
        email: email,
        password: password
    }

    const config = {
        headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    }

    const loginCustomer = async () => {
        await axios.post("http://localhost:3000/api/customers/customerLogin", loginDetails, config)
        .then((response) => {
            localStorage.setItem("customer_token", response?.data?.accessToken);
            dispatch(customerLogin(response.data));
            
            if (response?.data?.accessToken) {
                router.push("/customerHome");
            }
            else {
                router.push("/customerLogin")
            }
        })
    }

    return (
        <Container fluid className = {styles.customerRegForm}>
            <h1 className = {styles.pageHeader}><FaSignature/> Customer Login</h1>
            <Row>
                <Col md = {6} className = {styles.logoContainer}>
                    <h1 className = {styles.brand}><FaHamburger/> Burpger</h1>
                    <div className = {styles.userType}>Customer</div>
                </Col>
                <Col md = {6} className = {styles.formContainer}>
                    <Form>
                        <Form.Group className = {styles.inputField}>
                            <Form.Label>Email ID</Form.Label>
                            <Form.Control
                                className = {styles.inputArea}
                                type = "email"
                                placeholder = "Email"
                                onChange = {changeEmailHandler}
                            />
                        </Form.Group>
                        <Form.Group className = {styles.inputField}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                className = {styles.inputArea}
                                type = "password"
                                placeholder = "Password"
                                onChange = {changePasswordHandler}
                            />
                        </Form.Group>
                        <Button
                            className = {styles.registerButton}
                            onClick={loginCustomer}
                        >
                            <RiLoginCircleFill/> Login
                        </Button>
                    </Form>
                </Col>
            </Row>
            
            
            
            
        </Container>
    )
}

export default CustomerLoginComponent;