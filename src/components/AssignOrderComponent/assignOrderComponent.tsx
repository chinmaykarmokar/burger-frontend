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
            <h1>Assign Orders</h1>
            {
                (deliveryPersonData?.length === 0) ?
                    <>
                        Loading...
                    </>
                :
                <>
                <table>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Aadhar Number</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Assign Order</th>
                    </tr>
                    {
                        deliveryPersonData?.map((singleDeliveryPerson: any) => {
                            return (
                                <tr>
                                    <td>{singleDeliveryPerson?.id}</td>
                                    <td>{singleDeliveryPerson?.name}</td>
                                    <td>{singleDeliveryPerson?.phone}</td>
                                    <td>{singleDeliveryPerson?.aadhar_no}</td>
                                    <td>{singleDeliveryPerson?.email}</td>
                                    <td>{singleDeliveryPerson?.status}</td>
                                    <td>
                                        <button
                                            onClick={
                                                () => {createOrderAndProvideToDeliveryPerson(singleDeliveryPerson?.id, singleOrderData?.address, singleOrderData?.items, config)}
                                            }
                                        >
                                            Assign
                                        </button>
                                        {/* <button>Assign</button> */}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>   
                </table>
                </>
            }
        </>
    )
}

export default AssignOrderComponent;