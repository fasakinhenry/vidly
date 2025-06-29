const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
});

const Genre = mongoose.model('Genre', genreSchema);

// Get all genres
router.get('/', async (req, res) => {
  const genres = await Genre.find();
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
router.post('/', async (req, res) => {
  const { error } = validateGenre(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const newGenre = new Genre({
    name: req.body.name,
  });
  await newGenre.save();
  res.status(201).json(newGenre);
});

// Update a genre
router.put('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send('Genre not found');

  const { name } = req.body;
  if (!name) return res.status(400).send('Name is required');

  genre.name = name;
  res.json(genre);
});

// Delete a genre
router.delete('/:id', (req, res) => {
  const genreIndex = genres.findIndex((g) => g.id === parseInt(req.params.id));
  if (genreIndex === -1) return res.status(404).send('Genre not found');

  const deletedGenre = genres.splice(genreIndex, 1);
  res.json(deletedGenre[0]);
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
}

module.exports = router;
