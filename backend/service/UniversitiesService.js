const universityRepository = require('../repository/UniversitiesRepository.js');

const createUniversity = async (universityData) => {
  const university = await universityRepository.createUniversity(universityData);
  return university;
};

const getUniversityById = async (universityId) => {
  const university = await universityRepository.getUniversityById(universityId);
  return university;
};

const updateUniversity = async (universityId, universityData) => {
  const university = await universityRepository.updateUniversity(universityId, universityData);
  return university;
};

const deleteUniversity = async (universityId) => {
  await universityRepository.deleteUniversity(universityId);
};

const getAllUniversities = async () => {
  const university = await universityRepository.getAllUniversities();
  return university;
};

module.exports = {
  createUniversity,
  getUniversityById,
  updateUniversity,
  deleteUniversity,
  getAllUniversities,
};
