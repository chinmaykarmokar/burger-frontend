import { combineReducers } from "redux";

// Import all reducers
import adminReducers from "./adminReducers";
import customerReducers from "./customerReducers";
import deliveryPersonReducers from "./deliveryPersonreducers";

const reducers = combineReducers({
    admin: adminReducers,
    customers: customerReducers,
    deliveryPersons: deliveryPersonReducers
})

export default reducers;