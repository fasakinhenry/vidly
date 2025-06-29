const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Vidly - Home', message: 'Welcome to Vidly!' });
});

module.exports = router;
