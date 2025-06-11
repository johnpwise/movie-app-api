// routes/movies.js
const express = require('express');
const router = express.Router();
const { getAllMovies, addMovie, updateMovie, deleteMovie } = require('../controllers/moviesController');

router.get('/', getAllMovies);
router.post('/:id', addMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

module.exports = router;
