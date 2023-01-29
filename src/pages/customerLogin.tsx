import React from "react";

// Import head
import Head from "next/head";

// Import components
import CustomerLoginComponent from "../components/CustomerLoginComponent/customerLoginComponent";
import Footer from "../components/FooterComponent/footerComponent";

const CustomerLogin: React.FC = () => {
    return (
        <>
            <Head>
                <title>Customer Login</title>
            </Head>
            <CustomerLoginComponent/>
            <Footer/>
        </>
    )
}

export default CustomerLogin;