const express = require('express');
const router = express.Router();
const { Rental, validate } = require('../models/rentals');
const { Movie } = require('../models/movies');
const { Customer } = require('../models/customers');

// Get all rentals
router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.json(rentals);
});

// Get a rental by ID
router.get('/:id', async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  if (!rental)
    return res.status(404).send('The rental with the given ID was not found');
  res.json(rental);
});

// Create a new rental
router.post('/:id', async (req, res) => {
  // validate the body of the request
  const { error } = validate(req.body);
  if (!error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(400).send('Invalid customer');

  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(400).send('Invalid movie');

  if (movie.numberInstock === 0)
    return res.status(400).send('Movie not in stock');
  // create a new rental
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
  // save the rental
  rental = await rental.save();

  //   Decrement the number of movies in stock
  movie.numberInStock--;
  movie.save();
  // send the created rental to the client
  res.json(rental);
});
