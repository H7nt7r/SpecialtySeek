const facultyRepository = require('../repository/FacultiesRepository.js');

const createFaculty = async (facultyData) => {
  const faculty = await facultyRepository.createFaculty(facultyData);
  return faculty;
};

const getFacultyById = async (facultyId) => {
  const faculty = await facultyRepository.getFacultyById(facultyId);
  return faculty;
};

const updateFaculty = async (facultyId, facultyData) => {
  const faculty = await facultyRepository.updateFaculty(facultyId, facultyData);
  return faculty;
};

const deleteFaculty = async (facultyId) => {
  await facultyRepository.deleteFaculty(facultyId);
};

const getAllFaculties = async () => {
  const faculty = await facultyRepository.getAllFaculties();
  return faculty;
};

module.exports = {
  createFaculty,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
  getAllFaculties,
};
