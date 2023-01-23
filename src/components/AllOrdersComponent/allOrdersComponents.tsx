import React, { useState, useEffect } from "react";

// Import axios
import axios from "axios";

// Import common functions
import { fetchAllCompletedOrders } from "../../commonFunctions/commonFunctions";

// Import hooks provided by react-redux
import { useSelector, useDispatch } from "react-redux";

// Import styles
import styles from "./allOrdersComponent.module.css";

// Import react-bootstrap components
import { Container, Row, Col, Table } from "react-bootstrap";

const GetAllTheOrders: React.FC = () => {
    const dispatch = useDispatch();

    const completedOrders = useSelector((state: any) => {return state?.admin?.completedOrdersData})

    useEffect(() => {
        const config = {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        }

        fetchAllCompletedOrders(dispatch,config);
    }, [])

    console.log(completedOrders?.data);

    return (
        <>
            {
                (!completedOrders && completedOrders == undefined) ?
                <>
                    Loading....
                </>
                :
                <Container fluid className = {styles.tableContainer}>   
                    <Table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Items</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Delivery Status</th>
                                <th>Order Date</th>
                                <th>Price</th>
                            </tr>
                        </thead>
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
                    </Table>
                </Container>
            } 
        </>
    )
}

export default GetAllTheOrders;