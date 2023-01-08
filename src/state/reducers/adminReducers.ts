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

        case "getAllCompletedOrders": 
            return {
                ... state,
                completedOrdersData: action.payload,
                loading: false
            }

        case "getAllLiveOrders":
            return {
                ... state,
                liveOrdersData: action.payload,
                loading: false
            }

        case "getCompleteInventory":
            return {
                ... state,
                completeInventoryData: action.payload,
                loading: false
            }

        case "getSingleInventoryItem": 
            return {
                ... state,
                singleInventoryItemData: action.payload,
                loading: false
            }

        case "updateItemsInInventory": 
            return {
                ... state,
                updatedInventoryData: action.payload,
                loading: false
            }
            
        default: 
            return state
    }
}

export default adminReducers;