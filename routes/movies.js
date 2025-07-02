const express = require('express');
const router = express.Router();
const { Movie, validate } = require('../models/movies.js');
const { Genre } = require('../models/genres.js');

// Get all movies
router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('title');
  res.json(movies);
});

// Get a movie by ID
router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie)
    return res.status(404).send('The Movie with the given ID was not found');
  res.json(movie);
});

// Create a new movie
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error);

  // Check if the genre exists
  const genre = await Genre.findById(req.body.genre);
  if (!genre) return res.status(400).send('Invalid genre.');

  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  await movie.save();
  res.status(201).json(movie);
});

// Update a movie
router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: req.body.genre,
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );
  if (!movie)
    return res.status(404).send('The Movie with the given ID was not found');

  res.json(movie);
});

// Delete a movie
router.delete('/:id', async (req, res) => {
  const movie = await Movie.deleteOne({ _id: req.params.id });
  if (movie.deletedCount === 0)
    return res.status(404).send('The Movie with the given ID was not found');

  res.json(movie);
});

module.exports = router;
