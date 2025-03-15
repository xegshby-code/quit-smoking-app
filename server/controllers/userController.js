const User = require('../models/User');
const Symptom = require('../models/Symptom');

// Обновление данных пользователя
exports.updateUserData = async (req, res) => {
  try {
    const { quitDate, cigarettesPerDay, packPrice, cigarettesInPack } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    
    if (quitDate !== undefined) user.quitDate = quitDate;
    if (cigarettesPerDay !== undefined) user.cigarettesPerDay = cigarettesPerDay;
    if (packPrice !== undefined) user.packPrice = packPrice;
    if (cigarettesInPack !== undefined) user.cigarettesInPack = cigarettesInPack;
    
    await user.save();
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
};

// Добавление нового симптома
exports.addSymptom = async (req, res) => {
  try {
    const { text, intensity } = req.body;
    
    const newSymptom = new Symptom({
      user: req.user.id,
      text,
      intensity,
      date: new Date()
    });
    
    await newSymptom.save();
    
    res.status(201).json(newSymptom);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
};

// Получение всех симптомов пользователя
exports.getSymptoms = async (req, res) => {
  try {
    const symptoms = await Symptom.find({ user: req.user.id }).sort({ date: -1 });
    
    res.json(symptoms);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
};

// Удаление симптома
exports.deleteSymptom = async (req, res) => {
  try {
    const symptom = await Symptom.findById(req.params.id);
    
    if (!symptom) {
      return res.status(404).json({ message: 'Симптом не найден' });
    }
    
    // Проверка, принадлежит ли симптом текущему пользователю
    if (symptom.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Нет прав доступа' });
    }
    
    await symptom.remove();
    
    res.json({ message: 'Симптом удален' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
};