import React, { useState, useEffect } from "react";

// Import axios
import axios from "axios";

// Import actions for admin
import { getAllCompletedOrders } from "../../state/actions/adminActions";

// Import hooks provided by react-redux
import { useSelector, useDispatch } from "react-redux";

const GetAllTheOrders: React.FC = () => {
    const dispatch = useDispatch();

    const completedOrders = useSelector((state: any) => {return state?.admin?.completedOrdersData})

    const config = {
        headers: {
            "authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
    }

    const fetchAllCompletedOrders = async () => {
        await axios.get("http://localhost:3000/api/admin/getAllCompletedOrders", config)
        .then((response) => {
            dispatch(getAllCompletedOrders(response?.data));
            // console.log(response.data);
        })
    }

    useEffect(() => {
        fetchAllCompletedOrders();
    }, [])

    console.log(completedOrders?.data);

    return (
        <>
            <h1>Hello Admin, welcome back!</h1>
            {
                (!completedOrders && completedOrders == undefined) ?
                <>
                    Loading....
                </>
                :
                <>   
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Items</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Delivery Status</th>
                            <th>Order Date</th>
                            <th>Price</th>
                        </tr>
                        
                            {completedOrders?.data.map((singleOrder: any) => {
                                return (
                                    <tr>
                                        <td>{singleOrder?.id}</td>
                                        <td>{singleOrder?.items}</td>
                                        <td>{singleOrder?.email}</td>
                                        <td>{singleOrder?.address}</td>
                                        <td>{singleOrder?.delivery_status}</td>
                                        <td>{singleOrder?.order_date.toLocaleString("en-US")}</td>
                                        <td>{singleOrder?.price}</td>
                                    </tr>
                                )
                            })}
                    </table>
                </>
            } 
        </>
    )
}

export default GetAllTheOrders;