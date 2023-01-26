import React from "react";

// Import components
import DeliveryPersonNavbarComponent from "../components/DeliveryPersonNavbar/deliveryPersonNavbar";
import Footer from "../components/FooterComponent/footerComponent";

const DeliveryPersonLayout = ({ user, children }:any) => {
    return (
        <>
            <DeliveryPersonNavbarComponent loggedInPerson = {user}/>
                {children}
            <Footer/>
        </>
    )
}

export default DeliveryPersonLayout;