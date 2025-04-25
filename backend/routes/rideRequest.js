const express = require('express');
const router = express.Router();
const RideRequest = require('../models/rideRequest');

// Create a new ride request
router.post('/', async (req, res) => {
  try {
    const rideRequest = new RideRequest({
      requestId: req.body.requestId,
      rideId: req.body.rideId,
      passengerId: req.body.passengerId,
      driverId: req.body.driverId,
      source: req.body.source,
      destination: req.body.destination,
      dateTime: req.body.dateTime,
      seatsRequested: req.body.seatsRequested,
      status: req.body.status
    });

    const savedRequest = await rideRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 