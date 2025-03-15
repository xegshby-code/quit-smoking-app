const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Получение токена из заголовка
  const token = req.header('x-auth-token');
  
  // Проверка наличия токена
  if (!token) {
    return res.status(401).json({ message: 'Нет токена, авторизация отклонена' });
  }
  
  try {
    // Верификация токена
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Добавление пользователя из токена в объект запроса
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Токен недействителен' });
  }
};