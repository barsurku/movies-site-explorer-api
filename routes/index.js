const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFound = require('../utils/error/notFound');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validationCreateUser, validateLoginAuth } = require('../middlewares/validation');

router.post('/signin', validateLoginAuth, login);
router.post('/signup', validationCreateUser, createUser);
router.use(auth);

router.use('/', usersRouter);
router.use('/', moviesRouter);
router.use('*', (req, res, next) => {
  next(new NotFound('Страница не найдена.'));
});

module.exports = router;
