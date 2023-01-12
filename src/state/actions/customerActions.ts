export const createCustomerProfile = (data: any) => {
    return {
        type: "createCustomerProfile",
        payload: data
    }
}

export const customerLogin = (data: any) => {
    return {
        type: "customerLogin",
        paylaod: data
    }
}

export const getCustomer = (data: any) => {
    return {
        type: "getCustomer",
        payload: data
    }
}

export const getCompleteMenu = (data: any) => {
    return {
        type: "getCompleteMenu",
        payload: data
    }
}

export const getCartItems = (data: any) => {
    return {
        type: "getCartItems",
        payload: data
    }
}

export const addToCart = (data: any) => {
    return {
        type: "addToCart",
        payload: data
    }
} 

export const updateCartToAdd = (data :any) => {
    return {
        type: "updateCartToAdd",
        payload: data
    }
}

export const createOrder = (data: any) => {
    return {
        type: "createOrder",
        payload: data
    }
}