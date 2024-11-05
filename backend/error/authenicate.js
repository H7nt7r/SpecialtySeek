const {DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres_2', 'postgres', '135135', {
  host: 'localhost',
  dialect: 'postgres'
});

require("../passport");
const passport = require("passport");

async function getUserRole(userId) {
  try {
    const result = await sequelize.query('SELECT Types.name FROM users JOIN user_types ON users.id = user_types.user_id JOIN Types ON user_types.type_id = Types.id WHERE users.id = ?', {
      replacements: [userId],
      type: sequelize.QueryTypes.SELECT
    });

    if (result.length > 0) {
      return result[0].name;
    } else {
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
  
      //const role = await getUserRole(user.id);
  
      //if (role !== 'Admin') { return res.status(403).json({code: 403, message: 'Only admins can access this page' ,status:false}); }
      req.user = user; 
      next(); 
    })(req, res, next); 
  }

	module.exports = authenticate;