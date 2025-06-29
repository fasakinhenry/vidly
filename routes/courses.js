const express = require('express');
const router = express.Router();

const genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Comedy' },
  { id: 3, name: 'Drama' },
];

// Get all genres
router.get('/', (req, res) => {
  res.json(genres);
});

// Get a genre by ID
router.get('/:id', (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send('The Genre with the given ID was not found');
  res.json(genre);
});

// Create a new genre
router.post('/', (req, res) => {
  const { error } = validateGenre(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const newGenre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(newGenre);
  res.status(201).json(newGenre);
});

// Update a genre
router.put('/:id', (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('Genre not found');

  const { name } = req.body;
  if (!name) return res.status(400).send('Name is required');

  genre.name = name;
  res.json(genre);
});

// Delete a genre
router.delete('/:id', (req, res) => {
  const genreIndex = genres.findIndex((g) => g.id === parseInt(req.params.id));
  if (genreIndex === -1) return res.status(404).send('Genre not found');

  const deletedGenre = genres.splice(genreIndex, 1);
  res.json(deletedGenre[0]);
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
}

module.exports = router;
