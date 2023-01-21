import React, { useState, useEffect } from "react";

// Import router
import { useRouter } from "next/router";

// Import hooks provided by react-redux
import { useSelector, useDispatch } from "react-redux";

// Import actions
import { createCustomerProfile } from "../../state/actions/customerActions";

// Import Axios
import axios from "axios";

// Import styles
import styles from "./customerRegister.module.css";

// Import react-bootstrap components
import { Container, Row, Col, Form, Button } from "react-bootstrap";

// Import react-icons
import { FaSignature, FaHamburger, FaPen } from "react-icons/fa";

const CustomerRegisterComponent: React.FC = () => {
    const router = useRouter();

    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [age, setAge] = useState();
    const [address, setAddress] = useState();
    const [mobile, setMobile] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [postStatus, setPostStatus] = useState(false);

    const changeFirstNameHandler = (event: any) => {
        setFirstName(event.target.value);
    }

    const changeLastNameHandler = (event: any) => {
        setLastName(event.target.value);
    }

    const changeAgeHandler = (event: any) => {
        setAge(event.target.value);
    }

    const changeAddressHandler = (event: any) => {
        setAddress(event.target.value);
    }

    const changeMobileHandler = (event: any) => {
        setMobile(event.target.value);
    }

    const changeEmailHandler = (event: any) => {
        setEmail(event.target.value);
    }

    const changePasswordHandler = (event: any) => {
        setPassword(event.target.value);
    }

    const customerRegistrationDetails = {
        firstname: firstName,
        lastname: lastName,
        age: age,
        address: address,
        mobile: mobile,
        email: email,
        password: password
    }

    const config = {
        headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*" 
        }
    }

    const registerCustomer = async (event: any) => {
        event.preventDefault();

        axios.post("http://localhost:3000/api/customers/customerRegister", customerRegistrationDetails, config)
        .then((response) => {
            dispatch(createCustomerProfile(response.data));
            setPostStatus(true);
        })

        setTimeout(() => {
            router.push("/customerLogin")
        },3000)
    }

    const redirectToCustomerLoginPage = () => {
        router.push("/customerLogin");
    }

    return (
        <Container fluid  className = {styles.customerRegForm}>
            <h1 className = {styles.pageHeader}><FaSignature/> Customer Register</h1>
            <Row>
                <Col md = {6} className = {styles.logoContainer}>
                    <h1 className = {styles.brand}><FaHamburger/> Burpger</h1>
                    <div className = {styles.userType}>Customer</div>
                </Col>
                <Col md = {6} className = {styles.formContainer}>
                    <h5>Already our customer? <a
                        className = {styles.loginButton}
                            onClick = {redirectToCustomerLoginPage}
                        >
                            Login
                        </a>
                    </h5>
                    <Form>
                        <Form.Group className = {styles.inputField}>
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                className = {styles.inputArea}
                                type = "text"
                                placeholder = "Firstname"
                                onChange = {changeFirstNameHandler}
                            />
                        </Form.Group>
                        <Form.Group className = {styles.inputField}>
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                className = {styles.inputArea}
                                type = "text"
                                placeholder = "Lastname"
                                onChange = {changeLastNameHandler}
                            />
                        </Form.Group>
                        <Form.Group className = {styles.inputField}>
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                className = {styles.inputArea}
                                type = "number"
                                placeholder = "Age"
                                onChange = {changeAgeHandler}
                            />
                        </Form.Group>
                        <Form.Group className = {styles.inputField}>
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                className = {styles.inputArea}
                                type = "text"
                                placeholder = "Address"
                                onChange = {changeAddressHandler}
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
                            onClick={registerCustomer}
                        >
                            <FaPen/> Register
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default CustomerRegisterComponent;