import mongoose from 'mongoose';
import Device from '../database/device.js';
import errorCode from './errorCode.js';

var getAllDevices = function(req, res) {

    Device.find({}, function(err, devices) {
        if (err) {
            console.log("EROOOOOOR")
        }
        res.json(devices);
    })
}

var updateDeviceStatus = function(req, res) {
    let name = req.body.name,
        isAvl = req.body.isAvl,
        allocation_date = req.body.allocated_date,
        allocated_to = req.body.allocated_to;

    Device.findOneAndUpdate({ name: name }, {
            $set: {
                allocated_to: allocated_to,
                allocation_date: allocation_date,
                return_date: isAvl ? (new Date()).toString() : "",
                isAvl: isAvl
            }
        }, { new: true, upsert: true })
        .then(function(dbRess, err) {
            res.json(dbRess);
        });
}

var addNewDevice = function(req, res) {
    let device = new Device({
        name: req.body.name,
        isAvl: true
    })

    device.save(function(err) {
        if (err) {
            let errMsg = errorCode[err.code];
            res.status(500).send({ "error": errMsg });
        } else {
            res.json(device);
        }

    })
}

module.exports = {
    getAllDevices: getAllDevices,
    updateDeviceStatus: updateDeviceStatus,
    addNewDevice: addNewDevice
};
