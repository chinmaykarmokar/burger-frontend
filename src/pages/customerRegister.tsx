import React from "react";

// Import layout
import CustomerLayoutComponent from "../Layout/customerLayout";

// Import components
import CustomerRegisterComponent from "../components/CustomerRegisterComponent/customerRegisterComponent";
import Footer from "../components/FooterComponent/footerComponent";

const CustomerRegister: React.FC = () => {
    return (
        <>
            <CustomerRegisterComponent/>
            <Footer/>
        </>
    )
}

export default CustomerRegister;