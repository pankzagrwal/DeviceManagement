export function devices (state = {
	devices: [],
	fetching: false,
	fetched: false,
	error: null
}, action) {
	switch (action.type) {
		case "FETCH_DEVICES": {
			return {
				...state, fetching: true
			}

		}
		case "FETCH_DEVICES_REJECTED": {
			return {
				...state, fetching: false, error: action.payload
			}
		}
		case "FETCH_DEVICES_FULFILLED": {
			return {
				...state, fetching: false, fetched: true, devices: action.payload
			}
		}
		case "ADD_DEVICE_FULFILLED": {
			console.log(state);
			return Object.assign({}, state, {
						devices: [
							...state.devices, action.payload
						]
					})
		}
		default:
			return state;
	}
}

// export function reducer2 (state = {
// 	devices: [],
// 	fetching: false,
// 	fetched: false,
// 	error: null
// }, action) {
// 	switch(action.type) {
// 		case "ADD_DEVICE_FULFILLED": {
// 			console.log(state);
// 			return {
// 				...state, devices: action.payload
// 			}
// 		}

// 		default:
// 			return state;
// 	}
// }