import React, { useState, useEffect } from "react";

// Import router
import { useRouter } from "next/router";

// Import hooks provided by react-redux
import { useSelector, useDispatch } from "react-redux";

// Import axios
import axios from "axios";

// Import actions
import { loginDeliveryPerson } from "../../state/actions/deliveryPersonActions";

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
        <>
            <h1>Delivery person login</h1>
            <input
                type = "email"
                placeholder = "Email"
                onChange = {changeEmailHandler}
            />
            <input
                type = "password"
                placeholder = "Password"
                onChange = {changePasswordHandler}
            />
            <button
                onClick = {() => {loginDeliveryPersonHandler(config)}}
            >
                Login
            </button>
        </>
    )
}

export default DeliveryPersonLogin;