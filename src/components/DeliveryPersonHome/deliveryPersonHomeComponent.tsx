import React, { useState, useEffect } from "react";

// Import router
import { useRouter } from "next/router";

// Import hooks provided by react-redux
import { useSelector, useDispatch } from "react-redux";

// Import axios
import axios from "axios";

// Import common functions
import { getDeliveryPersonDetails } from "../../commonFunctions/commonFunctions";
import { fetchAssignedOrders } from "../../commonFunctions/commonFunctions";
import { completeOrder } from "../../state/actions/deliveryPersonActions";

// Import layout
import DeliveryPersonLayout from "../../Layout/deliveryPersonLayout";

// Import styles
import styles from "./deliveryPersonHome.module.css";

// Import react-bootstrap components
import { Container, Row, Col, Card, Button } from "react-bootstrap";

// Import react-icons
import { MdOutlineAssignment } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";
import { BsInboxes } from "react-icons/bs";

// Import components
import LoaderComponent from "../LoaderComponent/loader";


const DeliveryPersonHomeComponent: React.FC = () => {
    const dispatch = useDispatch();

    const router = useRouter();

    const orderAssigned = useSelector((state: any) => {return state?.deliveryPersons?.assignedOrderData});
    const delPersonData = useSelector((state: any) => {return state?.deliveryPersons?.deliveryPersonData});

    const [config,setConfig] = useState<any>();

    const completeExistingOrder = async (configParams: Object) => {
        const orderUpdateData = {
            status: "available",
            items_to_be_delivered: " ",
            delivery_address: " ",
            order_id: 0
        }

        await axios.post("https://burpger-1yxc.onrender.com/api/delivery/orderCompletion", orderUpdateData, configParams)
        .then((response) => {
            dispatch(completeOrder(response.data));
            console.log(response.data);
            router.reload();
        })
    }

    useEffect(() => {
        const config = {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("delivery_person_token")}`,
                "content-type": "application/json",
                "Access-Control-ALlow-Origin": "*"
            }
        }

        setConfig(config);

        fetchAssignedOrders(dispatch,config);
        getDeliveryPersonDetails(dispatch,config);
    },[])

    console.log(orderAssigned);
    console.log(delPersonData);

    return (
        <>
            {
                (!orderAssigned || orderAssigned == "undefined") ?
                    <Container fluid>
                        <LoaderComponent/>
                    </Container>
                :
                    <DeliveryPersonLayout user = {`${delPersonData?.[0]?.name}`}>               
                        <Container fluid className = {styles.cartContainer}>
                            <h1 className = {styles.pageHeader}><MdOutlineAssignment/> Orders Assigned</h1>
                            <Row>
                                <Col md = {8} className = {styles.cartCardCol}>
                                {
                                    (orderAssigned?.length === 0) ? 
                                        <h1 className = {styles.noOrdersHeader}>You have no orders assigned.</h1>
                                    :
                                    orderAssigned?.map((singleOrder: any) => {
                                        return (
                                            <Card className = {styles.cartCard}>
                                                <h3><BsInboxes/> Order: {singleOrder?.order_id}</h3>
                                                <h3><FaAddressCard/> Address: {singleOrder?.delivery_address}</h3>
                                                <Button
                                                    className = {styles.completeOrderButton}
                                                    onClick = {() => {completeExistingOrder(config)}}
                                                >
                                                    Complete Delivery
                                                </Button>
                                            </Card>
                                        )
                                    })    
                                }
                                </Col>
                                <Col md = {4}></Col>
                            </Row>
                        </Container>               
                    </DeliveryPersonLayout>
            }
        </>
    )
}

export default DeliveryPersonHomeComponent;