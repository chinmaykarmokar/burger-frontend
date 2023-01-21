import React, { useState, useEffect } from "react";

// Import components
import DeliveryPersonRegister from "../components/DeliveryPersonRegister/deliveryPersonRegisterComponent";
import Footer from "../components/FooterComponent/footerComponent";

const DeliveryPersonRegisterComponent: React.FC = () => {
    return (
        <>
            <DeliveryPersonRegister/>
            <Footer/>
        </>
    )
}

export default DeliveryPersonRegisterComponent;