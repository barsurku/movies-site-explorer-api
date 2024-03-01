require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const { errorServer } = require('./middlewares/error');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/rateLimiter');

const app = express();

app.use(helmet());

app.use(cors);

app.use(express.json());

app.use(requestLogger);

app.use(limiter);

const { PORT = 3000 } = process.env;

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorServer);

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

app.listen(PORT);
