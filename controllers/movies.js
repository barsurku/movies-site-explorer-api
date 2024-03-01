const Movie = require('../models/movie');
const NotFound = require('../utils/error/notFound');
const BadRequest = require('../utils/error/badRequest');
const ForbiddenError = require('../utils/error/Forbidden');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Введены некорректные данные'));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (movie === null) {
        return next(new NotFound('Фильм не найден'));
      } if (req.user._id !== movie.owner.toString()) {
        return next(new ForbiddenError('Невозможно удалить'));
      } return movie.deleteOne()
        .then(() => {
          res.status(200).send({ message: 'Фильм успешно удален' });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Введены некорректные данные'));
      }
      return next(err);
    });
};
