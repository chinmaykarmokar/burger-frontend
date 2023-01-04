import React, { useState, useEffect } from "react";

// Import Next Router
import { useRouter } from "next/router";

// Import Actions
import { loginAdmin } from "../../state/actions/adminActions";

// Import hooks provided by React-Redux
import { useSelector, useDispatch } from "react-redux";

// import axios
import axios from "axios";

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
        })
    }

    return (
        <>
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
                onClick={adminLoginHandler}
            >
                Login
            </button>
        </>
    )
}

export default AdminLoginComponent;