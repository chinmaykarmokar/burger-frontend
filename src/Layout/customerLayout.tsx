import React from "react";

// Import Components
import CustomerNavbarComponent from "../components/NavbarComponent/customerNavbarComponent";
import Footer from "../components/FooterComponent/footerComponent";

const LayoutComponent = ({ user, children }: any) => {
    return (
        <>
            <CustomerNavbarComponent loggedInPerson = {user}/>
                {children}
            <Footer/>
        </>
    )
}

export default LayoutComponent;