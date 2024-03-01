require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { errorServer } = require('./middlewares/error');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/rateLimiter');

const app = express();
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://moviesbars.nomoredomainsmonster.ru',
      'http://moviesbars.nomoredomainsmonster.ru',
      'https://api.moviesbars.nomoredomainsmonster.ru',
    ],
    credentials: true,
  }),
);

app.use(express.json());

app.use(requestLogger);

app.use(helmet());

app.use(limiter);

const { PORT = 3000 } = process.env;

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorServer);

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

app.listen(PORT);
