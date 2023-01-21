import React, { useState, useEffect } from "react";

// Import router
import { useRouter } from "next/router";

// Import hooks provided by react-redux
import { useSelector, useDispatch } from "react-redux";

// Import axios
import axios from "axios";

// Import actions
import { registerDeliveryPerson } from "../../state/actions/deliveryPersonActions";

// Import styles
import styles from "./deliveryPersonRegister.module.css";

// Import react-bootstrap components
import { Container, Row, Col, Form, Button } from "react-bootstrap";

// Import react-icons
import { FaSignature, FaHamburger, FaPen } from "react-icons/fa";

const DeliveryPersonRegister: React.FC = () => {
    const dispatch = useDispatch();

    const router = useRouter();

    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [aadhar, setAadhar] = useState();
    const [status, setStatus] = useState("available")
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [config, setConfig] = useState<any>();

    const changeNameHandler = (event: any) => {
        setName(event.target.value);
    }

    const changePhoneNumberHandler = (event: any) => {
        setPhone(event.target.value);
    }

    const changeAadharHandler = (event: any) => {
        setAadhar(event.target.value);
    }

    const changeEmailHandler = (event: any) => {
        setEmail(event.target.value);
    }

    const changePasswordHandler = (event: any) => {
        setPassword(event.target.value);
    }

    const deliveryPersonRegistration = async (configParams: Object) => {
        const deliveryPersonDetails = {
            name: name,
            phone: phone,
            aadhar_no: aadhar,
            status: status,
            email: email,
            password: password
        }

        try {
            await axios.post("http://localhost:3000/api/delivery/deliveryPersonregister", deliveryPersonDetails, configParams)
            .then((response) => {
                dispatch(registerDeliveryPerson(response?.data));
                console.log(response?.data);
            })

            setTimeout(() => {
                router.push("/deliveryPersonLogin");
            },2000)
        }
        catch (e) {
            alert(e);
        }
    }

    useEffect(() => {
        const config = {
            headers: {
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }

        setConfig(config)
    },[])

    const redirectToDeliveryPersonLoginPage = () => {
        router.push("/deliveryPersonLogin");
    }

    return (
        <Container fluid  className = {styles.customerRegForm}>
            <h1 className = {styles.pageHeader}><FaSignature/> Delivery Person Register</h1>
            <Row>
                <Col md = {6} className = {styles.logoContainer}>
                    <h1 className = {styles.brand}><FaHamburger/> Burpger</h1>
                    <div className = {styles.userType}>Delivery Person</div>
                </Col>
                <Col md = {6} className = {styles.formContainer}>
                    <h5>Already registered? <a
                        className = {styles.loginButton}
                            onClick = {redirectToDeliveryPersonLoginPage}
                        >
                            Login
                        </a>
                    </h5>
                    <Form>
                        <Form.Group className = {styles.inputField}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                className = {styles.inputArea}
                                type = "text"
                                placeholder = "Name"
                                onChange = {changeNameHandler}
                            />
                        </Form.Group>
                        <Form.Group className = {styles.inputField}>
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control
                                className = {styles.inputArea}
                                type = "number"
                                placeholder = "Mobile number"
                                onChange = {changePhoneNumberHandler}
                            />
                        </Form.Group>
                        <Form.Group className = {styles.inputField}>
                            <Form.Label>Aadhar Number</Form.Label>
                            <Form.Control
                                className = {styles.inputArea}
                                type = "number"
                                placeholder = "Aadhar number"
                                onChange = {changeAadharHandler}
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
                            onClick={() => {deliveryPersonRegistration(config)}}
                        >
                            <FaPen/> Register
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default DeliveryPersonRegister;