const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const router = express.Router();

const Customer = mongoose.model(
  'Customer',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    isGold: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: true,
    },
  })
);

// Get all the customers from the  datatbase
router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.json(customers);
});

// Get the details of a particular customer
router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    return res.status(404).send('The customer with the given ID was not found');
  res.json(customer);
});

// Create new customer
router.post('/', async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = new Customer({
    name: req.body.name,
    phone: req.body.name,
  });

  await customer.save();
  res.status(201).json(genre);
});

// update a specific customer
router.put('/:id', async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
        name: req.body.name,
        phone: req.body.phone
    },
    { new: true }
  );
  if (!customer)
    return res.status(404).send('The customer with the given ID was not found');

  res.json(customer);
});

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(3).Required,
    phone: Joi.string().min(3).Required,
  });
  return schema.validate(customer);
}

module.exports = router;
