const moviesRouter = require('express').Router();
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
const { validationCreateMovie, validationGetMovieById } = require('../middlewares/validation');

moviesRouter.get('/movies', getMovies);
moviesRouter.post('/movies', validationCreateMovie, createMovie);
moviesRouter.delete('/movies/:movieId', validationGetMovieById, deleteMovie);

module.exports = moviesRouter;
