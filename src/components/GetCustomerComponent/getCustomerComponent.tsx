import React, { useState, useEffect } from "react";

// Import router
import { useRouter } from "next/router";

// Import hooks provided by react-redux
import { useSelector, useDispatch } from "react-redux";

// Import axios
import axios from "axios";

// Import actions
import { getCustomer } from "../../state/actions/customerActions";

const GetCustomerComponent: React.FC = () => {
    const dispatch = useDispatch();

    const customerData = useSelector((state: any) => {return state?.customers?.getCustomerData});

    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    },[])

    const getSingleCustomerData = async (configParams: Object) => {
        await axios.get("http://localhost:3000/api/customers/allCustomers", configParams)
        .then((response) => {
            dispatch(getCustomer(response?.data?.data));
            // console.log(response?.data?.data[0])
        })
    }

    useEffect(() => {
        const config = {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("customer_token")}`
            }
        }   

        getSingleCustomerData(config);
    },[])

    console.log(customerData);

    return (
        <>
            {
                (hydrated && typeof(window) !== "undefined" && localStorage.getItem("customer_token")) ?
                    <h1>Welcome {customerData[0]?.firstname} {customerData[0]?.lastname}</h1>
                :
                    <h1>You are not authorized.</h1>
            }
        </>
    )
}

export default GetCustomerComponent;