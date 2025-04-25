const mongoose = require('mongoose');

const rideRequestSchema = new mongoose.Schema({
  requestId: {
    type: String,
    required: true,
    unique: true
  },
  rideId: {
    type: String,
    required: true
  },
  passengerId: {
    type: String,
    required: true
  },
  driverId: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  dateTime: {
    type: Date,
    required: true
  },
  seatsRequested: {
    type: Number,
    required: true,
    default: 1
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'accepted', 'rejected', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('RideRequest', rideRequestSchema); 