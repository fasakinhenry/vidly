const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const home = require('./routes/home');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
app.use(express.json());
app.set('view engine', 'pug');
app.set('views', './views');

mongoose
  .connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan enabled...');
}

// Routes
app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);

port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
