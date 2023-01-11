import React, { useState, useEffect } from "react";

// Import router
import { useRouter } from "next/router";

// Import hooks provided by react-redux
import { useSelector, useDispatch } from "react-redux";

// Import axios
import axios from "axios";

// Import actions
import { getCustomer } from "../../state/actions/customerActions";
import { addToCart } from "../../state/actions/customerActions"

// Import common functions
import { getMenuItems, getItemsFromCart } from "../../commonFunctions/commonFunctions";

const GetCustomerComponent: React.FC = () => {
    const dispatch = useDispatch();

    const [config,setConfig] = useState<Object>();

    const customerData = useSelector((state: any) => {return state?.customers?.getCustomerData});
    const menuData = useSelector((state: any) => {return state?.customers?.completeMenuData});
    const cartData = useSelector((state: any) => {return state?.customers?.completeCartData});

    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    },[])

    const getSingleCustomerData = async (configParams: Object) => {
        await axios.get("http://localhost:3000/api/customers/allCustomers", configParams)
        .then((response) => {
            dispatch(getCustomer(response?.data?.data));
            // console.log(response?.data?.data[0])
        })
    }

    useEffect(() => {
        const config = {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("customer_token")}`
            }
        }   

        getSingleCustomerData(config);
    },[])

    useEffect(() => {
        const config = {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("customer_token")}`
            }
        }  
        
        getMenuItems(dispatch, config);
    },[])

    useEffect(() => {
        const config = {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("customer_token")}`
            }
        } 
        
        getItemsFromCart(dispatch, config);
    },[])

    const addBurgerToCart = async (configParams: Object, email: string, burgerName: string, burgerPrice: number, newBurgerPrice: number, burgerIDFromMenu: number) => {
        const itemToBeAddedInCart = {
            email: email,
            burger_name: burgerName,
            burger_price: burgerPrice,
            new_burger_price: newBurgerPrice
        }

        await axios.post(`http://localhost:3000/api/customers/addToCart/${burgerIDFromMenu}`, itemToBeAddedInCart, configParams)
        .then((response) => {
            console.log(response)
            dispatch(addToCart(response?.data));
            alert(response?.data?.message);
        })
    }

    useEffect(() => {
        const config = {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("customer_token")}`,
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }

        setConfig(config);
    },[])

    console.log(customerData);
    console.log(menuData);

    return (
        <>
            {
                (hydrated && typeof(window) !== "undefined" && localStorage.getItem("customer_token")) ?
                    <>
                        <h1>Welcome {customerData?.[0]?.firstname} {customerData?.[0]?.lastname}</h1>
                        {
                            menuData?.map((singleMenuItem: any) => {
                                return (
                                    <div>
                                        <h4>{singleMenuItem?.burger_name} ({singleMenuItem?.category})</h4>
                                        <h4>₹{singleMenuItem?.price}</h4>
                                        <button
                                            onClick = {() => {
                                                addBurgerToCart(config, customerData?.[0]?.email, singleMenuItem?.burger_name, singleMenuItem?.price, singleMenuItem?.price, singleMenuItem?.id)
                                            }}
                                        >
                                        {/* <button onClick={() => {addBurgerToCart(singleMenuItem?.id)}}> */}
                                            Add To Cart
                                        </button>
                                    </div>
                                )
                            })
                        }
                    </>
                :
                    <h1>You are not authorized.</h1>
            }
        </>
    )
}

export default GetCustomerComponent;