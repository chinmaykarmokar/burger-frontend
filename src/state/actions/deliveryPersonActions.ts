export const registerDeliveryPerson = (data: any) => {
    return {
        type: "registerDeliveryPerson",
        payload: data 
    }
}

export const loginDeliveryPerson = (data: any) => {
    return {
        type: "loginDeliveryPerson",
        payload: data
    }
}

export const deliveryPersonDetails = (data: any) => {
    return {
        type: "deliveryPersonDetails",
        payload: data
    }
}

export const getAssignedOrders = (data: any) => {
    return {
        type: "getAssignedOrders",
        payload: data
    }
}

export const completeOrder = (data: any) => {
    return {
        type: "completeOrder",
        payload: data
    }
}