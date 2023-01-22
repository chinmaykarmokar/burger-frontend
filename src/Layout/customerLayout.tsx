import React from "react";

// Import Components
import CustomerNavbarComponent from "../components/CustomerNavbarComponent/customerNavbarComponent";
import Footer from "../components/FooterComponent/footerComponent";

const CustomerLayoutComponent = ({ user, children }: any) => {
    return (
        <>
            <CustomerNavbarComponent loggedInPerson = {user}/>
                {children}
            <Footer/>
        </>
    )
}

export default CustomerLayoutComponent;