import React, { useState, useEffect } from "react";

// Import router
import { useRouter } from "next/router";

// Import components
import UpdateInventoryComponent from "../../components/UpdateInventory/updateInventoryComponent";

const InventoryUpdateComponent: React.FC = () => {
    const router = useRouter();

    return (
        <>
           <UpdateInventoryComponent/> 
        </>
    )
}

export default InventoryUpdateComponent;