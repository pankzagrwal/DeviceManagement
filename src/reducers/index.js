import {combineReducers} from "redux";

import devices from "./deviceReducer";
import filter from "./filterReducer"

export default combineReducers({
	devices,
	filter
})

//export default devices;