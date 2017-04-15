import React from 'react';
import ReactDOM from 'react-dom';


var TableRow = React.createClass({


  handleDeviceReturn: function () {

    this.props.handleReturn(this.props.rowItem.name)
  },

  handleDeviceAllocation: function () {
    //var input = this.textInput;

    this.props.handleAllocation({
      allocated_to: this.props.username,
      name: this.props.rowItem.name
    });
    //input.value = "";
  },

  render: function () {
    var oThis = this,
        row = oThis.props.rowItem;
    return (
      <div className={"table-row " + (row.isAvl ? "avl" : "notAvl")}>
        <div className = "cell">
          <span> {row.name} </span>
        </div>
        <div className = "cell">
          <span> {row.isAvl.toString()} </span>
        </div>
        <div className = {"cell " + (row.isAvl ? "" : "hide")}>
          <span>
            <input type= "text" placeholder = "your name"  value = {this.props.username} disabled/>
          </span>
        </div>
        <div className = {"cell " + (row.isAvl ? "" : "hide")}>
          <span>
            <button className = "allocate_button buttn" onClick = {this.handleDeviceAllocation}>Allocate Me</button>
          </span>
        </div>
        <div className = {"cell " + (row.isAvl ? "hide" : "")}>
          <span> {row.allocated_to} </span>
        </div>
        <div className = {"cell " + (row.isAvl ? "hide" : "")}>
          <span> {row.allocation_date} </span>
        </div>
        { row.allocated_to === this.props.username && 
          <div className = {"cell " + (row.isAvl ? "hide" : "")}>
          <button className = "return_button buttn" onClick = {this.handleDeviceReturn}>Return</button>
        </div>
        }
        
      </div>
    )
  }
})

module.exports = TableRow;
