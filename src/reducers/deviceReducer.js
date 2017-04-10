export default function reducer (state = {
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
		default:
			return state;
	}
}