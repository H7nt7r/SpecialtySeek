const discipline_typeRepository = require('../repository/Discipline_TypesRepository');

const createDiscipline_Type = async (discipline_typeData) => {
  const discipline_type = await discipline_typeRepository.createDiscipline_Type(discipline_typeData);
  return discipline_type;
};

const getDiscipline_TypeById = async (discipline_typeId) => {
  const discipline_type = await discipline_typeRepository.getDiscipline_TypeById(discipline_typeId);
  return discipline_type;
};

const updateDiscipline_Type = async (discipline_typeId, discipline_typeData) => {
  const discipline_type = await discipline_typeRepository.updateDiscipline_Type(discipline_typeId, discipline_typeData);
  return discipline_type;
};

const deleteDiscipline_Type = async (discipline_typeId) => {
  await discipline_typeRepository.deleteDiscipline_Type(discipline_typeId);
};

const getAllDisciplines_Types = async () => {
  const discipline_type = await discipline_typeRepository.getAllDisciplines_Types();
  return discipline_type;
};

module.exports = {
  createDiscipline_Type,
  getDiscipline_TypeById,
  updateDiscipline_Type,
  deleteDiscipline_Type,
  getAllDisciplines_Types,
};
