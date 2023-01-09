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