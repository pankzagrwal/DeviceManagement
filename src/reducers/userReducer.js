export function user (state = "", action) {
	switch (action.type) {
		case "FETCH_USER_FULFILLED": {
			console.log("user",action.payload)
			return {
				...state, user: action.payload
			}
		}
		default: {
			return state;
		}
	}
}