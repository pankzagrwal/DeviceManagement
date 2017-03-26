import mongoose from 'mongoose';

var Schema = mongoose.Schema;


//Create Schema

var deviceSchema = new Schema ({
  name: {type: String, unique: true},
  allocated_to: String,
  allocation_date: String,
  return_date: String,
  isAvl: Boolean
});

//Create Device Model

var Device = mongoose.model('Device', deviceSchema);

module.exports = Device;
