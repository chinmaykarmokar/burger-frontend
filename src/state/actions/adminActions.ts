export const createAdminProfile = (data: any) => {
    return {
        type: "createAdmin",
        payload: data
    }
}

export const loginAdmin = (data: any) => {
    return {
        type: "loginAdmin",
        payload: data
    }
}

export const getAllCompletedOrders = (data: any) => {
    return {
        type: "getAllCompletedOrders",
        payload: data
    }
}

export const getAllLiveOrders = (data: any) => {
    return {
        type: "getAllLiveOrders",
        payload: data
    }
}

export const getCompleteInventory = (data: any) => {
    return {
        type: "getCompleteInventory",
        payload: data
    }
}

export const getSingleInventoryItem = (data: any) => {
    return {
        type: "getSingleInventoryItem",
        payload: data
    }
}

export const updateItemsInInventory = (data: any) => {
    return {
        type: "updateItemsInInventory",
        payload: data
    }
}

export const fetchOrderAndDeliveryPerson = (data: any) => {
    return {
        type: "fetchOrderAndDeliveryPerson",
        payload: data
    }
}

export const singleOrder = (data: any) => {
    return {
        type: "singleOrder",
        payload: data
    }
}

export const assignOrderToDeliveryPerson = (data: any) => {
    return {
        type: "assignOrderToDeliveryPerson",
        payload: data
    }
}