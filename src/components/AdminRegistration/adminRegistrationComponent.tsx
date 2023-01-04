import React, { useState, useEffect } from "react";

// Import axios
import axios from "axios";

// Import hooks provided by react-redux
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

// Import all admin actions
import { createAdminProfile } from "../../state/actions/adminActions";

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

        await axios.post('http://localhost:3000/api/admin/adminRegister', adminDetailsToRegister, config)
        .then((response) => {
            dispatch(createAdminProfile(response.data));
            setPostStatus(true);
            console.log(response.data);
        })

        setTimeout(() => {
            router.push("/adminLogin")
        },3000)
    }

    return (
        <>
            <input
                type = "text"
                placeholder = "First Name"
                onChange = {changeFirstNameHandler}
            />
            <input
                type = "text"
                placeholder = "Last Name"
                onChange = {changeLastNameHandler}
            />
            <input
                type = "email"
                placeholder = "Email"
                onChange = {changeEmailHandler}
            />
            <input
                type = "number"
                placeholder = "Mobile"
                onChange = {changeMobileHandler}
            />
            <input
                type = "password"
                placeholder = "Password"
                onChange = {changePasswordHandler}
            />
            <button
                onClick={registerAdmin}
            >
                Register
            </button>
        </>
    )
}

export default AdminRegistrationComponent;