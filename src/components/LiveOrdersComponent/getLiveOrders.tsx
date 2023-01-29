import React, { useState, useEffect } from "react";

// Import router
import { useRouter } from "next/router";

// Import hooks provided by react-redux
import { useSelector, useDispatch } from "react-redux";

// Import common functions
import { getAllLiveOrdersList } from "../../commonFunctions/commonFunctions";

// Import axios
import axios from "axios";

// Import styles
import styles from "./liveOrdersComponent.module.css";

// Import react-bootstrap components
import { Container, Table, Button } from "react-bootstrap";

// Import react-icons
import { MdOutlineDeliveryDining } from "react-icons/md";

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
            {
                (!allLiveOrdersList && allLiveOrdersList !== undefined) 
                ? 
                <>
                    Loading...
                </>
                :
                <Container fluid className = {styles.tableContainer}>
                    <h1 className = {styles.pageHeader}><MdOutlineDeliveryDining/> Live Orders</h1>
                    <Table responsive className = {styles.table}>
                        <thead className = {styles.tableHeaders}>
                            <tr>
                                <th className = {styles.leftTableHeaders}>ID</th>
                                <th className = {styles.itemTableHeader}>Items</th>
                                <th className = {styles.centerTableHeaders}>Email</th>
                                <th className = {styles.centerTableHeaders}>Address</th>
                                <th className = {styles.centerTableHeaders}>Delivery Status</th>
                                <th className = {styles.centerTableHeaders}>Order Date</th>
                                <th className = {styles.centerTableHeaders}>Price</th>
                                <th className = {styles.rightTableHeaders}>Assign Order</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allLiveOrdersList?.data.map((singleOrder: any) => {
                                    return (
                                        <tr>
                                            <td className = {styles.tableRows}>{singleOrder?.id}</td>
                                            <td className = {styles.itemTableRow}>{singleOrder?.items}</td>
                                            <td className = {styles.tableRows}>{singleOrder?.email}</td>
                                            <td className = {styles.tableRows}>{singleOrder?.address}</td>
                                            <td className = {styles.tableRows}>{singleOrder?.delivery_status}</td>
                                            <td className = {styles.tableRows}>{singleOrder?.order_date}</td>
                                            <td className = {styles.tableRows}>{singleOrder?.price}</td>
                                            <td className = {styles.tableRows}>
                                                <Button
                                                    className = {styles.updateButton}
                                                    onClick = {() => {redirectToDeliveryAssigningPage(singleOrder?.id)}}
                                                >
                                                    Assign
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </Container>
            }
        </>
    )
}

export default AllLiveOrders;