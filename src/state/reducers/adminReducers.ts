const initialState = {
    admin: [],
    loading: true
}

const adminReducers = (state = initialState, action: any) => {
    switch (action.type) {
        case "createAdmin":
            return {
                ... state,
                createAdminData: action.payload,
                loading: false
            }

        case "loginAdmin":
            return {
                ... state,
                adminLoginData: action.payload,
                loading: false
            }
            
        default: 
            return state
    }
}

export default adminReducers