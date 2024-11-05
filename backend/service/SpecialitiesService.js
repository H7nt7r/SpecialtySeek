// service/SpecialitiesService.js
const specialityRepository = require('../repository/SpecialitiesRepository');

const createSpeciality = async (specialityData) => {
  const speciality = await specialityRepository.createSpeciality(specialityData);
  return speciality;
};

const getSpecialityById = async (specialityId) => {
  const speciality = await specialityRepository.getSpecialityById(specialityId);
  return speciality;
};

const updateSpeciality = async (specialityId, specialityData) => {
  const speciality = await specialityRepository.updateSpeciality(specialityId, specialityData);
  return speciality;
};

const deleteSpeciality = async (specialityId) => {
  await specialityRepository.deleteSpeciality(specialityId);
};

const getAllSpecialities = async () => {
  const speciality = await specialityRepository.getAllSpecialities();
  return speciality;
};

const getSpecialityByDisciplines = async (disciplineList) => {
  const specialities = await specialityRepository.getSpecialityByDisciplines(disciplineList);
  return specialities.map(speciality => ({
    id: speciality.id,
    name: speciality.name,
    desc: speciality.desc,
    img: speciality.img
  }));
};


module.exports = {
  createSpeciality,
  getSpecialityById,
  updateSpeciality,
  deleteSpeciality,
  getAllSpecialities,
  getSpecialityByDisciplines
};
