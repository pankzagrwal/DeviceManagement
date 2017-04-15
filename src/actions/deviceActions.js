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

export function allocateDevice (config) {

    return function (dispatch) {
        axios({
          url: "devices/update",
          method: "PUT",
          data: {
          name: config.name,
          allocated_date: (new Date()).toDateString(),
          allocated_to: config.allocated_to,
          isAvl: false
        }}).then(function (res) {
          // for (const key in deviceList) {
          //     if (deviceList[key].name === res.data.name) {
          //         deviceList[key] = res.data;
          //     }
          // }
          dispatch({
            type: "ALLOCATE_DEVICE_FULLFILLED",
            payload: res.data
          })


        }).catch(function (err) {
          console.log(err);
          dispatch({
            type: "ALLOCATE_DEVICE_REJECTED",
            payload: err
          })
        })

    }

}

export function returnDevice (name) {
    return function (dispatch) {
        axios({
          url: "devices/update",
          method: "PUT",
          data: {
            name: name,
            allocated_date: "",
            allocated_to: "",
            isAvl: true
        }}).then(function (res) {
          dispatch({
            type: "RETURN_DEVICE_FULFILLED",
            payload: res.data
          })

        }).catch(function (err) {
          dispatch({
            type: "RETURN_DEVICE_REJECTED",
            payload: err
          })
        })
    }
}
