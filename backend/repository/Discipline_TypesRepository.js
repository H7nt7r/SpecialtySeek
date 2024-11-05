const Discipline_Type = require('../models/Discipline_types');

const { Sequelize } = require('sequelize');


const createDiscipline_Type = async(discipline_typeData) => {
	const discipline_type = await Discipline_Type.create(discipline_typeData);
	return discipline_type;
};

const getDiscipline_TypeById = async (discipline_typeId) => {
  const discipline_type = await Discipline_Type.findByPk(discipline_typeId);
  return discipline_type;
};

const updateDiscipline_Type = async (discipline_typeId, discipline_typeData) => {
  const discipline_type = await Discipline_Type.findByPk(discipline_typeId);
  await discipline_type.update(discipline_typeData);
  return discipline_type;
};

const deleteDiscipline_Type = async (discipline_typeId) => {
  const discipline_type = await Discipline_Type.findByPk(discipline_typeId);
  await discipline_type.destroy();
};

const getAllDisciplines_Types = async () => {
  const discipline_type = await Discipline_Type.findAll();
  return discipline_type;
};

module.exports = {
  createDiscipline_Type,
  getDiscipline_TypeById,
  updateDiscipline_Type,
  deleteDiscipline_Type,
  getAllDisciplines_Types,
};
