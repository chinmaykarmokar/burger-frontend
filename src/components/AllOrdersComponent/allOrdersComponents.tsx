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

// Import react-icons
import { FaHourglass } from "react-icons/fa";

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
                    <h1 className = {styles.pageHeader}><FaHourglass/> Completed Orders</h1>  
                    <Table responsive className = {styles.table}>
                        <thead className = {styles.tableHeaders}>
                            <tr>
                                <th className = {styles.leftTableHeaders}>ID</th>
                                <th className = {styles.itemTableHeader}>Items</th>
                                <th className = {styles.centerTableHeaders}>Email</th>
                                <th className = {styles.centerTableHeaders}>Address</th>
                                <th className = {styles.centerTableHeaders}>Delivery Status</th>
                                <th className = {styles.centerTableHeaders}>Order Date</th>
                                <th className = {styles.rightTableHeaders}>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {completedOrders?.data.map((singleOrder: any) => {
                                return (
                                    <tr>
                                        <td className = {styles.tableRows}>{singleOrder?.id}</td>
                                        <td className = {styles.itemTableRow}>{singleOrder?.items}</td>
                                        <td className = {styles.tableRows}>{singleOrder?.email}</td>
                                        <td className = {styles.tableRows}>{singleOrder?.address}</td>
                                        <td className = {styles.tableRows}>{singleOrder?.delivery_status}</td>
                                        <td className = {styles.tableRows}>{singleOrder?.order_date.toLocaleString("en-US")}</td>
                                        <td className = {styles.tableRows}>{singleOrder?.price}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Container>
            } 
        </>
    )
}

export default GetAllTheOrders;