import React, { useState, useEffect } from "react";

// Import hooks provided by react-redux
import { useSelector, useDispatch } from "react-redux";

// Import common functions
import { fetchCompleteMenuAdmin } from "../../commonFunctions/commonFunctions";

// Import styles
import styles from "./totalMenuItems.module.css";

// Import react-bootstrap
import { Card } from "react-bootstrap";

// Import react-icons
import { MdOutlineRestaurantMenu } from "react-icons/md";

const TotalMenuItemsCard: React.FC = () => {
    const dispatch = useDispatch();

    const allMenuData = useSelector((state: any) => {return state?.admin?.completeMenuData});

    useEffect(() => {
        const config = {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        }

        fetchCompleteMenuAdmin(dispatch,config);
    },[])

    console.log(allMenuData);

    return (
        <Card className = {styles.mainCard}>
            <Card.Title className = {styles.userType}><MdOutlineRestaurantMenu/> Menu Items</Card.Title>
            <Card.Text className = {styles.count}>{allMenuData?.length}</Card.Text>
        </Card>
    )
} 

export default TotalMenuItemsCard;