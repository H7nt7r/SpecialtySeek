const {DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres_2', 'postgres', '135135', {
  host: 'localhost',
  dialect: 'postgres'
});

const Specialty=require('./Specialties')

const Faculty = sequelize.define('faculties', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  university_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
        model: 'universities',
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
  }
});

Faculty.hasMany(Specialty,{
  foreignKey: 'faculty_id',
});

module.exports = Faculty;