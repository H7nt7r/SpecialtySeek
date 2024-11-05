const {DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres_2', 'postgres', '135135', {
  host: 'localhost',
  dialect: 'postgres'
});

const User_type = sequelize.define('user_types', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
        model: 'users',
        key: 'id',
      },
  },
  type_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
        model: 'Types',
        key: 'id',
      },
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

module.exports = User_type;