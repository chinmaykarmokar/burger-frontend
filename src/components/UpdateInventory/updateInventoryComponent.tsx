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

    const [singleInventoryItem, setSingleInventoryItem] = useState<any>();
    const [quantity,setQuantity] = useState();

    const changeQuantityHandler = (event: any) => {
        setQuantity(event.target.value)
    }

    // Get query parameters from URL
    const { inventoryItem }: any = router.query;
    console.log(typeof(parseInt(inventoryItem)));


    if (typeof(window) !== "undefined") {
        const config = {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        }
        
        const getSingleFoodItemFromInventory = async () => {
            if (router.isReady) {
                await axios.get(`http://localhost:3000/api/admin/singleInventoryItem/${inventoryItem}`, config)
                .then((response) => {
                    dispatch(getSingleInventoryItem(response.data));
                })
            }
            
        }
    
        useEffect(() => {
            getSingleFoodItemFromInventory();
        },[router.isReady])
    }

    console.log(singleItemFromInventory?.data)

    return (
        <>
            <h1>Welcome to inventory update page.</h1>
            <h4>You are going to update {singleItemFromInventory?.data?.food_item} with ID {inventoryItem}</h4>
            <input
                type = "number"
                placeholder = "Quantity"
                onChange = {changeQuantityHandler}
            />
        </>
    )
}

export default UpdateInventoryComponent;