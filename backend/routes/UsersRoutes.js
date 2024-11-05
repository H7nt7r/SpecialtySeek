const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userController');
const authenicate = require('../error/authenicate');
const { validateUser } = require('../middle/userShema');

router.get('/info', authenicate, usersController.getUserFromToken);
router.post('/', validateUser, usersController.createUser);
router.get('/:id', authenicate, usersController.getUserById);
router.put('/:id', authenicate, validateUser, usersController.updateUser);
router.delete('/:id', authenicate, usersController.deleteUser);
router.get('/', usersController.getAllUsers);

module.exports = router;
