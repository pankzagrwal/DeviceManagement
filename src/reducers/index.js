import {combineReducers} from "redux";

import * as devices from "./deviceReducer";
import * as filter from "./filterReducer";
import * as user from "./userReducer";

console.log(devices)

const allReducer = Object.assign({}, devices, filter, user)
console.log(allReducer);
export default combineReducers(allReducer);

//export default devices;