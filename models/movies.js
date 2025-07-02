const mongoose = require('mongoose');
const { genreSchema } = require('./genres');
const Joi = require('joi');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 0,
    trim: true,
    maxlength: 255,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
});

const Movie = mongoose.model('movie', movieSchema);

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(0).required(),
    genre: Joi.string().required(),
    numberInStock: Joi.number().min(0).max(255).required(),
    dailyRentalRate: Joi.number().min(0).max(255).required(),
  });
  return schema.validate(movie);
}

exports.Movie = Movie;
exports.validate = validateMovie;
