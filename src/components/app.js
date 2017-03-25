import React from 'react';
import ReactDOM from 'react-dom';
import Filter from './filter/index.js';
import Table from './table/index.js';
import NewDevice from './newDevice/index.js';
import styles from './app.css';
import axios from 'axios';


var listOptions = [
  {
    name: "ALL",
    id: 0
  },
  {
    name: "iphone",
    id: 1
  },
  {
    name: "ipad",
    id: 2
  },
  {
    name: "nexus",
    id: 3
  }
];

var App = React.createClass({

  filterChanged: function (id) {
    var deviceList = this.deviceList,
        device;
    if (id === 0) {
      this.setState({
        deviceList: deviceList
      })
      return;
    }
    for (const key in deviceList) {
        if (deviceList[key].name === id) {
          device = deviceList[key];
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
        listOptions: listOptions,
        deviceList: []
      }
  },

  componentDidMount: function () {
    var oThis = this;
    axios.get("/devices").then(function (devices) {
      oThis.deviceList = devices.data;
      oThis.setState({
        deviceList: devices.data
      })
    })
    .catch(function (error) {
      console.log(error);
    })
  },

  render: function () {
    return (
     <div className = "app-component container">
        <div className="top-layout row">
          <div className="top-text col-md-8 col-lg-8 col-sm-8">
              'Lorem Ipsum'
          </div>
          <div className="top-filter col-md-3 col-lg-3 col-sm-3">
            <Filter listOptions = {this.state.listOptions} filterChanged = {this.filterChanged}/>
          </div>
        </div>
        <div className="new-device-layout">
          <NewDevice isLoggedIn={true} addDevice = {this.addDevice}/>
        </div>
        <div className = "table-layout row">
          <div className = "col-md-11 col-lg-11 col-sm-11">
            <Table deviceList = {this.state.deviceList} deviceReturned = {this.deviceReturned} deviceAllocate = {this.deviceAllocate}/>
          </div>
        </div>
    </div>
    )
  }
})


module.exports = App;
