const {DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres_2', 'postgres', '135135', {
  host: 'localhost',
  dialect: 'postgres'
});

const Discipline_type = sequelize.define('discipline_types', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  discipline_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
        model: 'disciplines',
        key: 'id',
      },
  },
  speciality_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
        model: 'specialties',
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

module.exports = Discipline_type;