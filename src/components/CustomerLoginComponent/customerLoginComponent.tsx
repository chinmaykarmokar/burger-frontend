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
        <>
            <h1>Customer Login</h1>
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
                onClick={loginCustomer}
            >
                Login
            </button>
        </>
    )
}

export default CustomerLoginComponent;