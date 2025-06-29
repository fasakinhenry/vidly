const express = require('express');
const app = express();
const Joi = require('joi');
const morgan = require('morgan');
const helmet = require('helmet');
const router = express.Router();
app.use(express.json());
app.set('view engine', 'pug');
app.set('views', './views');

if (app.get('env') === 'development') {
  app.use(morgan('dev'));
  console.log('Morgan enabled...');
}
app.use(helmet());

const genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Comedy' },
  { id: 3, name: 'Drama' },
];

app.get('/', (req, res) => {
    res.render('index', { title: 'Vidly - Home', message: 'Welcome to Vidly!' });
});

port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
