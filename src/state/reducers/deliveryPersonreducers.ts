const initialState = {
    deliveryPersons: [],
    loading: true
}

const deliveryPersonReducers = (state = initialState, action: any) => {
    switch (action.type) {
        case "registerDeliveryPerson":
            return {
                ... state,
                deliveryPersonRegistrationData: action.payload,
                loading: false
            } 

        case "loginDeliveryPerson": 
            return {
                ... state,
                deliveryPersonLoginData: action.paylaod,
                loading: false
            }

        default: 
            return state;
    }
}

export default deliveryPersonReducers;