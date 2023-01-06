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

export const getCompleteInventory = (data: any) => {
    return {
        type: "getCompleteInventory",
        payload: data
    }
}