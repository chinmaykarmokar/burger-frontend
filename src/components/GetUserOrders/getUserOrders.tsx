import React, { useState, useEffect } from "react";

// Import hooks provided by react-redux
import { useSelector, useDispatch } from "react-redux";

// Import common functions
import { getUserSpecificOrders } from "../../commonFunctions/commonFunctions";

const GetUserOrders: React.FC = () => {
    const dispatch = useDispatch();

    const ordersData = useSelector((state: any) => {return state?.customers?.userOrderData});

    useEffect(() => {
        const config = {
            headers: {
                "authorization": `Bearer ${localStorage?.getItem("customer_token")}` 
            }
        }

        getUserSpecificOrders(dispatch,config);
    },[])

    console.log(ordersData);

    return (
        <>
            <h1>Your Orders</h1>
            {
                ordersData?.map((singleOrder: any) => {
                    return (
                        <div>
                            <h3>{singleOrder?.items}</h3>
                            <h4>Price: {singleOrder?.price}</h4>
                            <h4>Delivery Status: {singleOrder?.delivery_status}</h4>
                        </div>
                    )
                })
            }
        </>
    )
}

export default GetUserOrders;