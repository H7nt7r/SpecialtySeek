const {DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres_2', 'postgres', '135135', {
  host: 'localhost',
  dialect: 'postgres'
});

const Discipline_type=require('./Discipline_types')

const Specialty = sequelize.define('specialties', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
  },
  faculty_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
        model: 'faculties',
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

Specialty.hasMany(Discipline_type,{
  foreignKey: 'speciality_id',
});
Discipline_type.belongsTo(Specialty, {foreignKey: 'speciality_id'})

module.exports = Specialty;