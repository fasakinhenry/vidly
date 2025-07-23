require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const home = require('./routes/home');
const genres = require('./routes/genres');
const movies = require('./routes/movies');
const customers = require('./routes/customers');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'https://vidlyclips.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-auth-token'],
  exposedHeaders: ['x-auth-token']
}));

app.use(express.json());
app.set('view engine', 'pug');
app.set('views', './views');

// Check for required environment variables
if (!process.env.JWT_PRIVATE_KEY) { // Changed from vidly_jwtPrivateKey
  console.error('FATAL ERROR: JWT_PRIVATE_KEY is not defined');
  process.exit(1);
}

if (!process.env.MONGODB_URI) {
  console.error('FATAL ERROR: MONGODB_URI is not defined');
  process.exit(1);
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan enabled...');
}

// Routes
app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
