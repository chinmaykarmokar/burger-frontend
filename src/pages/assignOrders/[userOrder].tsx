import React, { useState, useEffect } from "react";

// Import hooks provided by react-redux
import { useSelector, useDispatch } from "react-redux";

// Import head
import Head from "next/head";

// Import common functions
import { getAdminData } from "../../commonFunctions/commonFunctions";

// Import layout
import AdminLayoutComponent from "../../Layout/adminLayout";

// Import components
import AssignOrderComponent from "../../components/AssignOrderComponent/assignOrderComponent";

const UserOrder: React.FC = () => {
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
                <title>Assign Orders</title>
            </Head>
            <AssignOrderComponent/>
        </AdminLayoutComponent>
    )
}

export default UserOrder;