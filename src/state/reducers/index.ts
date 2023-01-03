import { combineReducers } from "redux";

// Import all reducers
import adminReducers from "./adminReducers";

const reducers = combineReducers({
    admin: adminReducers
})

export default reducers;