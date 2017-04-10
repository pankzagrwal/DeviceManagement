export function filterChanged (name) {
	return {
		type: "FILTER_CHANGED",
		filter: name
	}
}