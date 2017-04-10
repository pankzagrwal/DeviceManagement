import React from 'react';
import ReactDOM from 'react-dom';
import Filter from './filter/index.js';
import Table from './table/index.js';
import NewDevice from './newDevice/index.js';
import styles from './app.css';
import axios from 'axios';

import {fetchDevices} from '../actions/deviceActions.js';
import {filterChanged} from '../actions/filterActions.js';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';



var App = React.createClass({

  filterChanged: function (name) {
    var deviceList = this.deviceList,
        device = {
          name: "No Device"
        };
    if (name === "All") {
      this.setState({
        deviceList: deviceList
      })
      return;
    }
    for (const key in deviceList) {
        if (deviceList[key].name === name) {
          device = deviceList[key];
          break;
        }
        
    }

    this.setState({
      deviceList: [device]
    })
  },

  deviceReturned: function (name) {
    const deviceList = this.state.deviceList;
    var oThis = this;
    axios({
      url: "devices/update",
      method: "PUT",
      data: {
      name: name,
      allocated_date: "",
      allocated_to: "",
      isAvl: true
    }}).then(function (res) {
      for (const key in deviceList) {
          if (deviceList[key].name === res.data.name) {
              deviceList[key] = res.data;
              break;
          }
      }

      oThis.setState({
        deviceList: deviceList
      })

    }).catch(function (err) {
      console.log(err)
    })
  },

  deviceAllocate: function (config) {
    const deviceList = this.state.deviceList;
    var oThis = this;
    axios({
      url: "devices/update",
      method: "PUT",
      data: {
      name: config.name,
      allocated_date: (new Date()).toDateString(),
      allocated_to: config.allocated_to,
      isAvl: false
    }}).then(function (res) {
      for (const key in deviceList) {
          if (deviceList[key].name === res.data.name) {
              deviceList[key] = res.data;
          }
      }

      oThis.setState({
        deviceList: deviceList
      })

    }).catch(function (err) {
      console.log(err)
    })
  },

  addDevice: function (name) {
    const deviceList =  this.state.deviceList;
    var oThis = this;
    var prom = axios({
      url: "device/add",
      method: "POST",
      data: {
        name: name,
        isAvl: true
      }
    }).then(function (res) {
      deviceList.push(res.data);
      oThis.setState({
        deviceList: deviceList
      });
      return res;
    }, function (err) {
      console.log(err);
    })

    return prom;
  },

  getInitialState: function () {
      return {
        listOptions: [],
        deviceList: [],
        username: null
      }
  },

  componentDidMount: function () {
    var oThis = this;

    axios.get("/user").then(function (res) {
      sessionStorage.setItem('username', res.data.user);
      oThis.setState({
        username: res.data.user
      });
    })
    .catch(function (error) {
      console.log(error);
    })


    oThis.props.fetchDevices();

    /*axios.get("/devices").then(function (devices) {
      oThis.deviceList = devices.data;
      oThis.setState({
        deviceList: devices.data,
        listOptions: [{name: "All"}, ...devices.data]
      })
    })
    .catch(function (error) {
        console.log(error);
    });*/
  },

  render: function () {
    console.log(this.props)
    return (
     <div className = "app-component container">
        <div className="top-layout row">
          <div className="top-text col-md-8 col-lg-8 col-sm-8">
              'Lorem Ipsum'
          </div>
          <div className="top-filter col-md-3 col-lg-3 col-sm-3">
            <Filter listOptions = {this.props.listOptions} filterChanged = {this.props.filterChanged}/>
          </div>
        </div>
        <div className="new-device-layout">
          <NewDevice isLoggedIn={this.state.username === 'admin@admin.com'} addDevice = {this.addDevice}/>
        </div>
        <div className = "table-layout row">
          <div className = "col-md-11 col-lg-11 col-sm-11">
            <Table username = {this.state.username} deviceList = {this.props.deviceList} deviceReturned = {this.deviceReturned} deviceAllocate = {this.deviceAllocate}/>
          </div>
        </div>
        <div className={"login-container row " +  (this.state.username ? "hide" : "")}>
          <a className = "col-md-11" href='/login.html'>Log In to Access</a>
        </div>
    </div>
    )
  }
});


const getVisibleDevices = function (list, filter) {
  debugger;
  switch (filter) {
    case "ALL": {
      return list
    }
    default: {
      return list.filter(function (t) {
          t.name === filter
      })
    }
  }
}


module.exports = connect(function (state,ownProps) {
  console.log(state);
  return {
    deviceList: getVisibleDevices(state.devices.devices, state.filter),
    listOptions: state.devices.devices
}}, function (dispatch) {
  return {
    fetchDevices: function () {
      return dispatch(fetchDevices())
    },
    filterChanged: function (name) {
      return dispatch(filterChanged(name))
    }
  }
})(App);
