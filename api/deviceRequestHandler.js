import mongoose from 'mongoose';
import Device from '../database/device.js';

var getAllDevices = function (req, res) {

	Device.find({}, function (err, devices) {
		if (err) {
		  console.log("EROOOOOOR")
		}
		res.json(devices);
	})
}

var updateDeviceStatus = function (req, res) {
	  var name = req.body.name;
	  var isAvl = req.body.isAvl;
	  var allocation_date = req.body.allocated_date;
	  var allocated_to = req.body.allocated_to;

	  Device.findOneAndUpdate({name: name}, {$set: {
	    allocated_to: allocated_to,
	    allocation_date: allocation_date,
	    return_date: isAvl ? (new Date()).toString() : "",
	    isAvl: isAvl
	  }}, { new: true, upsert: true })
	  .then(function (dbRess, err) {
	      res.json(dbRess);
	  });
}

module.exports = {
	getAllDevices: getAllDevices,
	updateDeviceStatus: updateDeviceStatus
};