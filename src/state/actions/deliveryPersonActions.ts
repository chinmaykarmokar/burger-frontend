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