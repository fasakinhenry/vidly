const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js')
const { Genre, validate} = require('../models/genres.js')

// Get all genres
router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.json(genres);
});

// Get a genre by ID
router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send('The Genre with the given ID was not found');
  res.json(genre);
});

// Create a new genre
router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const newGenre = new Genre({
    name: req.body.name,
  });
  await newGenre.save();
  res.status(201).json(newGenre);
});

// Update a genre
router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre)
    return res.status(404).send('The Genre with the given ID was not found');

  res.json(genre);
});

// Delete a genre
router.delete('/:id', async (req, res) => {
  const genre = await Genre.deleteOne({ _id: req.params.id });
  if (genre.deletedCount === 0)
    return res.status(404).send('The Genre with the given ID was not found');

  res.json(genre);
});

module.exports = router;
