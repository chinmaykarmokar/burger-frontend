import React, { useState, useEffect } from "react";

// Import hooks provided by react-redux
import { useSelector, useDispatch } from "react-redux";

// Import common functions
import { getAllCustomersDetails } from "../../commonFunctions/commonFunctions";

// Import styles
import styles from "./totalCustomersCard.module.css";

// Import react-bootstrap
import { Card } from "react-bootstrap";

// Import react-icons
import { FaUsers } from "react-icons/fa";

const TotalCustomersCard: React.FC = () => {
    const dispatch = useDispatch();

    const allCustomersData = useSelector((state: any) => {return state?.admin?.allCustomers});

    useEffect(() => {
        const config = {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        }

        getAllCustomersDetails(dispatch,config);
    },[])

    console.log(allCustomersData);

    return (
        <Card className = {styles.mainCard}>
            <Card.Title className = {styles.userType}><FaUsers/> Customers</Card.Title>
            <Card.Text className = {styles.count}>{allCustomersData?.length}</Card.Text>
        </Card>
    )
} 

export default TotalCustomersCard;