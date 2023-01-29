import React from "react";

// Import head
import Head from "next/head";

// Import components
import GetUserOrders from "../components/GetUserOrders/getUserOrders";

const GetOrders: React.FC = () => {
    return (
        <>
            <Head>
                <title>Your Orders</title>
            </Head>
            <GetUserOrders/>
        </>
    )
}

export default GetOrders;