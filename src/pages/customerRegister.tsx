import React from "react";

// Import head
import Head from "next/head";

// Import layout
import CustomerLayoutComponent from "../Layout/customerLayout";

// Import components
import CustomerRegisterComponent from "../components/CustomerRegisterComponent/customerRegisterComponent";
import Footer from "../components/FooterComponent/footerComponent";

const CustomerRegister: React.FC = () => {
    return (
        <>
            <Head>
                <title>Customer Register</title>
            </Head>
            <CustomerRegisterComponent/>
            <Footer/>
        </>
    )
}

export default CustomerRegister;