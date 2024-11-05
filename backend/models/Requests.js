const {DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres_2', 'postgres', '135135', {
  host: 'localhost',
  dialect: 'postgres'
});

const Request = sequelize.define('requests', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  name_university: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc:{
    type: DataTypes.TEXT,
    allowNull:false,
  },
  img:{
    type: DataTypes.STRING,
    allowNull:false,
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id:{
    type: DataTypes.STRING,
    allowNull:true,
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

module.exports = Request;