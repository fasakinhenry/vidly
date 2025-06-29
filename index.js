const express = require('express');
const app = express();
const Joi = require('joi');
const morgan = require('morgan');
const helmet = require('helmet');

const home = require('./routes/home');
const genres = require('./routes/courses');
app.use(express.json());
app.set('view engine', 'pug');
app.set('views', './views');

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan enabled...');
}

// Routes
app.use('/', home);
app.use('/api/genres', genres);

app.use(helmet());

port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
