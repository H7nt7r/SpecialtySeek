const Discipline = require('../models/Disciplines');

const createDiscipline = async(disciplineData) => {
  const discipline = await Discipline.create(disciplineData);
  return discipline;
};

const getDisciplineById = async (disciplineId) => {
  const discipline = await Discipline.findByPk(disciplineId);
  return discipline;
};

const updateDiscipline = async (disciplineId, disciplineData) => {
  const discipline = await Discipline.findByPk(disciplineId);
  await discipline.update(disciplineData);
  return discipline;
};

const deleteDiscipline = async (disciplineId) => {
  const discipline = await Discipline.findByPk(disciplineId);
  await discipline.destroy();
};

const getAllDisciplines = async () => {
  const discipline = await Discipline.findAll();
  return discipline;
};

module.exports = {
  createDiscipline,
  getDisciplineById,
  updateDiscipline,
  deleteDiscipline,
  getAllDisciplines,
};
