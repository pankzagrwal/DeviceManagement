import express from 'express';
import mongoose from 'mongoose';
import deviceRequestHandler from './api/deviceRequestHandler.js';
import bodyParser from 'body-parser';

mongoose.connect('mongodb://localhost/db');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connected to DB....");

});



const app = express();

app.use('/', express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Get All Devices
app.get('/devices', function (req, res) {

  deviceRequestHandler.getAllDevices(req, res);

});


//Update Device Status. Allocation/Return
app.put('/devices/update', function (req, res) {

  deviceRequestHandler.updateDeviceStatus(req, res);

})

app.listen(process.env.PORT || 3000);

console.log("Server Started ....")
