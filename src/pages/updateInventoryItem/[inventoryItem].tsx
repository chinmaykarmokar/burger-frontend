import React, { useState, useEffect } from "react";

// Import router
import { useRouter } from "next/router";

// Import head
import Head from "next/head";

// Import components
import UpdateInventoryComponent from "../../components/UpdateInventory/updateInventoryComponent";

const InventoryUpdateComponent: React.FC = () => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Update Inventory</title>
            </Head>
            <UpdateInventoryComponent/> 
        </>
    )
}

export default InventoryUpdateComponent;