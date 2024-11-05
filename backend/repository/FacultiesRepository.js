const Faculty = require('../models/Faculties');

const createFaculty = async(facultyData) => {
  const faculty = await Faculty.create(facultyData);
  return faculty;
};

const getFacultyById = async (facultyId) => {
  const faculty = await Faculty.findByPk(facultyId);
  return faculty;
};

const updateFaculty = async (facultyId, facultyData) => {
  const faculty = await Faculty.findByPk(facultyId);
  await faculty.update(facultyData);
  return faculty;
};

const deleteFaculty = async (facultyId) => {
  const faculty = await Faculty.findByPk(facultyId);
  await faculty.destroy();
};

const getAllFaculties = async () => {
  const faculty = await Faculty.findAll();
  return faculty;
};

module.exports = {
  createFaculty,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
  getAllFaculties,
};
