import React from "react";

// Import head
import Head from "next/head";

// Import components
import GetCustomerComponent from "../components/GetCustomerComponent/getCustomerComponent";

const CustomerHome: React.FC = () => {
    return (
        <>
            <Head>
                <title>Burpger | Customer</title>
            </Head>
            <GetCustomerComponent/>
        </>
    )
}

export default CustomerHome;