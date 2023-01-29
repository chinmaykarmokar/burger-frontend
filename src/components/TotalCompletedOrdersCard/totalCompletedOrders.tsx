import React, { useState, useEffect } from "react";

// Import hooks provided by react-redux
import { useSelector, useDispatch } from "react-redux";

// Import common functions
import { fetchAllCompletedOrders } from "../../commonFunctions/commonFunctions";

// Import styles
import styles from "./totalCompletedOrders.module.css";

// Import react-bootstrap
import { Card } from "react-bootstrap";

// Import react-icons
import { FaHourglass } from "react-icons/fa";

const TotalCompletedOrdersCard: React.FC = () => {
    const dispatch = useDispatch();

    const allCompletedOrdersData = useSelector((state: any) => {return state?.admin?.completedOrdersData});

    useEffect(() => {
        const config = {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("access_token")}`,
                "Access-Control-Allow-Origin": "*"
            }
        }

        fetchAllCompletedOrders(dispatch,config);
    },[])

    console.log(allCompletedOrdersData);

    return (
        <Card className = {styles.mainCard}>
            <Card.Title className = {styles.userType}><FaHourglass/> Completed Orders</Card.Title>
            <Card.Text className = {styles.count}>{allCompletedOrdersData?.data?.length}</Card.Text>
        </Card>
    )
} 

export default TotalCompletedOrdersCard;