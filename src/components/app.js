import React from 'react';
import ReactDOM from 'react-dom';
import Filter from './filter/index.js';
import Table from './table/index.js';
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

// var deviceObj = [{
//   name: "iphone",
//   id: 1,
//   isAvl: false,
//   allocated_to: "Pankaj",
//   allocation_date: "01/02/17",
//   return_date: ""
// }, {
//   name: "ipad",
//   id: 2,
//   isAvl: true,
//   allocated_to: "",
//   allocation_date: "",
//   return_date: ""
// }, {
//   name: "nexus",
//   id: 3,
//   isAvl: true,
//   allocated_to: "",
//   allocation_date: "",
//   return_date: ""
// }]

var App = React.createClass({

filterChanged: function (id) {
  let deviceList = this.deviceList;
  let device;
  if (id === 0) {
    this.setState({
      deviceList: deviceList
    })
    return;
  }
  for (const key in deviceList) {
      if (deviceList[key].id === id) {
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
          <div className="top-text col-md-8">
              Lorem Ipsum
          </div>
          <div className="top-filter col-md-3">
            <Filter listOptions = {this.state.listOptions} filterChanged = {this.filterChanged}/>
          </div>
        </div>
        <div className = "table-layout row">
          <div className = "col-md-11">
            <Table deviceList = {this.state.deviceList} deviceReturned = {this.deviceReturned} deviceAllocate = {this.deviceAllocate}/>
          </div>
        </div>
    </div>
    )
  }
})


module.exports = App;
