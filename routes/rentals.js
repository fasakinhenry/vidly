const express = require('express');
const router = express.Router();
const { Rental, validate } = require('../models/rentals');
const { Movie } = require('../models/movies');
const { Customer } = require('../models/customers');

// GET all rentals
router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.json(rentals);
});

// GET rental by ID
router.get('/:id', async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  if (!rental)
    return res.status(404).send('The rental with the given ID was not found');
  res.json(rental);
});

// POST new rental (mocked transaction)
router.post('/', async (req, res) => {
  // Validate request body
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { customerId, movieId } = req.body;

  const customer = await Customer.findById(customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  const movie = await Movie.findById(movieId);
  if (!movie) return res.status(400).send('Invalid movie.');

  if (movie.numberInStock === 0)
    return res.status(400).send('Movie not in stock.');

  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  try {
    const savedRental = await rental.save();

    movie.numberInStock--;
    await movie.save();

    res.json(savedRental);
  } catch (err) {
    // If movie save fails, rollback rental
    await Rental.deleteOne({ _id: rental._id });
    console.error('Error saving rental or updating movie:', err);
    res.status(500).send('Something failed while saving the rental.');
  }
});

module.exports = router;
