import React, { useState, useEffect } from "react";

// Import Next Router
import { useRouter } from "next/router";

// Import Actions
import { loginAdmin } from "../../state/actions/adminActions";

// Import hooks provided by React-Redux
import { useSelector, useDispatch } from "react-redux";

// import axios
import axios from "axios";

// Import styles
import styles from "./adminLogin.module.css";

// Import react-bootstrap components
import { Container, Row, Col, Form, Button } from "react-bootstrap";

// Import react-icons
import { FaSignature, FaHamburger } from "react-icons/fa";
import { RiLoginCircleFill } from "react-icons/ri";

const AdminLoginComponent: React.FC = () => {
    const router = useRouter();

    const dispatch = useDispatch();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [postStatus, setPostStatus] = useState(false);

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
            "Access-Control-Allow_Origin": "*"
        }
    }

    const adminLoginHandler = async (event: any) => {
        event.preventDefault();

        await axios.post("http://localhost:3000/api/admin/adminLogin", loginDetails, config)
        .then((response) => {
            localStorage.setItem("access_token", response?.data?.accessToken)

            dispatch(loginAdmin(response.data));
            setPostStatus(true);

            console.log(response.data);

            if (response?.data?.accessToken) {
                router.push("/adminHome");
            }
            else {
                router.push("/adminLogin");
            }
        })

        // setTimeout(() => {
        //     localStorage.removeItem("access_token");
        //     router.push("/adminLogin");
        //     console.log(localStorage.getItem("access_token"));
        // }, 60000)
    }

    return (
        <Container fluid className = {styles.customerRegForm}>
            <h1 className = {styles.pageHeader}><FaSignature/> Admin Login</h1>
            <Row>
                <Col md = {6} className = {styles.logoContainer}>
                    <h1 className = {styles.brand}><FaHamburger/> Burpger</h1>
                    <div className = {styles.userType}>Admin</div>
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
                            onClick={adminLoginHandler}
                        >
                            <RiLoginCircleFill/> Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default AdminLoginComponent;