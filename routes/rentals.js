const express = require('express');
const router = express.Router();
const { Rental, validate } = require('../models/rentals');

// Get the list of rentals
// GET /api/rentals
router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.json(rentals);
});

// Get a particular rental item by the ID
// GET /api/rental/:id
router.get('/:id', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.json(rentals);
});

// Create a new rental
// POST /api/rentals
