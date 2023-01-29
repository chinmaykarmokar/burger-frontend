import React from "react";

// Import head
import Head from "next/head";

// Import components
import DeliveryPersonLogin from "../components/DeliveryPersonLogin/deliveryPersonLoginComponent";
import Footer from "../components/FooterComponent/footerComponent";

const deliveryPersonLoginComponent: React.FC = () => {
    return (
        <>
            <Head>
                <title>Delivery Login</title>
            </Head>
            <DeliveryPersonLogin/>
            <Footer/>
        </>
    )
}

export default deliveryPersonLoginComponent;