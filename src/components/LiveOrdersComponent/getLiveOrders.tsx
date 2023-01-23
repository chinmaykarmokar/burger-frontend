import React, { useState, useEffect } from "react";

// Import router
import { useRouter } from "next/router";

// Import hooks provided by react-redux
import { useSelector, useDispatch } from "react-redux";

// Import common functions
import { getAllLiveOrdersList } from "../../commonFunctions/commonFunctions";

// Import axios
import axios from "axios";

const AllLiveOrders: React.FC = () => {
    const dispatch = useDispatch();

    const router = useRouter();

    const allLiveOrdersList = useSelector((state: any) => {return state?.admin?.liveOrdersData});

    useEffect(() => {
        const config = {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        }

        getAllLiveOrdersList(dispatch, config);
    },[])

    const redirectToDeliveryAssigningPage = (orderID: number) => {
        router.push(`/assignOrders/${orderID}`)
    }

    console.log(allLiveOrdersList);
    
    return (
        <>
            <h1>Get all live orders</h1>
            {
                (!allLiveOrdersList && allLiveOrdersList !== undefined) 
                ? 
                <>
                    Loading...
                </>
                :
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Items</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Delivery Status</th>
                        <th>Order Date</th>
                        <th>Price</th>
                        <th>Assign Order</th>
                    </tr>
                    {
                        allLiveOrdersList?.data.map((singleOrder: any) => {
                            return (
                                <tr>
                                    <td>{singleOrder?.id}</td>
                                    <td>{singleOrder?.items}</td>
                                    <td>{singleOrder?.email}</td>
                                    <td>{singleOrder?.address}</td>
                                    <td>{singleOrder?.delivery_status}</td>
                                    <td>{singleOrder?.order_date}</td>
                                    <td>{singleOrder?.price}</td>
                                    <td>
                                        <button
                                            onClick = {() => {redirectToDeliveryAssigningPage(singleOrder?.id)}}
                                        >
                                            Assign
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </table>
            }
        </>
    )
}

export default AllLiveOrders;