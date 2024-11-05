const {DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres_2', 'postgres', '135135', {
  host: 'localhost',
  dialect: 'postgres'
});


const Faculty=require('./Faculties');
const Review=require('./Reviews');
const Request=require('./Requests');
const Specialty = require('./Specialties');

const University = sequelize.define('universities', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
    allowNull:true,
  },
  user_id:{
    type: DataTypes.BIGINT,
    allowNull: true,
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

University.hasMany(Faculty,{
  foreignKey: 'university_id',
});

University.hasMany(Specialty,{
  foreignKey: 'university_id',
});

University.hasMany(Review,{
  foreignKey: 'university_id',
});

module.exports = University;
