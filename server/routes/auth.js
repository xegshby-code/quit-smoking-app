const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// @route   POST api/auth/register
// @desc    Регистрация пользователя
// @access  Public
router.post('/register', authController.register);

// @route   POST api/auth/login
// @desc    Вход пользователя
// @access  Public
router.post('/login', authController.login);

// @route   GET api/auth/user
// @desc    Получение данных текущего пользователя
// @access  Private
router.get('/user', auth, authController.getCurrentUser);

module.exports = router;