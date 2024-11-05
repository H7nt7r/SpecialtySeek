const {DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres_2', 'postgres', '135135', {
  host: 'localhost',
  dialect: 'postgres'
});

require("../passport");
const passport = require("passport");

async function getUserRole(userId) {
  try {
    // Запрос к базе данных для получения типа пользователя
    const result = await sequelize.query('SELECT Types.name FROM users JOIN user_types ON users.id = user_types.user_id JOIN Types ON user_types.type_id = Types.id WHERE users.id = ?', {
      replacements: [userId],
      type: sequelize.QueryTypes.SELECT
    });

    // Проверяем, есть ли строки в результате запроса
    if (result.length > 0) {
      // Возвращаем имя типа пользователя из первой строки результата
      return result[0].name;
    } else {
      // Если нет строк в результате, возвращаем какое-то значение по умолчанию или null
      return null;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}
  
  function authenticate(req, res, next) { 
    passport.authenticate('jwt', { session: false }, async function(err, user, info) { 
      if (err) { return next(err); } 
      if (!user) { return res.status(404).json({code: 404, message: 'Can\'t authorize' ,status:false}); } 
  
      const role = await getUserRole(user.id);
  
      if (role !== 'Admin' && role !== 'Manager') { return res.status(403).json({code: 403, message: 'Only admins and managers can access this page' ,status:false}); }
      req.user = user; 
      next(); 
    })(req, res, next); 
  }

	module.exports = authenticate;