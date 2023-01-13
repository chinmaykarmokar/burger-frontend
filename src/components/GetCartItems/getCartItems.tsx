import React, { useState, useEffect } from "react";

// import router
import { useRouter } from "next/router";

// Import hooks provided by react-redux
import { useSelector, useDispatch } from "react-redux";

// Import axios
import axios from "axios";

// Import actions
import { addToCart, getCartItems } from "../../state/actions/customerActions";
import { updateCartToAdd } from "../../state/actions/customerActions";
import { createOrder } from "../../state/actions/customerActions";

// Import common functions
import { getItemsFromCart } from "../../commonFunctions/commonFunctions";
import { getCustomerDetails } from "../../commonFunctions/commonFunctions";

const CartComponent: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const customerDetails = useSelector((state: any) => {return state?.customers?.getCustomerData});
    const allItemsInCart = useSelector((state: any) => {return state?.customers?.completeCartData});

    const [quantityToAddToBurger, setQuantityToAddToBurger] = useState(1);
    const [config, setConfig] = useState<any>();

    useEffect(() => {
        const config = {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("customer_token")}`
            }
        }

        getItemsFromCart(dispatch,config);
        getCustomerDetails(dispatch,config);
    },[])

    console.log(allItemsInCart);

    const increaseExistingBurgerQuantity = async (configParams: Object, burgerQuantity: number, newBurgerPrice: number, originalBurgerPrice: number,  burgerIDToUpdate: number) => {
        const burgerToUpdateInCart = {
            quantity_of_burger: burgerQuantity + 1,
            new_burger_price: newBurgerPrice + originalBurgerPrice
        }
        
        await axios.put(`http://localhost:3000/api/customers/updateCartToAdd/${burgerIDToUpdate}`, burgerToUpdateInCart, configParams)
        .then((response) => {
            dispatch(addToCart(response?.data));
            console.log(response?.data);
        })

        setTimeout(() => {
            router.reload();
        },1500)
    }

    const decreaseExistingBurgerQuantity = async (configParams: Object, burgerQuantity: number, newBurgerPrice: number, originalBurgerPrice: number,  burgerIDToUpdate: number) => {
        const burgerToUpdateInCart = {
            quantity_of_burger: burgerQuantity - 1,
            new_burger_price: newBurgerPrice - originalBurgerPrice
        }

        await axios.put(`http://localhost:3000/api/customers/updateCartToRemove/${burgerIDToUpdate}`, burgerToUpdateInCart, configParams)
        .then((response) => {
            dispatch(addToCart(response?.data));
            console.log(response?.data);
        })

        setTimeout(() => {
            router.reload();
        },1500)
    }

    const placeOrder = async () => {
        const email = customerDetails[0]?.email;

        const burgersInTheCart = allItemsInCart?.map((burger: any) => {
            return burger?.burger_name
        })

        const getPriceOfBurgersInCart = allItemsInCart?.map((burger: any) => {
            return burger?.new_burger_price
        })

        const address = customerDetails[0]?.address;

        const totalBurgerPriceInCart = getPriceOfBurgersInCart?.reduce((price1: number,pricen: number) => price1 + pricen,0)
        const listOfBurgersInCart = burgersInTheCart?.toString();

        const orderObject = {
            email: email,
            items: listOfBurgersInCart,
            price: totalBurgerPriceInCart,
            address: address
        }

        console.log(orderObject);

        axios.post("http://localhost:3000/api/customers/createOrder", orderObject, config)
        .then((response) => {
            dispatch(createOrder(response?.data));
            console.log(response?.data);
        })
    }

    useEffect(() => {
        const config: Object = {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("customer_token")}`,
                "content-type": "application/json",
                "Access-Control-ALlow-Origin": "*"
            }
        }

        setConfig(config);
    },[])

    return (
        <>
            <h1>Cart</h1>
            {
                (allItemsInCart)?.map((singleCartItem: any) => {
                    return (
                        <>
                            <div>
                                <h4>{singleCartItem?.burger_name}</h4>
                                <h4>₹ {singleCartItem?.new_burger_price}</h4>
                                <button
                                    onClick = {
                                        () => {
                                            decreaseExistingBurgerQuantity(config, singleCartItem?.quantity_of_burger, singleCartItem?.new_burger_price, singleCartItem?.burger_price, singleCartItem?.id) 
                                        }
                                    }
                                >-</button>
                                <button>{singleCartItem?.quantity_of_burger}</button>
                                <button
                                    onClick = {
                                        () => {
                                            increaseExistingBurgerQuantity(config, singleCartItem?.quantity_of_burger, singleCartItem?.new_burger_price, singleCartItem?.burger_price, singleCartItem?.id) 
                                        }
                                    }
                                >
                                    +
                                </button>
                            </div>
                        </>
                    )
                }) 
            }
            <br/>
            <button
                onClick={placeOrder}
            >
                Place Order
            </button>
        </>
    )
}

export default CartComponent;