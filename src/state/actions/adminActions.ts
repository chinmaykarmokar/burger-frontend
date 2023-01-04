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