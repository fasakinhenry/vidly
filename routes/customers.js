const express = require('express');
const { Customer, validate } = require('../models/customers');
const router = express.Router();

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
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = new Customer({
    name: req.body.name,
    phone: req.body.name,
    isGold: req.body.isGold,
  });

  await customer.save();
  res.status(201).json(genre);
});

// update a specific customer
router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold,
    },
    { new: true }
  );
  if (!customer)
    return res.status(404).send('The customer with the given ID was not found');

  res.json(customer);
});

// Delete a customer
router.delete('/:id', async (req, res) => {
  const customer = await Customer.deleteOne({ _id: id });
  if (customer.deletedCount === 0)
    return res.status(404).send('The customer with the given ID was not found');

  res.json(customer);
});

module.exports = router;
