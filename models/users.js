const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1, // Changed from 0 to 1
    maxlength: 50, // Reduced from 255 for better validation
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Changed from 0 to 6 for security
    maxlength: 1024,
  },
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { _id: this._id }, 
    process.env.JWT_PRIVATE_KEY // Changed from config.get('jwtPrivateKey')
  );
  return token;
}

const User = mongoose.model('user', userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(50).required(), // Added min length
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(100).required(), // Changed min from 5 to 6
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
