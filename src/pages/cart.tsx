import React from "react";

// Import head
import Head from "next/head";

// Import components
import CartComponent from "../components/GetCartItems/getCartItems";

const Cart: React.FC = () => {
    return (
        <>
            <Head>
                <title>Your Cart</title>
            </Head>
            <CartComponent/>
        </>
    )
}

export default Cart;