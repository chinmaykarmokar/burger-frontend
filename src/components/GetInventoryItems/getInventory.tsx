import React, { useState, useEffect } from "react";

// import router
import { useRouter } from "next/router";

// Import actions
import { getCompleteInventory } from "../../state/actions/adminActions";

// Import hooks provided by react-redux 
import { useSelector, useDispatch } from "react-redux";

// Import axios
import axios from "axios";

// Import styles
import styles from "./getInventory.module.css";

// Import react-bootstrap components
import { Container, Table, Button } from "react-bootstrap";

// Import react-icons
import { MdOutlineInventory2 } from "react-icons/md";

const GetCompleteInventoryItems: React.FC = () => {
    const dispatch = useDispatch();

    const router = useRouter();

    const completeInventory = useSelector((state: any) => {return state?.admin?.completeInventoryData});

    const fetchCompleteInventoryItems = async (configParams: Object) => {
        await axios.get("https://burpger-1yxc.onrender.com/api/admin/allFoodItems", configParams)
        .then((response) => {
            dispatch(getCompleteInventory(response.data));
            // console.log(response.data)
        })
    }

    useEffect(() => {
        const config = {
            headers: {
                "authorization": `Bearer ${localStorage?.getItem("access_token")}`
            }
        }

        fetchCompleteInventoryItems(config);
    },[])

    const getIDToUpdateInventoryItem = (params: number) => {
        router.push(`/updateInventoryItem/${params}`);
    }

    return (
        <>
            {
                (!completeInventory && completeInventory == "undefined") ? 
                    <>
                        Loading...
                    </>
                :
                <Container fluid className = {styles.tableContainer}>
                    <h1 className = {styles.pageHeader}><MdOutlineInventory2/> See Inventory</h1>
                    <Table responsive className = {styles.table}>
                        <thead className = {styles.tableHeaders}>
                            <tr>
                                <th className = {styles.leftTableHeaders}>ID</th>
                                <th className = {styles.centerTableHeaders}>Food Item</th>
                                <th className = {styles.centerTableHeaders}>Inventory Updated On</th>
                                <th className = {styles.centerTableHeaders}>Quantity</th>
                                <th className = {styles.rightTableHeaders}>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {completeInventory?.data.map((singleItemInInventory: any) => {
                                return(
                                    <tr>
                                        <td className = {styles.tableRows}>{singleItemInInventory?.id}</td>
                                        <td className = {styles.tableRows}>{singleItemInInventory?.food_item}</td>
                                        <td className = {styles.tableRows}>{singleItemInInventory?.inventory_update_date}</td>
                                        <td className = {styles.tableRows}>{singleItemInInventory?.quantity}</td>
                                        <td className = {styles.tableRows}>
                                            <Button
                                                className = {styles.updateButton}
                                                onClick={() => getIDToUpdateInventoryItem(singleItemInInventory?.id)}
                                            >
                                                Update
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Container>
            }
        </>
    )
}

export default GetCompleteInventoryItems;