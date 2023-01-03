import React, { useState, useEffect } from "react";

// Import axios
import axios from "axios";

// Import hooks provided by react-redux
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

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

    return (
        <>
            <input
                type = "text"
                placeholder = "First Name"
            />
            <input
                type = "text"
                placeholder = "Last Name"
            />
            <input
                type = "email"
                placeholder = "Email"
            />
            <input
                type = "number"
                placeholder = "Mobile"
            />
            <input
                type = "password"
                placeholder = "Password"
            />
            <button>
                Register
            </button>
        </>
    )
}

export default AdminRegistrationComponent;