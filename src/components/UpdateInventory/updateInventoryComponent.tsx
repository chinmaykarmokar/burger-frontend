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

// Import common functions
import { getAdminData } from "../../commonFunctions/commonFunctions";

// Import layout
import AdminLayoutComponent from "../../Layout/adminLayout";

// Import styles
import styles from "./updateInventory.module.css";

// Import react-boostrap components
import { Container, Button, Form } from "react-bootstrap";

const UpdateInventoryComponent: React.FC = () => {
    const router = useRouter();

    const dispatch = useDispatch();

    const singleItemFromInventory = useSelector((state: any) => {return state?.admin?.singleInventoryItemData})
    const getAdminInfo = useSelector((state: any) => {return state?.admin?.adminData});

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
            await axios.get(`https://burpger-1yxc.onrender.com/api/admin/singleInventoryItem/${inventoryItem}`, configParams)
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
        await axios.put(`https://burpger-1yxc.onrender.com/api/admin/updateInventory/${inventoryItem}`,updateItemDetails, configParams)
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

        getAdminData(dispatch,config);
        setConfig(config);
    },[])

    return (
        <AdminLayoutComponent user = {`${getAdminInfo?.[0]?.firstname} ${getAdminInfo?.[0]?.lastname}`}>
            <Container fluid className = {styles.mainContainer}>
                <h1 className = {styles.pageHeader}>Update Inventory</h1>
                <h5>
                    You are going to update {singleItemFromInventory?.data?.food_item} with ID {inventoryItem} having current quantity of {singleItemFromInventory?.data?.quantity}.
                </h5>
                <Form className = {styles.form}>
                    <Form.Group>
                        <Form.Control
                            className = {styles.updateInventoryInputField}
                            type = "number"
                            placeholder = "Quantity"
                            onChange = {changeQuantityHandler}
                        />
                    </Form.Group>
                    <Button
                        className = {styles.updateButton}
                        onClick={() => updateItemQuantity(config)}
                    >
                        Update
                    </Button>
                </Form>
            </Container>
        </AdminLayoutComponent>
    )
}

export default UpdateInventoryComponent;