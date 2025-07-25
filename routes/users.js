const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/users');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth')

// get the current user
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.json(user);
})

// Create a new user(signup)
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).status(201).json(_.pick(user, ['_id','name', 'email']));
});

module.exports = router;
