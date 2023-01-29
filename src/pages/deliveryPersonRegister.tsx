import React, { useState, useEffect } from "react";

// Import head
import Head from "next/head";

// Import components
import DeliveryPersonRegister from "../components/DeliveryPersonRegister/deliveryPersonRegisterComponent";
import Footer from "../components/FooterComponent/footerComponent";

const DeliveryPersonRegisterComponent: React.FC = () => {
    return (
        <>
            <Head>
                <title>Delivery Register</title>
            </Head>
            <DeliveryPersonRegister/>
            <Footer/>
        </>
    )
}

export default DeliveryPersonRegisterComponent;