const initialState = {
    customers: [],
    loading: true
}

const customerReducers = (state = initialState, action: any) => {
    switch (action.type) {
        case "createCustomerProfile": 
            return {
                ... state,
                createCustomerData: action.payload,
                loading: false
            }

        case "customerLogin": 
            return {
                ... state,
                customerLoginData: action.payload,
                loading: false
            }

        case "getCustomer":
            return {
                ... state,
                getCustomerData: action.payload,
                loading: false
            }

        case "getCompleteMenu":
            return {
                ... state,
                completeMenuData: action.payload,
                loading: false
            }

        case "getCartItems": 
            return {
                ... state,
                completeCartData: action.payload,
                loading: false
            }

        case "addToCart":
            return {
                ... state,
                addToCartData: action.payload,
                loading: false
            } 

        case "updateCartToAdd":
            return {
                ... state,
                updateCartData: action.payload,
                loading: false
            }

        case "createOrder":
            return {
                ... state,
                createOrderData: action.payload,
                loading: false
            }

        case "getUserWiseOrders":
            return {
                ... state,
                userOrderData: action.payload,
                loading: false
            }

        case "getVegItems": 
            return {
                ... state,
                vegItemsData: action.payload,
                loading: false
            }

        default: 
            return state
    }
}

export default customerReducers;