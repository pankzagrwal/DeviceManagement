import React from 'react';
import ReactDOM from 'react-dom';

var NewDevice = React.createClass({
	getInitialState: function () {
		return {
			name: ""
		}
	},

	handleInputChange: function (event) {
		this.setState({name: event.target.value});

	},

	handleFormSubmit: function (event) {
		var oThis = this;
		event.preventDefault();
		event.stopPropagation();
		var promise = this.props.addDevice(this.state.name);
		promise.then(function (res) {
			oThis.setState({
				name: ""
			});
		})
	},

	render: function () {
		const isLoggedIn = this.props.isLoggedIn;
		if (!isLoggedIn) {
			return (
				<div></div>
			)
				
				
		}
		return (
				<div className="newDevice-comp">
					<form onSubmit={this.handleFormSubmit}>
					  <label>
					    New Device:
					    <input type="text" name="name" value = {this.state.name} onChange = {this.handleInputChange}/>
					  </label>
					  <input type="submit" value="Submit" />
					</form>
				</div>
			)
	}
})

module.exports = NewDevice;