import React, { useState, useEffect } from "react";

// Import router
import { useRouter } from "next/router";

// Import hooks provided by react-redux
import { useSelector, useDispatch } from "react-redux";

// Import common functions
import { getAdminData } from "../commonFunctions/commonFunctions";

// Import components
import GetAllTheOrders from "../components/AllOrdersComponent/allOrdersComponents";
import AllLiveOrders from "../components/LiveOrdersComponent/getLiveOrders";
import GetCompleteInventoryItems from "../components/GetInventoryItems/getInventory";

// Import layout
import AdminLayoutComponent from "../Layout/adminLayout";

const AdminHome: React.FC = () => {
    const dispatch = useDispatch();

    const router = useRouter();

    const adminData = useSelector((state: any) => {return state?.admin?.adminData});

    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        const config = {
            headers: {
                "authorization": `Bearer ${localStorage?.getItem("access_token")}`
            }
        }

        setHydrated(true);

        getAdminData(dispatch,config);
    },[])

    console.log(adminData);

    // if (typeof window !== "undefined") {
    //     setTimeout(() => {
    //         localStorage.clear();
    //         router.push("/adminLogin");
    //         console.log(localStorage.getItem("access_token"));
    //     }, 60000)
    // }

    return (
        (hydrated && typeof window !== "undefined" && localStorage.getItem("access_token")) ? 
            <AdminLayoutComponent user = {`${adminData?.[0]?.firstname} ${adminData?.[0]?.lastname}`}>
                <GetAllTheOrders/>
                <GetCompleteInventoryItems/>
                <AllLiveOrders/>
            </AdminLayoutComponent>
        :
            <AdminLayoutComponent>
                <h1>You are not authorized...</h1>
            </AdminLayoutComponent>
    )
}

export default AdminHome;