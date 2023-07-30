const usersRouter = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');
const { auth } = require('../middlewares/auth');

usersRouter.get('/', auth, getUsers);
usersRouter.get('/:id', auth, getUserById);
usersRouter.post('/', createUser);
usersRouter.patch('/me', auth, updateProfile);
usersRouter.patch('/me/avatar', auth, updateAvatar);
usersRouter.get('/users/me', auth, getUsers);

module.exports = usersRouter;
