import { combineReducers } from "redux";

// Import all reducers
import adminReducers from "./adminReducers";
import customerReducers from "./customerReducers";

const reducers = combineReducers({
    admin: adminReducers,
    customers: customerReducers
})

export default reducers;