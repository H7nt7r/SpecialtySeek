const disciplineRepository = require('../repository/DisciplinesRepository.js');

const createDiscipline = async (disciplineData) => {
  const discipline = await disciplineRepository.createDiscipline(disciplineData);
  return discipline;
};

const getDisciplineById = async (disciplineId) => {
  const discipline = await disciplineRepository.getDisciplineById(disciplineId);
  return discipline;
};

const updateDiscipline = async (disciplineId, disciplineData) => {
  const discipline = await disciplineRepository.updateDiscipline(disciplineId, disciplineData);
  return discipline;
};

const deleteDiscipline = async (disciplineId) => {
  await disciplineRepository.deleteDiscipline(disciplineId);
};

const getAllDisciplines = async () => {
  const discipline = await disciplineRepository.getAllDisciplines();
  return discipline;
};

module.exports = {
  createDiscipline,
  getDisciplineById,
  updateDiscipline,
  deleteDiscipline,
  getAllDisciplines,
};
