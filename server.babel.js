import express from 'express';
import mongoose from 'mongoose';
import deviceRequestHandler from './api/deviceRequestHandler.js';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';

mongoose.connect('mongodb://localhost/db');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connected to DB....");

});



const app = express();

app.use('/', express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(clientErrorHandler);
app.use(errorHandler);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  console.log("First");
  res.status(500).send('Something broke!')
})

function errorHandler (err, req, res, next) {
	console.log("Second");
  res.status(500)
  res.render('error', { error: err })
}

function clientErrorHandler (err, req, res, next) {
	console.log("Third");
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}


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
})

app.listen(process.env.PORT || 3000);

console.log("Server Started ....")
