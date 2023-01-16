import React, { useState, useEffect } from "react";

// Import router
import { useRouter } from "next/router";

// Import hooks provided by react-redux
import { useSelector, useDispatch } from "react-redux";

// Import axios
import axios from "axios";

// Import common functions
import { fetchAssignedOrders } from "../../commonFunctions/commonFunctions";
import { completeOrder } from "../../state/actions/deliveryPersonActions";

const DeliveryPersonHomeComponent: React.FC = () => {
    const dispatch = useDispatch();

    const router = useRouter();

    const orderAssigned = useSelector((state: any) => {return state?.deliveryPersons?.assignedOrderData});

    const [config,setConfig] = useState<any>();

    const completeExistingOrder = async (configParams: Object) => {
        const orderUpdateData = {
            status: "available",
            items_to_be_delivered: " ",
            delivery_address: " ",
            order_id: 0
        }

        await axios.post("http://localhost:3000/api/delivery/orderCompletion", orderUpdateData, configParams)
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
    },[])

    console.log(orderAssigned);

    return (
        <>
            <h1>Welcome Delivery Person!</h1>
            {
                (orderAssigned?.length === 0) ? 
                    <h1>You have no orders assigned.</h1>
                :
                orderAssigned?.map((singleOrder: any) => {
                    return (
                        <>
                            <div>
                                <h3>Order: {singleOrder?.order_id}</h3>
                                <h3>Address: {singleOrder?.delivery_address}</h3>
                                <button
                                    onClick = {() => {completeExistingOrder(config)}}
                                >
                                    Complete Delivery
                                </button>
                            </div>
                        </>
                    )
                })    
            }
        </>
    )
}

export default DeliveryPersonHomeComponent;