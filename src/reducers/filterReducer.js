export default function reducer (state = "ALL", action) {
	console.log("GGG")
	switch (action.type) {
		case "FILTER_CHANGED" : {
			return action.filter
		}
		default: 
			return state;
	}
}