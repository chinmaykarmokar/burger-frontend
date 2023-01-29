import React, { useState, useEffect } from "react";

// Import axios
import axios from "axios";

// Import hooks provided by react-redux
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

// Import all admin actions
import { createAdminProfile } from "../../state/actions/adminActions";

// Import styles
import styles from "./AdminRegistrationStyles.module.css";

// Import react-bootstrap components
import { Container, Row, Col, Form, Button } from "react-bootstrap";

// Import react-icons
import { FaSignature, FaHamburger, FaPen } from "react-icons/fa";

const AdminRegistrationComponent: React.FC = () => {
    const router =  useRouter();

    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [mobile, setMobile] = useState();
    const [password, setPassword] = useState();
    const [postStatus, setPostStatus] = useState(false);

    const changeFirstNameHandler = (event: any) => {
        setFirstName(event?.target.value);
    }

    const changeLastNameHandler =  (event: any) => {
        setLastName(event?.target.value);
    }

    const changeEmailHandler = (event: any) => {
        setEmail(event?.target.value);
    }

    const changeMobileHandler = (event: any) => {
        setMobile(event?.target.value);
    }

    const changePasswordHandler = (event: any) => {
        setPassword(event?.target.value);
    }

    const registerAdmin = async (event: any) => {
        event.preventDefault();

        const adminDetailsToRegister = {
            firstname: firstName,
            lastname: lastName,
            email: email,
            mobile: mobile,
            password: password
        }

        const config = {
            headers: {
                "content-type": "application/json",
                "Access-Control-ALlow-Origin": "*"
            }
        }

        await axios.post('https://burpger-1yxc.onrender.com/api/admin/adminRegister', adminDetailsToRegister, config)
        .then((response) => {
            dispatch(createAdminProfile(response.data));
            setPostStatus(true);
            console.log(response.data);
        })

        setTimeout(() => {
            router.push("/adminLogin")
        },3000)
    }

    const redirectToAdminLoginPage = () => {
        router.push("/adminLogin")
    }

    return (
        <Container fluid className = {styles.customerRegForm}>
            <h1 className = {styles.pageHeader}><FaSignature/> Admin Register</h1>
            <Row>
                <Col md = {6} className = {styles.logoContainer}>
                    <h1 className = {styles.brand}><FaHamburger/> Burpger</h1>
                    <div className = {styles.userType}>Admin</div>
                </Col>
                <Col md = {6} className = {styles.formContainer}>
                    <h5>Already registered? <a
                        className = {styles.loginButton}
                            onClick = {redirectToAdminLoginPage}
                        >
                            Login
                        </a>
                    </h5>
                    <Form>
                        <Form.Group className = {styles.inputField}>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                className = {styles.inputArea}
                                type = "text"
                                placeholder = "First Name"
                                onChange = {changeFirstNameHandler}
                            />
                        </Form.Group>
                        <Form.Group className = {styles.inputField}>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                className = {styles.inputArea}
                                type = "text"
                                placeholder = "Last Name"
                                onChange = {changeLastNameHandler}
                            />
                        </Form.Group>
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
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control
                                className = {styles.inputArea}
                                type = "number"
                                placeholder = "Mobile"
                                onChange = {changeMobileHandler}
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
                            onClick={registerAdmin}
                        >
                            <FaPen/> Register
                        </Button>
                    </Form>
                </Col>
            </Row> 
        </Container>
    )
}

export default AdminRegistrationComponent;