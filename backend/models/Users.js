const {DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres_2', 'postgres', '135135', {
  host: 'localhost',
  dialect: 'postgres'
});

const Review=require('./Reviews');
const Type = require ('./Types');
const User_type=require('./User_types');
const Discipline=require('./Disciplines');

const User = sequelize.define('users', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

User.afterCreate(async (user, options) => {
  try {
    const defaultRole = await Type.findOne({ where: { id: 3 } });
    if (!defaultRole) {
      throw new Error('Тип с id=3 не найден');
    }

    const userRole = await User_type.create({
      user_id: user.id,
      type_id: defaultRole.id
    });

    if (!userRole) {
      throw new Error('Не удалось создать запись о роли пользователя');
    }

    console.log(`Запись о роли пользователя успешно создана для пользователя с id=${user.id}`);
  } catch (error) {
    console.error('Ошибка при создании записи о роли пользователя:', error.message);
  }
});

User.hasMany(Review,{
  foreignKey: 'user_id',
});

User.hasMany(Discipline,{
  foreignKey: 'user_id',
});

User.hasMany(User_type, { foreignKey: "user_id"});
User_type.belongsTo(User, { foreignKey: 'user_id' });

module.exports = User;