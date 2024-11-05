const {DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres_2', 'postgres', '135135', {
  host: 'localhost',
  dialect: 'postgres'
});

const Discipline_type=require('./Discipline_types')

const Discipline = sequelize.define('disciplines', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
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
    allowNull: true,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

Discipline.hasMany(Discipline_type,{
  foreignKey: 'discipline_id',
});
Discipline_type.belongsTo(Discipline, { foreignKey: 'discipline_id'})

module.exports = Discipline;