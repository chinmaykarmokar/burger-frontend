import React, { useState, useEffect } from "react";

// Import hooks provided by react-redux
import { useSelector, useDispatch } from "react-redux";

// Import common functions
import { getAllLiveOrdersList } from "../../commonFunctions/commonFunctions";

// Import styles
import styles from "./totalLiveOrders.module.css";

// Import react-bootstrap
import { Card } from "react-bootstrap";

// Import react-icons
import { MdOutlineDeliveryDining } from "react-icons/md";

const TotalLiveOrdersCard: React.FC = () => {
    const dispatch = useDispatch();

    const allLiveOrdersData = useSelector((state: any) => {return state?.admin?.liveOrdersData});

    useEffect(() => {
        const config = {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        }

        getAllLiveOrdersList(dispatch,config);
    },[])

    console.log(allLiveOrdersData);

    return (
        <Card className = {styles.mainCard}>
            <Card.Title className = {styles.userType}><MdOutlineDeliveryDining/> Live Orders</Card.Title>
            <Card.Text className = {styles.count}>{allLiveOrdersData?.data?.length}</Card.Text>
        </Card>
    )
} 

export default TotalLiveOrdersCard;