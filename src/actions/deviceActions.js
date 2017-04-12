import axios from "axios";

export function fetchDevices() {
    return function(dispatch) {
        axios.get("/devices")
            .then(function(devices) {
                dispatch({
                    type: "FETCH_DEVICES_FULFILLED",
                    payload: devices.data
                })
            })
            .catch(function(error) {
                dispatch({
                    type: "FETCH_DEVICES_REJECTED",
                    payload: error
                })
            });
    }
}

export function addDevice(name) {
    return function(dispatch) {
        var prom = axios({
            url: "device/add",
            method: "POST",
            data: {
                name: name,
                isAvl: true
            }
        }).then(function(res) {
            debugger;
            dispatch({
                type: "ADD_DEVICE_FULFILLED",
                payload: res.data
            })
        }, function(err) {
            console.log(err);
            dispatch({
                type: "ADD_DEVICE_REJECTED",
                payload: err
            })
        })

        return prom;
    }
}
