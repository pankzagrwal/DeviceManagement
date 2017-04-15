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
		case "ALLOCATE_DEVICE_FULLFILLED": {
			console.log(state);
			return Object.assign({}, state, {
				devices: state.devices.map(function (device) {
					if (device.name === action.payload.name) {
						device = action.payload
					}
					return device;
				})
			})
		}
		case "RETURN_DEVICE_FULFILLED": {
			console.log(state);
			debugger;
			return Object.assign({}, state, {
				devices: state.devices.map(function (device) {
					if (device.name === action.payload.name) {
							device = action.payload;
					}

					return device;
				})
			})
		}
		default:
			return state;
	}
}