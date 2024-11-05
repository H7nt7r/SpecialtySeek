const University = require('../models/Universities');

const createUniversity = async(universityData) => {
  const university = await University.create(universityData);
  return university;
};

const getUniversityById = async (universityId) => {
  const university = await University.findByPk(universityId);
  return university;
};

const updateUniversity = async (universityId, universityData) => {
  const university = await University.findByPk(universityId);
  await university.update(universityData);
  return university;
};

const deleteUniversity = async (universityId) => {
  const university = await University.findByPk(universityId);
  await university.destroy();
};

const getAllUniversities = async () => {
  const university = await University.findAll();
  return university;
};

module.exports = {
  createUniversity,
  getUniversityById,
  updateUniversity,
  deleteUniversity,
  getAllUniversities,
};
