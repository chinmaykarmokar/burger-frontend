import React, { useState, useEffect } from "react";

// Import hooks provided by react-redux
import { useSelector, useDispatch } from "react-redux";

// Import common functions
import { getCustomerDetails, getUserSpecificOrders } from "../../commonFunctions/commonFunctions";

// Import layout
import CustomerLayoutComponent from "../../Layout/customerLayout";

// Import components
import LoaderComponent from "../LoaderComponent/loader";

// Import styles
import styles from "./getUserOrders.module.css";

// Import react-bootstrap components 
import { Container, Row, Col, Card } from "react-bootstrap";

// Import react-icons
import { FaRegFile } from "react-icons/fa";
import { IoFastFoodOutline, IoPricetagOutline } from "react-icons/io5";

const GetUserOrders: React.FC = () => {
    const dispatch = useDispatch();

    const customerData = useSelector((state: any) => {return state?.customers?.getCustomerData});
    const ordersData = useSelector((state: any) => {return state?.customers?.userOrderData});

    useEffect(() => {
        const config = {
            headers: {
                "authorization": `Bearer ${localStorage?.getItem("customer_token")}` 
            }
        }

        getCustomerDetails(dispatch,config);
        getUserSpecificOrders(dispatch,config);
    },[])

    console.log(ordersData);

    return (
        <>
            {
                (!ordersData || ordersData == "undefined") ? 
                    <>
                        <LoaderComponent/>
                    </>
                :
                    <CustomerLayoutComponent user = {`${customerData?.[0]?.firstname} ${customerData?.[0]?.lastname}`}>
                        {
                            (ordersData?.length !== 0) ?
                            <Container fluid className = {styles.cartContainer}>
                                <h1 className = {styles.pageHeader}><FaRegFile/> Your Orders</h1>
                                <Row>
                                    <Col md = {8} className = {styles.cartCardCol}>
                                    {
                                        ordersData?.map((singleOrder: any) => {
                                            return (
                                                <Card className = {styles.cartCard}>
                                                    <h3><IoFastFoodOutline/> {singleOrder?.items}</h3>
                                                    <h4><IoPricetagOutline/> ₹ {singleOrder?.price}</h4>
                                                    <h4 className = {styles.orderStatus}>{singleOrder?.delivery_status}</h4>
                                                </Card>
                                            )
                                        })
                                    }
                                    </Col>
                                    <Col md = {4}></Col>
                                </Row>
                            </Container>
                            :
                            <>
                                No orders available
                            </>
                        }
                    </CustomerLayoutComponent>
            }
        </>
    )
}

export default GetUserOrders;