import React, { useState, useEffect } from "react";

// Import router
import { useRouter } from "next/router";

// Import hooks provided by react-redux
import { useSelector, useDispatch } from "react-redux";

// Import actions
import { createCustomerProfile } from "../../state/actions/customerActions";

// Import Axios
import axios from "axios";

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

    return (
        <>
            <h1>Customer Register</h1>
            <input
                type = "text"
                placeholder = "Firstname"
                onChange = {changeFirstNameHandler}
            />
            <input
                type = "text"
                placeholder = "Lastname"
                onChange = {changeLastNameHandler}
            />
            <input
                type = "number"
                placeholder = "Age"
                onChange = {changeAgeHandler}
            />
            <input
                type = "text"
                placeholder = "Address"
                onChange = {changeAddressHandler}
            />
            <input
                type = "number"
                placeholder = "Mobile"
                onChange = {changeMobileHandler}
            />
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
                onClick={registerCustomer}
            >
                Register
            </button>
        </>
    )
}

export default CustomerRegisterComponent;