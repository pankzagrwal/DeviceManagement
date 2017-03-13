import React from 'react';
import ReactDOM from 'react-dom';
import Filter from './filter/index.js';
import Table from './table/index.js';
import styles from './app.css';


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

var deviceObj = [{
  name: "iphone",
  id: 1,
  isAvl: false,
  allocated_to: "Pankaj",
  allocation_date: "01/02/17",
  return_date: ""
}, {
  name: "ipad",
  id: 2,
  isAvl: true,
  allocated_to: "",
  allocation_date: "",
  return_date: ""
}, {
  name: "nexus",
  id: 3,
  isAvl: true,
  allocated_to: "",
  allocation_date: "",
  return_date: ""
}]

var App = React.createClass({

filterChanged: function (id) {
  console.log("filter Changed...");
  let deviceList = deviceObj;
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

deviceReturned: function (id) {

  const deviceList = this.state.deviceList;

  for (const key in deviceList) {
      if (deviceList[key].id === id) {
        const device = deviceList[key];
        device.isAvl = true;
        device.allocated_to = "";
      }
  }

  this.setState({
    deviceList: deviceList
  })
},

deviceAllocate: function (config) {
  const deviceList = this.state.deviceList;

  for (const key in deviceList) {
      if (deviceList[key].id === config.id) {
        const device = deviceList[key];
        device.isAvl = false;
        device.allocated_to = config.allocated_to;
        device.allocation_date = (new Date()).toDateString();
      }
  }

  this.setState({
    deviceList: deviceList
  })

},

getInitialState: function () {
    return {
      listOptions: listOptions,
      deviceList: deviceObj
    }
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
