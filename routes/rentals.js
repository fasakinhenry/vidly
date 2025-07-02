const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
      },
      isGold: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
      }
    }),
  },
});

// Create a new rental
// POST /api/rentals
router.get('/', async (req, res) => {
  const rental = await Rental.find().select('name');
});

// Get the list of rentals
// GET /api/rentals
