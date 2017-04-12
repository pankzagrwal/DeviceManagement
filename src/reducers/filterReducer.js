export function filter (state = "ALL", action) {
	switch (action.type) {
		case "FILTER_CHANGED" : {
			return action.filter
		}
		default: 
			return state;
	}
}