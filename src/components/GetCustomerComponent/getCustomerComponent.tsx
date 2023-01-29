import React, { useState, useEffect } from "react";

// Import router
import { useRouter } from "next/router";

// Import hooks provided by react-redux
import { useSelector, useDispatch } from "react-redux";

// Import axios
import axios from "axios";

// Import actions
import { getCustomer } from "../../state/actions/customerActions";
import { addToCart } from "../../state/actions/customerActions";
import { getVegItems } from "../../state/actions/customerActions";

// Import common functions
import { getMenuItems, getItemsFromCart } from "../../commonFunctions/commonFunctions";

// Import layout
import CustomerLayoutComponent from "../../Layout/customerLayout";

// Import styles
import styles from "./getCustomer.module.css";

// Import react-bootstrap components
import { Container, Row, Col, Button, Card } from "react-bootstrap";

// Import react-icons
import { RiPlantFill, RiShoppingCartFill, RiPriceTag3Fill } from "react-icons/ri";
import { BiFoodTag } from "react-icons/bi";

const GetCustomerComponent: React.FC = () => {
    const dispatch = useDispatch();

    const [config,setConfig] = useState<any>();
    const [vegMenu,setVegMenu] = useState(false);

    const customerData = useSelector((state: any) => {return state?.customers?.getCustomerData});
    const menuData = useSelector((state: any) => {return state?.customers?.completeMenuData});
    const menuData1 = useSelector((state: any) => {return state});
    const cartData = useSelector((state: any) => {return state?.customers?.completeCartData});
    const vegMenuItemsData = useSelector((state: any) => {return state?.customers?.vegItemsData});

    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    },[])

    const getSingleCustomerData = async (configParams: Object) => {
        await axios.get("https://burpger-1yxc.onrender.com/api/customers/allCustomers", configParams)
        .then((response) => {
            dispatch(getCustomer(response?.data?.data));
            // console.log(response?.data?.data[0])
        })
    }

    const getAllVegBurgersFromMenu = async (configParams: Object) => {
        await axios.get("https://burpger-1yxc.onrender.com/api/customers/vegMenu", configParams)
        .then((response) => {
            dispatch(getVegItems(response?.data?.data));
        })
    }

    useEffect(() => {
        const config = {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("customer_token")}`
            }
        }   

        getSingleCustomerData(config);
        getAllVegBurgersFromMenu(config);
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
    console.log(menuData1);

    const changeMenuState = () => {
        setVegMenu(true);
    }

    return (
        <CustomerLayoutComponent user = {`${customerData?.[0]?.firstname} ${customerData?.[0]?.lastname}`}>
            <Container fluid className = {styles.headerContainer}>
                <Row>
                    <Col className = {styles.header}>
                        <h1>Menu &nbsp;
                        <Button 
                            onClick = {changeMenuState}
                            className = {styles.headerButton}
                        >
                            <RiPlantFill/> Veg Only
                        </Button>
                        </h1>
                    </Col>
                    <Col>
                        
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
            {
                (hydrated && typeof(window) !== "undefined" && localStorage.getItem("customer_token") && !vegMenu) ?
                    <Container fluid className = {styles.menuContainer}>
                        <Row>
                        {
                            menuData?.map((singleMenuItem: any) => {
                                return (
                                    <Col md = {3} className = {styles.burgerCardsCol}>
                                        <Card className = {styles.burgerCard}>
                                            <Card.Img 
                                                variant="top" 
                                                src = {singleMenuItem?.burger_image} 
                                                className = {styles.burgerCardImage}
                                            />
                                            <Card.Body>
                                                <Card.Title>{singleMenuItem?.burger_name}</Card.Title>
                                                <Card.Text><RiPriceTag3Fill/> ₹ {singleMenuItem?.price}</Card.Text>
                                                <Card.Text><BiFoodTag/> {singleMenuItem?.category}</Card.Text>
                                                <Button
                                                    className = {styles.addToCartButton}
                                                    onClick = {() => {
                                                        addBurgerToCart(config, customerData?.[0]?.email, singleMenuItem?.burger_name, singleMenuItem?.price, singleMenuItem?.price, singleMenuItem?.id)
                                                    }}
                                                >
                                                    <RiShoppingCartFill/> Add To Cart
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                        </Row>
                    </Container>
                :
                    <Container fluid className = {styles.menuContainer}>
                        <Row>
                        {
                            vegMenuItemsData?.map((singleMenuItem: any) => {
                                return (
                                    <Col md = {3} className = {styles.burgerCardsCol}>
                                        <Card className = {styles.burgerCard}>
                                            <Card.Img 
                                                variant="top" 
                                                src = {singleMenuItem?.burger_image} 
                                                className = {styles.burgerCardImage}
                                            />
                                            <Card.Body>
                                                <Card.Title>{singleMenuItem?.burger_name}</Card.Title>
                                                <Card.Text><RiPriceTag3Fill/> ₹ {singleMenuItem?.price}</Card.Text>
                                                <Card.Text><BiFoodTag/> {singleMenuItem?.category}</Card.Text>
                                                <Button
                                                    className = {styles.addToCartButton}
                                                    onClick = {() => {
                                                        addBurgerToCart(config, customerData?.[0]?.email, singleMenuItem?.burger_name, singleMenuItem?.price, singleMenuItem?.price, singleMenuItem?.id)
                                                    }}
                                                >
                                                    <RiShoppingCartFill/> Add To Cart
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                        </Row>
                    </Container>
            }
        </CustomerLayoutComponent>
    )
}

export default GetCustomerComponent;