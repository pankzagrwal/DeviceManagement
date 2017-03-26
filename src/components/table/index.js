import React from 'react';
import ReactDOM from 'react-dom';
import TabelRow from './tabelRow/index.js';
import styles from './table.css'

var Table = React.createClass({

  handleReturn : function (id) {
    this.props.deviceReturned(id)
  },

  handleAllocation: function (config) {
    this.props.deviceAllocate(config);
  },

  render: function () {
    var oThis = this;
    return (
      <div className="table-component">
        <div className="header">
          <div className="table-row">
            <div className="cell">
              <span>Device Name</span>
            </div>
            <div className="cell">
              <span>Available</span>
            </div>
            <div className="cell">
              <span>Allocation</span>
            </div>
            <div className="cell">
              <span>Allocation Date</span>
            </div>
          </div>
      </div>
      <div className="table-content">
        {
          oThis.props.deviceList.map(function (row) {
            return (
              <TabelRow username = {oThis.props.username} key = {row.name} rowItem = {row} handleReturn = {oThis.handleReturn} handleAllocation = {oThis.handleAllocation}/>
            )
          })
        }
      </div>
    </div>
    )
  }
});

module.exports = Table;
