import React, { useState, useEffect } from "react";

// import router
import { useRouter } from "next/router";

// Import actions
import { getCompleteInventory } from "../../state/actions/adminActions";

// Import hooks provided by react-redux 
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const GetCompleteInventoryItems: React.FC = () => {
    const dispatch = useDispatch();

    const completeInventory = useSelector((state: any) => {return state?.admin?.completeInventoryData});

    const config = {
        headers: {
            "authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
    }

    const fetchCompleteInventoryItems = async () => {
        await axios.get("http://localhost:3000/api/admin/allFoodItems", config)
        .then((response) => {
            dispatch(getCompleteInventory(response.data));
            // console.log(response.data)
        })
    }

    useEffect(() => {
        fetchCompleteInventoryItems();
    },[])

    const getIDToUpdateInventoryItem = (params: number) => {
        alert(`You clicked burger with id ${params}`);
    }

    return (
        <>
            <h1>See Inventory</h1>
            {
                (!completeInventory && completeInventory == "undefined") ? 
                    <>
                        Loading...
                    </>
                :
                <>
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Food Item</th>
                            <th>Inventory Updated On</th>
                            <th>Quantity</th>
                            <th>Update</th>
                        </tr>
                        
                            {completeInventory?.data.map((singleItemInInventory: any) => {
                                return(
                                    <tr>
                                        <td>{singleItemInInventory?.id}</td>
                                        <td>{singleItemInInventory?.food_item}</td>
                                        <td>{singleItemInInventory?.inventory_update_date}</td>
                                        <td>{singleItemInInventory?.quantity}</td>
                                        <button
                                            onClick={() => getIDToUpdateInventoryItem(singleItemInInventory?.id)}
                                        >
                                            Update
                                        </button>
                                    </tr>
                                )
                            })}
                        
                    </table>
                </>
            }
        </>
    )
}

export default GetCompleteInventoryItems;