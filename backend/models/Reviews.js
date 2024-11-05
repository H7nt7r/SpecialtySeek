const {DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres_2', 'postgres', '135135', {
  host: 'localhost',
  dialect: 'postgres'
});

const Review = sequelize.define('reviews', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  rating:{
    type: DataTypes.SMALLINT,
    allowNull:false,
  },
  university_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
        model: 'universities',
        key: 'id',
      },
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
        model: 'users',
        key: 'id',
      },
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
});

module.exports = Review;