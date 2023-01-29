import React, { useState, useEffect } from "react";

// Import hooks provided by react-redux
import { useSelector, useDispatch } from "react-redux";

// Import head
import Head from "next/head";

// Import common functions
import { getAdminData } from "../commonFunctions/commonFunctions";

// Import components
import AdminLayoutComponent from "../Layout/adminLayout";
import AllLiveOrders from "../components/LiveOrdersComponent/getLiveOrders";

const GetInventoryPage: React.FC = () => {
    const dispatch = useDispatch();

    const adminInfo = useSelector((state: any) => {return state?.admin?.adminData});

    useEffect(() => {
        const config = {
            headers: {
                "authorization": `Bearer ${localStorage?.getItem("access_token")}`
            }
        } 

        getAdminData(dispatch,config);
    },[])

    return (
        <AdminLayoutComponent user = {`${adminInfo?.[0]?.firstname} ${adminInfo?.[0]?.lastname}`}>
            <Head>
                <title>Live Orders</title>
            </Head>
            <AllLiveOrders/>
        </AdminLayoutComponent>
    )
}

export default GetInventoryPage;