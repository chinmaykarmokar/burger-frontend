import React, { useState, useEffect } from "react";

// Import router
import { useRouter } from "next/router";

// Import hooks provided by react-redux
import { useSelector, useDispatch } from "react-redux";

// Import axios
import axios from "axios";

// import actions
import { getSingleInventoryItem } from "../../state/actions/adminActions";
import { updateItemsInInventory } from "../../state/actions/adminActions";

const UpdateInventoryComponent: React.FC = () => {
    const router = useRouter();

    const dispatch = useDispatch();

    const singleItemFromInventory = useSelector((state: any) => {return state?.admin?.singleInventoryItemData})

    const [config,setConfig] = useState<Object>();
    const [quantity,setQuantity] = useState<any>();

    const changeQuantityHandler = (event: any) => {
        setQuantity(event.target.value)
    }

    // Get query parameters from URL
    const { inventoryItem }: any = router.query;
    console.log(typeof(parseInt(inventoryItem)));
               
    // Get specific item from the inventory
    const getSingleFoodItemFromInventory = async (configParams: Object) => {
        if (router.isReady) {
            await axios.get(`http://localhost:3000/api/admin/singleInventoryItem/${inventoryItem}`, configParams)
            .then((response) => {
                dispatch(getSingleInventoryItem(response.data));
            })
        }
        
    }

    useEffect(() => {
        const config = {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        }
        getSingleFoodItemFromInventory(config);
    },[router.isReady])

    console.log(singleItemFromInventory?.data);

    const updateItemDetails = {
        quantity: parseInt(quantity)
    }

    // Update quantity of current items
    const updateItemQuantity = async (configParams: any) => {
        await axios.put(`http://localhost:3000/api/admin/updateInventory/${inventoryItem}`,updateItemDetails, configParams)
        .then((response) => {
            dispatch(updateItemsInInventory(response?.data));
            router.push("/adminHome");
        })
    }

    useEffect(() => {
        const config = {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("access_token")}`,
                "content-type": "application/json",
                "Access-Control-Allow_Origin": "*"
            }
        }
        setConfig(config);
    },[])

    return (
        <>
            <h1>Welcome to inventory update page.</h1>
            <h4>
                You are going to update {singleItemFromInventory?.data?.food_item} with ID {inventoryItem} having current quantity of {singleItemFromInventory?.data?.quantity}.
            </h4>
            <input
                type = "number"
                placeholder = "Quantity"
                onChange = {changeQuantityHandler}
            />
            <button
                onClick={() => updateItemQuantity(config)}
            >
                Update
            </button>
        </>
    )
}

export default UpdateInventoryComponent;