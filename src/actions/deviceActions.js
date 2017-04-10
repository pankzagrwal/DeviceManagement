import axios from "axios";

export function fetchDevices () {
	return function (dispatch) {
		axios.get("/devices")
			.then(function (devices) {
		      dispatch({
		      	type: "FETCH_DEVICES_FULFILLED", payload: devices.data
		      })
		    })
		    .catch(function (error) {
		        dispatch({
		        	type: "FETCH_DEVICES_REJECTED", payload: error
		        })
		    });
	}
}