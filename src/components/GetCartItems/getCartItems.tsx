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

// Import layout
import CustomerLayoutComponent from "../../Layout/customerLayout";

// Import styles
import styles from "./getCartItems.module.css";

// Import react-bootstrap components
import { Container, Row, Col, Card, ButtonGroup, Button } from "react-bootstrap";

// Import react-icons
import { BsFillCartFill, BsFillInboxesFill } from "react-icons/bs";
import { IoFastFoodOutline, IoPricetagOutline } from "react-icons/io5";

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

    console.log(customerDetails);
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
        <CustomerLayoutComponent user = {`${customerDetails?.[0]?.firstname} ${customerDetails?.[0]?.lastname}`}>
            {
                (allItemsInCart?.length == 0) 
                ? 
                <>No Items in cart</> 
                : 
                <Container fluid className = {styles.cartContainer}>
                    <h1 className = {styles.pageHeader}><BsFillCartFill/> Cart</h1>
                    <Row>
                        <Col md = {8} className = {styles.cartCardCol}>
                            {
                                (allItemsInCart)?.map((singleCartItem: any) => {
                                    return (
                                        <>
                                            <Card className = {styles.cartCard}>
                                                <h4><IoFastFoodOutline/> {singleCartItem?.burger_name}</h4>
                                                <h4><IoPricetagOutline/> ₹ {singleCartItem?.new_burger_price}</h4>
                                                <ButtonGroup className = {styles.cartButtonsGroup}>
                                                    <Button
                                                        className = {styles.decreaseButton}
                                                        onClick = {
                                                            () => {
                                                                decreaseExistingBurgerQuantity(config, singleCartItem?.quantity_of_burger, singleCartItem?.new_burger_price, singleCartItem?.burger_price, singleCartItem?.id) 
                                                            }
                                                        }
                                                    >-</Button>
                                                    <Button
                                                        className = {styles.quantityButton}
                                                    >{singleCartItem?.quantity_of_burger}</Button>
                                                    <Button
                                                        className = {styles.increaseButton}
                                                        onClick = {
                                                            () => {
                                                                increaseExistingBurgerQuantity(config, singleCartItem?.quantity_of_burger, singleCartItem?.new_burger_price, singleCartItem?.burger_price, singleCartItem?.id) 
                                                            }
                                                        }
                                                    >
                                                        +
                                                    </Button>
                                                </ButtonGroup>
                                            </Card>
                                        </>
                                    )
                                }) 
                            }
                            <br/>
                            <Button
                                className = {styles.placeOrderButton}
                                onClick={placeOrder}
                            >
                                <BsFillInboxesFill/> Place Order
                            </Button>
                        </Col>
                        <Col md = {4}></Col>
                    </Row>
                </Container>
            }
            
        </CustomerLayoutComponent>
    )
}

export default CartComponent;