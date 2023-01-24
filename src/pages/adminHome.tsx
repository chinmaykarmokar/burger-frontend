import React, { useState, useEffect } from "react";

// Import router
import { useRouter } from "next/router";

// Import hooks provided by react-redux
import { useSelector, useDispatch } from "react-redux";

// Import common functions
import { getAdminData } from "../commonFunctions/commonFunctions";

// Import components
import GetAllTheOrders from "../components/AllOrdersComponent/allOrdersComponents";
import AllLiveOrders from "../components/LiveOrdersComponent/getLiveOrders";
import GetCompleteInventoryItems from "../components/GetInventoryItems/getInventory";
import TotalCustomersCard from "../components/TotalCustomersCardComponent/totalCustomersCard";
import TotalCompletedOrdersCard from "../components/TotalCompletedOrdersCard/totalCompletedOrders";
import TotalLiveOrdersCard from "../components/TotalLiveOrdersComponent/totalLiveOrdersCard";
import TotalMenuItemsCard from "../components/TotalMenuItems/totalMenuItemsCard";

// Import layout
import AdminLayoutComponent from "../Layout/adminLayout";

// Import styles
import styles from "../../styles/AdminHome.module.css";

// Import react-bootstrap components
import { Container, Row, Col, Card } from "react-bootstrap";

// Import react-icons
import { BiStats, BiDetail } from "react-icons/bi";

const AdminHome: React.FC = () => {
    const dispatch = useDispatch();

    const router = useRouter();

    const adminData = useSelector((state: any) => {return state?.admin?.adminData});

    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        const config = {
            headers: {
                "authorization": `Bearer ${localStorage?.getItem("access_token")}`
            }
        }

        setHydrated(true);

        getAdminData(dispatch,config);
    },[])

    console.log(adminData);

    const redirectToInventoryPage = () => {
        router.push("/getInventoryPage");
    }

    const redirectToCompletedOrdersPage = () => {
        router.push("/completedOrdersPage");
    }

    const redirectToLiveOrdersPage = () => {
        router.push("/liveOrdersPage");
    }

    // if (typeof window !== "undefined") {
    //     setTimeout(() => {
    //         localStorage.clear();
    //         router.push("/adminLogin");
    //         console.log(localStorage.getItem("access_token"));
    //     }, 60000)
    // }

    return (
        (hydrated && typeof window !== "undefined" && localStorage.getItem("access_token")) ? 
            <AdminLayoutComponent user = {`${adminData?.[0]?.firstname} ${adminData?.[0]?.lastname}`}>
                <Container fluid className = {styles.cardsContainer}>
                    <h1 className = {styles.pageHeader1}><BiStats/> Statistics Overview</h1>
                    <Row>
                        <Col md ={3}>
                            <TotalCustomersCard/>
                        </Col>
                        <Col md ={3}>
                            <TotalCompletedOrdersCard/>
                        </Col>
                        <Col md ={3}>
                            <TotalLiveOrdersCard/>
                        </Col>
                        <Col md ={3}>
                            <TotalMenuItemsCard/>
                        </Col>
                    </Row>
                </Container>
                <Container fluid className = {styles.cardsContainer}>
                    <h1 className = {styles.pageHeader1}><BiDetail/> Detailed Stats</h1>
                    <Row>
                        <Col>
                            <Card
                                onClick = {redirectToInventoryPage}
                                className = {styles.detailedCards}
                            >
                                <Card.Title className = {styles.cardTitle}>Inventory</Card.Title>
                                <Card.Text>View inventory and update items.</Card.Text>
                            </Card>
                        </Col>
                        <Col>
                            <Card
                                onClick = {redirectToCompletedOrdersPage}
                                className = {styles.detailedCards}
                            >
                                <Card.Title className = {styles.cardTitle}>Completed Orders</Card.Title>
                                <Card.Text>View completed orders.</Card.Text>
                            </Card>
                        </Col>
                        <Col>
                            <Card 
                                onClick = {redirectToLiveOrdersPage}
                                className = {styles.detailedCards}
                            >
                                <Card.Title className = {styles.cardTitle}>Live Orders</Card.Title>
                                <Card.Text>View all live orders.</Card.Text>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                {/* <GetAllTheOrders/> */}
                {/* <GetCompleteInventoryItems/>
                <AllLiveOrders/> */}
            </AdminLayoutComponent>
        :
            <AdminLayoutComponent>
                <h1>You are not authorized...</h1>
            </AdminLayoutComponent>
    )
}

export default AdminHome;