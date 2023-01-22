import React, { useState, useEffect } from "react";

// Import router
import { useRouter } from "next/router";

// Import hooks provided by react-redux
import { useSelector, useDispatch } from "react-redux";

// Import axios
import axios from "axios";

// Import actions
import { loginDeliveryPerson } from "../../state/actions/deliveryPersonActions";

// Import styles
import styles from "./deliveryPersonLogin.module.css";

// Import react-bootstrap components
import { Container, Row, Col, Form, Button } from "react-bootstrap";

// Import react-icons
import { FaSignature, FaHamburger } from "react-icons/fa";
import { RiLoginCircleFill } from "react-icons/ri";

const DeliveryPersonLogin: React.FC = () => {
    const dispatch = useDispatch();

    const router = useRouter();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [config, setConfig] = useState<any>();

    const changeEmailHandler = (event: any) => {
        setEmail(event.target.value);
    } 

    const changePasswordHandler = (event: any) => {
        setPassword(event.target.value);
    }

    const loginDeliveryPersonHandler = async (configParams: Object) => {
        const deliveryPersonLoginDetails = {
            email: email,
            password: password
        }

        axios.post("http://localhost:3000/api/delivery/deliveryLogin", deliveryPersonLoginDetails, configParams)
        .then((response) => {
            localStorage.setItem("delivery_person_token", response?.data?.accessToken);
            dispatch(loginDeliveryPerson(response.data));
            console.log(response?.data);

            if (response?.data?.accessToken) {
                router.push("/deliveryPersonHome");
            }
            else {
                router.push("/deliveryPersonLogin");
            }
        })
    }

    useEffect(() => {
        const config: Object = {
            headers: {
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }

        setConfig(config);
    },[])

    return (
        <Container fluid className = {styles.customerRegForm}>
            <h1 className = {styles.pageHeader}><FaSignature/> Delivery person login</h1>
            <Row>
                <Col md = {6} className = {styles.logoContainer}>
                    <h1 className = {styles.brand}><FaHamburger/> Burpger</h1>
                    <div className = {styles.userType}>DeliveryPerson</div>
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
                            <Form.Label>Email ID</Form.Label>
                            <Form.Control
                                className = {styles.inputArea}
                                type = "password"
                                placeholder = "Password"
                                onChange = {changePasswordHandler}
                            />
                        </Form.Group>
                        <Button
                            className = {styles.registerButton}
                            onClick = {() => {loginDeliveryPersonHandler(config)}}
                        >
                            <RiLoginCircleFill/> Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </ Container>
    )
}

export default DeliveryPersonLogin;