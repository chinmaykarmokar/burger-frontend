import React, { useState, useEffect } from "react";

// Import router
import { useRouter } from "next/router";

// Import components
import GetAllTheOrders from "../components/AllOrdersComponent/allOrdersComponents";
import GetCompleteInventoryItems from "../components/GetInventoryItems/getInventory";

const AdminHome: React.FC = () => {
    const router = useRouter();

    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    },[])

    // if (typeof window !== "undefined") {
    //     setTimeout(() => {
    //         localStorage.clear();
    //         router.push("/adminLogin");
    //         console.log(localStorage.getItem("access_token"));
    //     }, 60000)
    // }

    return (
        (hydrated && typeof window !== "undefined" && localStorage.getItem("access_token")) ? 
            <>
                <GetAllTheOrders/>
                <GetCompleteInventoryItems/>
            </>
        :
            <>
                <h1>You are not authorized...</h1>
            </>
    )
}

export default AdminHome;