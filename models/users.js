const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model(
  'user',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 0,
      maxlength: 255,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 0,
      maxlength: 255,
    },
    password: {
      type: String,
      required: true,
      minlength: 0,
      maxlength: 1024,
    },
  })
);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
