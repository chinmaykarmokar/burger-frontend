import React, { useState, useEffect } from "react";

// Import router;
import { useRouter } from "next/router";

// Import hooks provided by react-redux
import { useSelector, useDispatch } from "react-redux";

// Import axios
import axios from "axios";

// Import actions
import { fetchOrderAndDeliveryPerson } from "../../state/actions/adminActions";
import { assignOrderToDeliveryPerson } from "../../state/actions/adminActions";
import { singleOrder } from "../../state/actions/adminActions";

// Import styles
import styles from "./assignOrderComponent.module.css";

// Import react-bootstrap components
import { Container, Table, Button } from "react-bootstrap";

// Import react-icons
import { MdOutlineAssignmentInd } from "react-icons/md";

const AssignOrderComponent: React.FC = () => {
    const dispatch = useDispatch();

    const router = useRouter();

    const deliveryPersonData = useSelector((state: any) => {return state?.admin?.orderAndDeliveryPersonData});
    const singleOrderData = useSelector((state: any) => {return state?.admin?.singleOrderData});

    const [config,setConfig] = useState<any>();

    // Get query parameters from URL
    const { userOrder }: any = router.query;

    const getOrderDetailsAndDeliveryPerson = async (configParams: Object) => {
        if (router.isReady) {
            await axios.get(`http://localhost:3000/api/admin/findDeliveryPersonAvailable/${userOrder}`, configParams)
            .then((response) => {
                dispatch(fetchOrderAndDeliveryPerson(response?.data?.data));
            })
        }
    }

    const getSingleOrderToAssign = async (configParams: Object) => {
        if (router.isReady) {
            await axios.get(`http://localhost:3000/api/admin/getSingleOrderToAssign/${userOrder}`, configParams)
            .then((response) => {
                dispatch(singleOrder(response?.data?.data));
            })
        }
    }

    const createOrderAndProvideToDeliveryPerson = async (deliveryPersonID: number, deliveryAddress: string, orderItems: string, configParams: Object) => {
        const provideAddressAndOrderDetailsToDeliveryPerson = {
            delivery_address: deliveryAddress,
            items_to_be_delivered: orderItems,
            status: "busy",
            order_id: userOrder
        }
        
        await axios.post(`http://localhost:3000/api/admin/assignOrder/${userOrder}/${deliveryPersonID}`, provideAddressAndOrderDetailsToDeliveryPerson, configParams)
        .then((response) => {
            dispatch(assignOrderToDeliveryPerson(response.data));
            // alert("Delivery person assigned with ")
            console.log(response.data);
            router.push("/adminHome");
        })
    }

    useEffect(() => {
        const config = {
            headers: {
                "authorization": `Bearer ${localStorage?.getItem("access_token")}`,
                "content-type": "application/json",
                "Access-Control-ALlow-Origin": "*"
            }
        }

        setConfig(config);
       
        getOrderDetailsAndDeliveryPerson(config);
        getSingleOrderToAssign(config);
    },[router.isReady])

    console.log(deliveryPersonData);
    console.log(singleOrderData);

    return (
        <>
            {
                (deliveryPersonData?.length === 0) ?
                    <>
                        Loading...
                    </>
                :
                <Container fluid className = {styles.tableContainer}>
                    <h1 className = {styles.pageHeader}><MdOutlineAssignmentInd/> Assign Orders</h1>
                    <Table responsive className = {styles.table}>
                        <thead className = {styles.tableHeaders}>
                            <tr>
                                <th className = {styles.leftTableHeaders}>ID</th>
                                <th className = {styles.centerTableHeaders}>Name</th>
                                <th className = {styles.centerTableHeaders}>Phone</th>
                                <th className = {styles.centerTableHeaders}>Aadhar Number</th>
                                <th className = {styles.centerTableHeaders}>Email</th>
                                <th className = {styles.centerTableHeaders}>Status</th>
                                <th className = {styles.rightTableHeaders}>Assign Order</th>
                            </tr>
                        </thead>
                        {
                            deliveryPersonData?.map((singleDeliveryPerson: any) => {
                                return (
                                    <tr>
                                        <td className = {styles.tableRows}>{singleDeliveryPerson?.id}</td>
                                        <td className = {styles.tableRows}>{singleDeliveryPerson?.name}</td>
                                        <td className = {styles.tableRows}>{singleDeliveryPerson?.phone}</td>
                                        <td className = {styles.tableRows}>{singleDeliveryPerson?.aadhar_no}</td>
                                        <td className = {styles.tableRows}>{singleDeliveryPerson?.email}</td>
                                        <td className = {styles.tableRows}>{singleDeliveryPerson?.status}</td>
                                        <td className = {styles.tableRows}>
                                            <Button
                                                className = {styles.updateButton}
                                                onClick={
                                                    () => {createOrderAndProvideToDeliveryPerson(singleDeliveryPerson?.id, singleOrderData?.address, singleOrderData?.items, config)}
                                                }
                                            >
                                                Assign
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                       
                    </Table>
                </Container>
            }
        </>
    )
}

export default AssignOrderComponent;