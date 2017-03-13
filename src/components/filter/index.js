import React from 'react';
import ReactDOM from 'react-dom';
import styles from './filter.css'

//listOptions to display the list of items
// filterChanged prop get call when made selection

var Filter = React.createClass({

  toggleFilter: function (e) {
    this.setState({filterOpen: !this.state.filterOpen})
  },

  optionSelected: function (e) {
    var ref = parseInt(e.target.dataset.ref, 10);
    var listOptions = this.listOptions;

    for (let key in  listOptions) {
      if (listOptions[key].id === ref) {
        this.setState({
          currentFilter: listOptions[key].name,
          filterOpen: !this.state.filterOpen
        })
      }
    }
    
    this.props.filterChanged(parseInt(ref, 10));
  },

  getInitialState: function () {
    return {
      currentFilter: "All",
      filterOpen: false
    }
  },

  render: function () {
    var oThis = this;
    oThis.listOptions = oThis.props.listOptions;
    return (
      <div className="filter-component">
      <div className = "">
        <div className = "filter">
          <div className = "filter-current" onClick = {this.toggleFilter}>
            <span>{this.state.currentFilter}</span>
            <a href="#">
              <span className={"glyphicon " + (!this.state.filterOpen ? "glyphicon-chevron-up" : "glyphicon-chevron-down")}></span>
            </a>
          </div>
          <div className={"selection-option " + (!this.state.filterOpen ? 'hide' : '') }>
            <ul className = "list-unstyled">
              {
                this.props.listOptions.map(function (item, i) {
                  return (
                    <li key = {item.id} data-ref ={item.id} onClick = {oThis.optionSelected}>{item.name}</li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>

      </div>
    )
  }
})

module.exports = Filter;
