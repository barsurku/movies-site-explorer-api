const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: {
      value: true,
      message: 'Поле "Страна" должно быть заполнено',
    },
  },
  director: {
    type: String,
    required: {
      value: true,
      message: 'Поле "Режиссёр" должно быть заполнено',
    },
  },
  duration: {
    type: Number,
    required: {
      value: true,
      message: 'Поле "Длительность фильма" должно быть заполнено',
    },
  },
  year: {
    type: String,
    required: {
      value: true,
      message: 'Поле "Год выпуска" должно быть заполнено',
    },
  },
  description: {
    type: String,
    required: {
      value: true,
      message: 'Поле "Описание" должно быть заполнено',
    },
  },
  image: {
    type: String,
    required: {
      value: true,
      message: 'Поле "Ссылка на постер" должно быть заполнено',
    },
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  trailerLink: {
    type: String,
    required: {
      value: true,
      message: 'Поле "Ссылка на трейлер" должно быть заполнено',
    },
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  thumbnail: {
    type: String,
    required: {
      value: true,
      message: 'Поле "Ссылка на миниатюрное изображение постера" должно быть заполнено',
    },
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: {
      value: true,
      message: 'Поле "Название фильма на русском языке" должно быть заполнено',
    },
  },
  nameEN: {
    type: String,
    required: {
      value: true,
      message: 'Поле "Название фильма на английском языке" должно быть заполнено',
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);
