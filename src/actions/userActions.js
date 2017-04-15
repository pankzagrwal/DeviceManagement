import axios from "axios";

export function fetchUser () {
	return function (dispatch) {
		axios.get("/user").then(function (res) {
	      dispatch({
                    type: "FETCH_USER_FULFILLED",
                    payload: res.data.user
                })
	    })
	    .catch(function (error) {
      	      dispatch({
                type: "FETCH_USER_REJECTED",
                payload: error
            })
	    })
	}
}