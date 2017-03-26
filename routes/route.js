import deviceRequestHandler from '../api/deviceRequestHandler.js';


module.exports = function (app) {


	//Get All Devices
	app.get('/devices', function (req, res) {
	  deviceRequestHandler.getAllDevices(req, res);
	});


	//Update Device Status. Allocation/Return
	app.put('/devices/update', function (req, res) {
	  deviceRequestHandler.updateDeviceStatus(req, res);
	});


	//Add New Device
	app.post('/device/add', function (req, res) {
		deviceRequestHandler.addNewDevice(req, res);
	});

}