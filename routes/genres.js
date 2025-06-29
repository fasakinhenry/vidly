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
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre) return res.status(404).send('The Genre with the given ID was not found');

  res.json(genre);
});

// Delete a genre
router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send('The Genre with the given ID was not found');

  res.json(genre);
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
}

module.exports = router;
