const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// @route   PUT api/users/data
// @desc    Обновление данных пользователя
// @access  Private
router.put('/data', auth, userController.updateUserData);

// @route   POST api/users/symptoms
// @desc    Добавление нового симптома
// @access  Private
router.post('/symptoms', auth, userController.addSymptom);

// @route   GET api/users/symptoms
// @desc    Получение всех симптомов пользователя
// @access  Private
router.get('/symptoms', auth, userController.getSymptoms);

// @route   DELETE api/users/symptoms/:id
// @desc    Удаление симптома
// @access  Private
router.delete('/symptoms/:id', auth, userController.deleteSymptom);

module.exports = router;