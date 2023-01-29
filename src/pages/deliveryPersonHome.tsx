import React from "react";

// Import head
import Head from "next/head";

// Import components
import DeliveryPersonHomeComponent from "../components/DeliveryPersonHome/deliveryPersonHomeComponent";

const DeliveryPersonHome: React.FC = () => {
    return (
        <>
            <Head>
                <title>Burpger | Delivery</title>
            </Head>
            <DeliveryPersonHomeComponent/>
        </>
    )
}

export default DeliveryPersonHome;