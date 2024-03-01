const usersRouter = require('express').Router();
const {
  getUserByID, updateUser,
} = require('../controllers/users');
const { validationUpdateUser } = require('../middlewares/validation');

usersRouter.get('/users/me', getUserByID);
usersRouter.patch('/users/me', validationUpdateUser, updateUser);

module.exports = usersRouter;
